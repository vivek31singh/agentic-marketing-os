/**
 * LangGraph Unified Event System - TypeScript Types
 *
 * This file defines the types for streaming LangGraph workflow events.
 * Designed to support multiple graph types through a singular, consistent event format.
 *
 * @see docs/langgraph-unified-event-system.md
 * @see docs/langgraph-event-migration-plan.md
 */

// ============================================
// Core Event Types
// ============================================

/**
 * All possible event types in the system
 */
export type GraphEventType =
    | 'step_start'       // Step started
    | 'step_complete'    // Step completed
    | 'system'           // System messages (status, info)
    | 'agent_message'    // AI agent text response
    | 'artifact'         // Rich content (files, blueprints, code)
    | 'progress'         // Progress updates
    | 'hitl_request'     // Human-in-the-loop input needed
    | 'error'            // Error occurred
    | 'complete';        // Workflow completed

/**
 * Base event structure that all events extend
 * 
 * Note: Properties use camelCase to match JSON from backend.
 * The backend should emit events with camelCase keys.
 */
export interface BaseGraphEvent {
    // Event identification
    id: string;
    type: GraphEventType;
    timestamp: string;             // ISO 8601 format

    // Graph context
    graphId: string;               // e.g., "browsing-architect", "content-factory"
    threadId: string;              // Thread/run ID for this workflow instance

    // Protocol version
    version: string;               // Protocol version for backward compatibility

    // Step context
    stepId?: string;
    stepName?: string;
    stepNumber?: number;           // 1-based
    totalSteps?: number;

    // Node context
    nodeId?: string;
}

// ============================================
// Step Events
// ============================================

export interface StepStartPayload {
    stepId: string;
    stepName: string;
    stepNumber: number;
    totalSteps: number;
    description?: string;
}

export interface StepStartEvent extends BaseGraphEvent {
    type: 'step_start';
    payload: StepStartPayload;
}

export interface StepCompletePayload {
    stepId: string;
    stepName: string;
    stepNumber: number;
    totalSteps: number;
    status: 'success' | 'skipped' | 'partial' | 'failed';
    duration?: number;             // Seconds
    summary?: string;
    artifacts?: string[];          // IDs of artifacts produced
}

export interface StepCompleteEvent extends BaseGraphEvent {
    type: 'step_complete';
    payload: StepCompletePayload;
}

// ============================================
// System Event
// ============================================

export type SystemLevel = 'info' | 'warning' | 'success';
export type SystemSubType = 'phase_start' | 'phase_complete' | 'node_enter' | 'node_exit' | 'custom';

export interface SystemPayload {
    message: string;
    level: SystemLevel;
    subType?: SystemSubType;
    metadata?: Record<string, unknown>;
}

export interface SystemEvent extends BaseGraphEvent {
    type: 'system';
    payload: SystemPayload;
}

// ============================================
// Agent Message Event
// ============================================

export interface AgentMessagePayload {
    content: string;               // Markdown-supported
    sender?: string;
    metadata?: {
        model?: string;
        tokens?: number;
        [key: string]: unknown;
    };
}

export interface AgentMessageEvent extends BaseGraphEvent {
    type: 'agent_message';
    payload: AgentMessagePayload;
}

// ============================================
// Artifact Event
// ============================================

export type ArtifactType =
    | 'blueprint'        // Page blueprint
    | 'content'          // Generated content
    | 'code'             // Code block
    | 'file'             // Generic file
    | 'image'            // Image
    | 'report'           // Analysis report
    | 'data_table'       // Structured data
    | 'link_list'        // List of links
    | 'pre_run_report'   // Pre-run summary report
    | 'pre_run_audit'    // Pre-run audit report
    | 'pre_run_audit_summary' // Pre-run audit summary report
    | 'site_context'     // Site context data
    | 'tech_stack';      // Tech stack data

export interface ArtifactAction {
    id: string;
    label: string;
    type: 'download' | 'copy' | 'view' | 'edit' | 'regenerate';
    payload?: unknown;
}

