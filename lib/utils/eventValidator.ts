/**
 * Event Validation Utility with Zod Schemas
 * 
 * This module provides validation for HITL streaming protocol events
 * to ensure type safety and catch protocol violations early.
 * 
 * @module eventValidator
 */

import { z } from 'zod';

// ============================================================================
// HITL Payload Schemas
// ============================================================================

/**
 * HITL Type enum schema - defines all supported human-in-the-loop interaction types
 */
export const HITLTypeSchema = z.enum([
    'content_review',
    'url_selection',
    'topic_input',
    'confirmation',
    'selection',
    'multi_selection',
    'feedback',
    'data_input'
]);

/**
 * HITL Option schema - defines the structure for selectable options in HITL interactions
 * Matches backend HITLOption Pydantic model exactly
 */
export const HITLOptionSchema = z.object({
    id: z.string(),
    label: z.string(),
    value: z.unknown(),
    description: z.string().optional(),
    icon: z.string().optional()
});

/**
 * Priority schema - defines priority levels for HITL interrupts
 */
export const PrioritySchema = z.enum(['low', 'normal', 'high', 'critical']);

/**
 * Full HITL Interrupt Payload schema
 * Validates the complete structure of a human-in-the-loop interrupt payload
 * Matches backend HITLInterruptPayload Pydantic model exactly
 */
export const HITLInterruptPayloadSchema = z.object({
    version: z.number().default(1),
    type: z.literal('hitl_request'),
    hitl_type: HITLTypeSchema,
    message: z.string(),
    request_id: z.string().optional(),
    options: z.array(HITLOptionSchema).optional(),
    allow_free_input: z.boolean().optional(),
    default: z.unknown().optional(),
    data: z.record(z.unknown()).optional(),
    timeout_seconds: z.number().optional(),
    priority: PrioritySchema.optional()
});

// ============================================================================
// Custom Event Schemas
// ============================================================================

/**
 * Progress event schema
 * Validates events that report progress updates during streaming operations
 */
export const ProgressEventSchema = z.object({
    type: z.literal('progress'),
    step: z.string(),
    step_number: z.number(),
    total_steps: z.number(),
    message: z.string(),
    progress: z.object({
        current: z.number(),
        total: z.number(),
        unit: z.string().optional()
    }).optional()
});

/**
 * Artifact event schema
 * Validates events that deliver generated artifacts during streaming
 */
export const ArtifactEventSchema = z.object({
    type: z.literal('artifact'),
    artifact_id: z.string(),
    artifact_type: z.string(),
    title: z.string(),
    description: z.string().optional(),
    content: z.unknown()
});

/**
 * Step start event schema
 * Validates events that mark the start of a step
 */
export const StepStartEventSchema = z.object({
    type: z.literal('step_start'),
    step: z.string(),
    step_number: z.number(),
    total_steps: z.number(),
    message: z.string()
});

/**
 * Step complete event schema
 * Validates events that mark the completion of a step
 */
export const StepCompleteEventSchema = z.object({
    type: z.literal('step_complete'),
    step: z.string(),
    step_number: z.number(),
    total_steps: z.number(),
    message: z.string()
});

/**
 * Error event schema
 * Validates events that report errors during streaming operations
 */
export const ErrorEventSchema = z.object({
    type: z.literal('error'),
    code: z.string(),
    message: z.string(),
    details: z.unknown().optional()
});

/**
 * Message event schema
 * Validates events that deliver messages during streaming
 */
export const MessageEventSchema = z.object({
    type: z.literal('message'),
    content: z.string(),
    sender: z.string().optional()
});

/**
 * Union of all custom streaming events
 * Uses discriminated union on 'type' field for efficient parsing
 */
export const CustomEventSchema = z.discriminatedUnion('type', [
    ProgressEventSchema,
    ArtifactEventSchema,
    StepStartEventSchema,
    StepCompleteEventSchema,
    ErrorEventSchema,
    MessageEventSchema
]);

