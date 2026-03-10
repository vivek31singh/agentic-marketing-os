/**
 * TypeScript types and interfaces for the Project Initialization Modal
 * in the Content Factory module.
 */

// ============================================
// Content Types
// ============================================

export type ContentType =
    | 'blog'
    | 'social'
    | 'email'
    | 'landing-page'
    | 'product-page'
    | 'case-study';

export const CONTENT_TYPE_LABELS: Record<ContentType, string> = {
    blog: 'Blog Articles',
    social: 'Social Media',
    email: 'Email',
    'landing-page': 'Landing Pages',
    'product-page': 'Product Pages',
    'case-study': 'Case Studies',
};

// ============================================
// Content Velocity Options
// ============================================

export type ContentVelocity = 1 | 2 | 3 | 4 | 5 | 10;

export const CONTENT_VELOCITY_OPTIONS: ContentVelocity[] = [1, 2, 3, 4, 5, 10];

// ============================================
// Team Member
// ============================================

export interface TeamMember {
    id: string;
    name: string;
    email: string;
    avatar?: string;
    initials: string;
}

// ============================================
// Advanced Options
// ============================================

export interface AdvancedOptions {
    enableSeoOptimization: boolean;
    includeGscData: boolean;
    enableBrandVoiceAnalysis: boolean;
    useCustomTechStack: boolean;
    customTechStack?: string;
}

// ============================================
// Form Data
// ============================================

export interface ProjectFormData {
    projectName: string;
    projectDescription: string;
    websiteUrl: string;
    contentTypes: ContentType[];
    targetAudience: string;
    contentVelocity: ContentVelocity;
    projectLeadId: string;
    contentWriterIds: string[];
    contentReviewerIds: string[];
    advancedOptions: AdvancedOptions;
}

// ============================================
// Form Validation Errors
// ============================================

export interface FormValidationErrors {
    projectName?: string;
    projectDescription?: string;
    websiteUrl?: string;
    contentTypes?: string;
    targetAudience?: string;
    contentVelocity?: string;
    projectLeadId?: string;
    customTechStack?: string;
}

// ============================================
// Form Field State
// ============================================

export interface FormFieldState<T = string> {
    value: T;
    touched: boolean;
    error?: string;
}

// ============================================
// Modal/Page State
// ============================================

export type ModalState = 'idle' | 'loading' | 'submitting' | 'success' | 'error';
export type PageState = 'idle' | 'submitting' | 'success' | 'error';

// ============================================
// API Request/Response Types
// ============================================

export interface CreateProjectRequest {
    projectName: string;
    projectDescription?: string;
    websiteUrl: string;
    contentTypes: ContentType[];
    targetAudience: string;
    contentVelocity: number;
    projectLeadId: string;
    contentWriterIds?: string[];
    contentReviewerIds?: string[];
    advancedOptions: AdvancedOptions;
}

export interface CreateProjectResponse {
    success: boolean;
    projectId: string;
    message: string;
    project?: {
        id: string;
        name: string;
        status: 'initializing' | 'ready' | 'error';
    };
}

export interface ErrorResponse {
    success: false;
    error: {
        code: string;
        message: string;
        details?: Record<string, string[]>;
    };
}

// ============================================
// Content Type Option (for selector)
// ============================================

export interface ContentTypeOption {
    value: ContentType;
    label: string;
    icon?: React.ComponentType<{ className?: string }>;
}

// ============================================
// Content Velocity Option (for selector)
// ============================================

export interface VelocityOption {
    value: ContentVelocity;
    label: string;
}

// ============================================
// Team Role Types
// ============================================

export type TeamRole = 'project-lead' | 'content-writer' | 'content-reviewer';

export const TEAM_ROLE_LABELS: Record<TeamRole, string> = {
    'project-lead': 'Project Lead',
    'content-writer': 'Content Writer',
    'content-reviewer': 'Content Reviewer',
};

// ============================================
// Form Section Props
// ============================================

export interface FormSectionProps {
    formData: ProjectFormData;
    errors: FormValidationErrors;
    onChange: (field: keyof ProjectFormData, value: any) => void;
    onBlur?: (field: keyof ProjectFormData) => void;
    disabled?: boolean;
}

// ============================================
// Validation Rule Types
// ============================================

export interface ValidationRule {
    required?: boolean;
    minLength?: number;
    maxLength?: number;
    pattern?: RegExp;
    custom?: (value: any) => string | undefined;
}

export interface ValidationSchema {
    [key: string]: ValidationRule;
}

// ============================================
// Default Form Data
// ============================================

export const DEFAULT_PROJECT_FORM_DATA: ProjectFormData = {
    projectName: '',
    projectDescription: '',
    websiteUrl: '',
    contentTypes: ['blog', 'landing-page'],
    targetAudience: '',
    contentVelocity: 3,
    projectLeadId: '',
    contentWriterIds: [],
    contentReviewerIds: [],
    advancedOptions: {
        enableSeoOptimization: true,
        includeGscData: false,
        enableBrandVoiceAnalysis: false,
        useCustomTechStack: false,
        customTechStack: '',
    },
};

// ============================================
// Validation Schema
// ============================================

export const PROJECT_FORM_VALIDATION_SCHEMA: ValidationSchema = {
    projectName: {
        required: true,
        minLength: 3,
        maxLength: 100,
        pattern: /^[a-zA-Z0-9\s\-_]+$/,
    },
    projectDescription: {
        maxLength: 500,
    },
    websiteUrl: {
        required: true,
        pattern: /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/,
    },
    contentTypes: {
        required: true,
        custom: (value: ContentType[]) => {
            if (!value || value.length === 0) {
                return 'Please select at least one content type';
            }
            return undefined;
        },
    },
    targetAudience: {
        required: true,
        minLength: 10,
        maxLength: 300,
    },
    contentVelocity: {
        required: true,
    },
    projectLeadId: {
        required: true,
    },
    customTechStack: {
        minLength: 2,
        maxLength: 100,
    },
};