export interface ArtifactPayload {
    artifactId: string;
    artifactType: ArtifactType;
    title: string;
    description?: string;
    content: unknown;
    actions?: ArtifactAction[];
    metadata?: {
        mimeType?: string;
        size?: number;
        [key: string]: unknown;
    };
}

export interface ArtifactEvent extends BaseGraphEvent {
    type: 'artifact';
    payload: ArtifactPayload;
}

// ============================================
// Artifact Content Types
// ============================================

/**
 * Headings data structure for scraped pages
 */
export interface HeadingsData {
    h1?: string[];
    h2?: string[];
    h3?: string[];
    h4?: string[];
    h5?: string[];
    h6?: string[];
}

/**
 * Content statistics for scraped pages
 */
export interface ContentStats {
    paragraphs_count?: number;
    word_count?: number;
    links_count?: number;
}

/**
 * Home page scraped data structure
 * Used for 'home_scraping' artifacts
 */
export interface HomePageData {
    url?: string;
    meta_title?: string;
    meta_description?: string;
    meta_keywords?: string;
    content_stats?: ContentStats;
    headings?: HeadingsData;
    scrape_method?: string;
}

// ============================================
// Progress Event
// ============================================

export type ProgressStatus = 'pending' | 'in_progress' | 'complete' | 'error';

export interface SubProgressItem {
    itemId: string;
    label: string;
    current: number;
    total: number;
    status: ProgressStatus;
}

export interface ProgressPayload {
    current: number;
    total: number;
    message?: string;
    subProgress?: SubProgressItem[];
}

export interface ProgressEvent extends BaseGraphEvent {
    type: 'progress';
    payload: ProgressPayload;
}

// ============================================
// HITL Events
// ============================================

// ============================================
// New HITL Protocol Types (Native Interrupt-Based)
// ============================================

/**
 * Priority levels for HITL interrupts
 */
export type Priority = 'low' | 'normal' | 'high' | 'critical';

/**
 * Standardized HITL types matching backend enum
 */
export type HITLType =
    | 'content_review'   // Review generated content
    | 'url_selection'    // Select from list of URLs
    | 'topic_input'      // Provide topic/question
    | 'confirmation'     // Yes/No confirmation
    | 'selection'        // Single option selection
    | 'multi_selection'  // Multiple options selection
    | 'feedback'         // User feedback on content
    | 'data_input';      // Free text/data input

/**
 * Option structure for HITL requests
 * Matches backend HITLOption model exactly
 */
export interface HITLOption {
    id: string;
    label: string;
    value: unknown;
    description?: string;
    icon?: string;
}

/**
 * Payload structure from LangGraph interrupt (snake_case from backend)
 * Matches backend HITLInterruptPayload Pydantic model exactly
 */
export interface HITLInterruptPayload {
    version: number;
    type: 'hitl_request';  // Always "hitl_request"
    hitl_type: HITLType;   // The actual HITL interaction type
    message: string;
    request_id?: string;
    options?: HITLOption[];
    allow_free_input: boolean;
    default?: unknown;
    data?: Record<string, unknown>;
    timeout_seconds?: number;
    priority: Priority;
}

/**
 * Frontend-friendly version (camelCase)
 * Converts from backend snake_case HITLInterruptPayload
 *
 * New code should use: requestType, message, options (with id/label/value)
 * Legacy fields kept for backward compatibility
 */
export interface HITLRequestPayload {
    requestId: string;
    // New fields (interrupt-based protocol)
    requestType?: HITLType;
    message?: string;
    allowFreeInput?: boolean;
    data?: Record<string, unknown>;
    timeoutSeconds?: number;
    priority?: Priority;
    // Legacy fields (for backward compatibility)
    prompt?: string;
    inputType?: HITLInputType;
    required?: boolean;
    // Shared fields (work with both protocols)
    options?: HITLOption[];
    default?: unknown;
    defaultValue?: unknown;
    timeout?: number;
}

/**
 * Converts a HITLInterruptPayload (from backend interrupt) to
 * HITLRequestPayload (frontend-friendly camelCase)
 */
