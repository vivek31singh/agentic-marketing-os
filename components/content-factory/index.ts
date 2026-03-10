/**
 * Content Factory Module Components
 *
 * This module provides components for the Content Factory feature,
 * including project initialization modal and related form components.
 */

// Main Components
export { QuickActionButton } from './QuickActionButton';
export { ProjectInitializationModal } from './ProjectInitializationModal';
export type { QuickActionButtonProps } from './QuickActionButton';
export type { ProjectInitializationModalProps } from './ProjectInitializationModal';

// Chat Components
export { ChatMessage as ChatMessageComponent, ChatInput, HITLMessageCard } from './chat';

// Form Components
export { FormField } from './form/FormField';
export { CharacterCounter } from './form/CharacterCounter';
export { ContentTypesSelector } from './form/ContentTypesSelector';
export { ContentVelocitySelector } from './form/ContentVelocitySelector';
export { ToggleSwitch } from './form/ToggleSwitch';
export { TeamMemberSelector } from './form/TeamMemberSelector';
export type { FormFieldProps } from './form/FormField';
export type { CharacterCounterProps } from './form/CharacterCounter';
export type { ContentTypesSelectorProps } from './form/ContentTypesSelector';
export type { ContentVelocitySelectorProps } from './form/ContentVelocitySelector';
export type { ToggleSwitchProps } from './form/ToggleSwitch';
export type { TeamMemberSelectorProps } from './form/TeamMemberSelector';

// Form Sections
export { ProjectInfoSection } from './form/sections/ProjectInfoSection';
export { PipelineSection } from './form/sections/PipelineSection';
export { TeamRolesSection } from './form/sections/TeamRolesSection';
export { AdvancedOptionsSection } from './form/sections/AdvancedOptionsSection';
export type { TeamRolesSectionProps } from './form/sections/TeamRolesSection';

// Types
export type {
    ContentType,
    ContentVelocity,
    TeamMember,
    AdvancedOptions,
    ProjectFormData,
    FormValidationErrors,
    FormFieldState,
    ModalState,
    PageState,
    CreateProjectRequest,
    CreateProjectResponse,
    ErrorResponse,
    ContentTypeOption,
    VelocityOption,
    TeamRole,
    FormSectionProps,
    ValidationRule,
    ValidationSchema,
} from './types/project-form.types';

// LangGraph Event Types - Re-exported from central types
export type {
    GraphEventType,
    BaseGraphEvent,
    StepStartEvent,
    StepCompleteEvent,
    SystemEvent,
    AgentMessageEvent,
    ArtifactEvent,
    ProgressEvent,
    HITLRequestEvent,
    ErrorEvent,
    CompleteEvent,
    GraphEvent,
    GraphStreamState,
    StreamStatus,
    HITLRequestPayload,
    HITLInterruptPayload,
    HITLType,
    HITLInputType,
    HITLOption,
    Priority,
    ChatMessage,
    ChatMessageType,
    StartGraphRequest,
    StartGraphResponse,
    HITLResponseRequest,
    HITLResponseResult,
} from '@/lib/types/graph-events.types';

export {
    BROWSING_ARCHITECT_STEPS,
    getStepInfo,
    calculateOverallProgress,
    isStepStartEvent,
    isStepCompleteEvent,
    isSystemEvent,
    isAgentMessageEvent,
    isArtifactEvent,
    isProgressEvent,
    isHITLRequestEvent,
    isErrorEvent,
    isCompleteEvent,
} from '@/lib/types/graph-events.types';

export {
    CONTENT_TYPE_LABELS,
    CONTENT_VELOCITY_OPTIONS,
    DEFAULT_PROJECT_FORM_DATA,
    PROJECT_FORM_VALIDATION_SCHEMA,
    TEAM_ROLE_LABELS,
} from './types/project-form.types';

// Utilities
export {
    validateField,
    validateForm,
    hasFormErrors,
    hasFieldError,
    normalizeUrl,
    extractDomain,
    getCharacterCount,
    isFormValid,
    isFieldTouched,
    markFieldTouched,
    hasContentTypeSelected,
    toggleContentType,
    addTeamMember,
    removeTeamMember,
    hasTeamMember,
    debounce,
} from './utils/form-validation';