// ============================================================================
// Validation Functions
// ============================================================================

/**
 * Validates a HITL interrupt payload
 * 
 * @param payload - The unknown payload to validate
 * @returns An object with success flag and either validated data or error
 * 
 * @example
 * ```typescript
 * const result = validateHITLPayload(unknownPayload);
 * if (result.success) {
 *   console.log('Valid payload:', result.data);
 * } else {
 *   console.error('Validation failed:', result.error.errors);
 * }
 * ```
 */
export function validateHITLPayload(payload: unknown) {
    const result = HITLInterruptPayloadSchema.safeParse(payload);
    if (result.success) {
        return { success: true as const, data: result.data };
    }
    console.error('HITL payload validation failed:', result.error.errors);
    return { success: false as const, error: result.error };
}

/**
 * Validates a custom streaming event
 * 
 * @param event - The unknown event to validate
 * @returns An object with success flag and either validated event or error
 * 
 * @example
 * ```typescript
 * const result = validateCustomEvent(unknownEvent);
 * if (result.success) {
 *   switch (result.data.type) {
 *     case 'progress':
 *       handleProgress(result.data);
 *       break;
 *     case 'artifact':
 *       handleArtifact(result.data);
 *       break;
 *     // ... handle other event types
 *   }
 * }
 * ```
 */
export function validateCustomEvent(event: unknown) {
    const result = CustomEventSchema.safeParse(event);
    if (result.success) {
        return { success: true as const, data: result.data };
    }
    console.error('Custom event validation failed:', result.error.errors);
    return { success: false as const, error: result.error };
}

/**
 * Type guard to check if an object is a valid HITL payload
 * 
 * @param payload - The unknown value to check
 * @returns True if the payload is a valid HITL payload, false otherwise
 * 
 * @example
 * ```typescript
 * if (isValidHITLPayload(maybePayload)) {
 *   // TypeScript knows maybePayload is HITLInterruptPayloadValidated
 *   console.log(maybePayload.type, maybePayload.message);
 * }
 * ```
 */
export function isValidHITLPayload(payload: unknown): payload is HITLInterruptPayloadValidated {
    return HITLInterruptPayloadSchema.safeParse(payload).success;
}

/**
 * Type guard to check if an object is a valid custom event
 * 
 * @param event - The unknown value to check
 * @returns True if the event is a valid custom event, false otherwise
 * 
 * @example
 * ```typescript
 * if (isValidCustomEvent(maybeEvent)) {
 *   // TypeScript knows maybeEvent is CustomEventValidated
 *   console.log(maybeEvent.type);
 * }
 * ```
 */
export function isValidCustomEvent(event: unknown): event is CustomEventValidated {
    return CustomEventSchema.safeParse(event).success;
}

// ============================================================================
// Exported Types
// ============================================================================

/**
 * Validated HITL interrupt payload type
 */
export type HITLInterruptPayloadValidated = z.infer<typeof HITLInterruptPayloadSchema>;

/**
 * Validated HITL type enum
 */
export type HITLTypeValidated = z.infer<typeof HITLTypeSchema>;

/**
 * Validated HITL option type
 */
export type HITLOptionValidated = z.infer<typeof HITLOptionSchema>;

/**
 * Validated priority type
 */
export type PriorityValidated = z.infer<typeof PrioritySchema>;

/**
 * Validated progress event type
 */
export type ProgressEventValidated = z.infer<typeof ProgressEventSchema>;

/**
 * Validated artifact event type
 */
export type ArtifactEventValidated = z.infer<typeof ArtifactEventSchema>;


/**
* Validated message event type
*/
export type MessageEventValidated = z.infer<typeof MessageEventSchema>;
/**
 * Validated error event type
 */
export type ErrorEventValidated = z.infer<typeof ErrorEventSchema>;
/**
 * Validated custom event union type
 */
export type CustomEventValidated = z.infer<typeof CustomEventSchema>;