export function convertInterruptToHITLRequest(
    interrupt: HITLInterruptPayload,
    taskId: string
): HITLRequestPayload {
    return {
        requestId: interrupt.request_id ?? taskId,
        requestType: interrupt.hitl_type,
        message: interrupt.message,
        options: interrupt.options,
        allowFreeInput: interrupt.allow_free_input,
        default: interrupt.default,
        data: interrupt.data,
        timeoutSeconds: interrupt.timeout_seconds,
        priority: interrupt.priority,
        // Legacy fields for backward compatibility
        prompt: interrupt.message,
        inputType: interrupt.hitl_type as any,
        defaultValue: interrupt.default,
        timeout: interrupt.timeout_seconds,
    };
}

// ============================================
// Legacy HITL Types (kept for backward compatibility)
// ============================================

/**
 * @deprecated Use HITLType instead
 */
export type HITLInputType =
    | 'confirmation'     // Yes/No confirmation
    | 'single_select'    // Select one option
    | 'multi_select'     // Select multiple options
    | 'text_input'       // Free text input
    | 'file_upload';     // File upload

/**
 * @deprecated Use HITLOption with id/label/value instead
 */
export interface HITLOptionLegacy {
    id: string;
    label: string;
    description?: string;
    value?: unknown;
    selected?: boolean;
}

/**
 * @deprecated Use HITLRequestPayload with new structure
 */
export interface HITLRequestPayloadLegacy {
    requestId: string;
    prompt: string;
    inputType: HITLInputType;
    options?: HITLOptionLegacy[];
    defaultValue?: unknown;
    required?: boolean;
    timeout?: number;              // Seconds
}

/**
 * @deprecated The backend no longer emits hitl_request events.
 * HITL is now detected via thread state polling for interrupt payloads.
 * Kept for backward compatibility only.
 */
export interface HITLRequestEvent extends BaseGraphEvent {
    type: 'hitl_request';
    payload: HITLRequestPayload;
}

// ============================================
// Error Event
// ============================================

export interface ErrorPayload {
    code: string;
    message: string;
    details?: string;
    retryable?: boolean;
    nodeId?: string;
}

export interface ErrorEvent extends BaseGraphEvent {
    type: 'error';
    payload: ErrorPayload;
}

// ============================================
// Complete Event
// ============================================

export type CompleteStatus = 'success' | 'completed' | 'partial' | 'failed';

export interface CompleteSummary {
    itemsProcessed?: number;
    artifactsGenerated?: number;
    duration?: number;             // Seconds
    [key: string]: unknown;
}

export interface CompletePayload {
    status: CompleteStatus;
    message?: string;
    summary?: CompleteSummary;
    artifacts?: string[];
}

export interface CompleteEvent extends BaseGraphEvent {
    type: 'complete';
    payload: CompletePayload;
}

// ============================================
// Union Types
// ============================================

/**
 * All possible graph events
 */
export type GraphEvent =
    | StepStartEvent
    | StepCompleteEvent
    | SystemEvent
    | AgentMessageEvent
    | ArtifactEvent
    | ProgressEvent
    | HITLRequestEvent
    | ErrorEvent
    | CompleteEvent;

// ============================================
// Stream State
// ============================================

export type StreamStatus = 'idle' | 'connecting' | 'running' | 'hitl_pending' | 'complete' | 'error';

export interface GraphStreamState {
    // Connection state
    isConnected: boolean;
    threadId: string | null;
    graphId: string | null;

    // Current step
    currentStep: StepStartPayload | null;
    completedSteps: StepCompletePayload[];

    // Messages (for chat display)
    messages: ChatMessage[];

    // Artifacts
    artifacts: Map<string, ArtifactPayload>;

    // Progress
    progress: ProgressPayload | null;

    // HITL
    pendingHITL: HITLRequestPayload | null;

    // Status
    status: StreamStatus;
    error: ErrorPayload | null;
    completeEvent: CompletePayload | null;
}

// ============================================
// Chat Message (for UI display)
// ============================================

export type ChatMessageType = 'user' | 'system' | 'agent' | 'hitl' | 'artifact' | 'step';

export interface ChatMessage {
    id: string;
    type: ChatMessageType;
    content: string;
    timestamp: Date;
    sender?: string;
    metadata?: {
        eventId?: string;
        stepId?: string;
        stepNumber?: number;
        totalSteps?: number;
        artifactId?: string;
        artifactType?: ArtifactType;
        [key: string]: unknown;
    };
}

// ============================================
// API Types
// ============================================

export interface StartGraphRequest {
    graphId: string;
    input: Record<string, unknown>;
    workspaceId?: string;
    options?: {
        timeout?: number;
        metadata?: Record<string, unknown>;
    };
}

export interface StartGraphResponse {
    threadId: string;
    status: 'started' | 'error';
    streamUrl: string;
    message?: string;
}

export interface HITLResponseRequest {
    threadId: string;
    requestId: string;
    response: unknown;
}

export interface HITLResponseResult {
    success: boolean;
    message?: string;
}

// ============================================
// Graph-Specific Step Definitions
// ============================================

/**
 * Browsing Architect step definitions
 */
export const BROWSING_ARCHITECT_STEPS = [
    { id: 'url_validation', name: 'URL Validation', description: 'Validate and normalize the website URL' },
    { id: 'home_scraping', name: 'Home Page Scraping', description: 'Scrape and analyze the home page' },
    { id: 'site_context', name: 'Site Context Extraction', description: 'Extract business context from home page' },
    { id: 'link_discovery', name: 'Link Discovery', description: 'Discover and classify navigation links' },
    { id: 'tech_selection', name: 'Tech Stack Selection', description: 'Present detected tech stack for user confirmation' },
    { id: 'tech_research', name: 'Tech Stack Research', description: 'Research conventions for confirmed tech stack' },
    { id: 'page_selection', name: 'Page Selection', description: 'User selects URLs to process' },
    { id: 'pre_run_audit', name: 'Pre-Run Audit', description: 'Generate audit report and get user approval' },
    { id: 'page_scraping', name: 'Page Scraping', description: 'Scrape all selected pages' },
    { id: 'blueprint_generation', name: 'Blueprint Generation', description: 'Generate per-page blueprints' },
    { id: 'content_generation', name: 'Content Generation', description: 'Generate content using blueprints' },
    { id: 'reporting', name: 'Structure Report', description: 'Generate final summary report' },
] as const;

export type BrowsingArchitectStepId = typeof BROWSING_ARCHITECT_STEPS[number]['id'];

/**
 * Helper to get step info by ID
 */
export function getStepInfo(stepId: string, graphId: string) {
    if (graphId === 'browsing-architect') {
        return BROWSING_ARCHITECT_STEPS.find(s => s.id === stepId);
    }
    return undefined;
}

/**
 * Helper to calculate overall progress percentage
 */
export function calculateOverallProgress(
    stepNumber: number,
    totalSteps: number,
    stepProgress?: number
): number {
    const baseProgress = ((stepNumber - 1) / totalSteps) * 100;
    const stepContribution = stepProgress ? (stepProgress / totalSteps) : 0;
    return Math.round(baseProgress + stepContribution);
}

// ============================================
// Event Type Guards
// ============================================

export function isStepStartEvent(event: GraphEvent): event is StepStartEvent {
    return event.type === 'step_start';
}

export function isStepCompleteEvent(event: GraphEvent): event is StepCompleteEvent {
    return event.type === 'step_complete';
}

export function isSystemEvent(event: GraphEvent): event is SystemEvent {
    return event.type === 'system';
}

export function isAgentMessageEvent(event: GraphEvent): event is AgentMessageEvent {
    return event.type === 'agent_message';
}

export function isArtifactEvent(event: GraphEvent): event is ArtifactEvent {
    return event.type === 'artifact';
}

export function isProgressEvent(event: GraphEvent): event is ProgressEvent {
    return event.type === 'progress';
}

export function isHITLRequestEvent(event: GraphEvent): event is HITLRequestEvent {
    return event.type === 'hitl_request';
}

export function isErrorEvent(event: GraphEvent): event is ErrorEvent {
    return event.type === 'error';
}

export function isCompleteEvent(event: GraphEvent): event is CompleteEvent {
    return event.type === 'complete';
}
