'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { cn } from '@/lib/utils';
import { Modal, ModalHeader, ModalTitle, ModalDescription, ModalBody, ModalFooter, ModalClose } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { AlertCircle, Loader2, CheckCircle } from 'lucide-react';
import { ProjectInfoSection } from './form/sections/ProjectInfoSection';
import { PipelineSection } from './form/sections/PipelineSection';
import { TeamRolesSection } from './form/sections/TeamRolesSection';
import { AdvancedOptionsSection } from './form/sections/AdvancedOptionsSection';
import {
    ProjectFormData,
    FormValidationErrors,
    ModalState,
    DEFAULT_PROJECT_FORM_DATA,
    CreateProjectRequest,
    CreateProjectResponse,
    ErrorResponse,
    TeamMember,
} from './types/project-form.types';
import { validateForm, isFormValid, markFieldTouched, isFieldTouched } from './utils/form-validation';

/**
 * ProjectInitializationModal Component
 *
 * A comprehensive modal for initializing a new content project with
 * project information, production pipeline configuration, team roles,
 * and advanced options.
 *
 * @component
 */
export interface ProjectInitializationModalProps {
    /**
     * Whether the modal is open
     */
    isOpen: boolean;

    /**
     * Callback when the modal is closed
     */
    onClose: () => void;

    /**
     * Callback when a project is successfully created
     */
    onSuccess?: (projectId: string, projectName: string) => void;

    /**
     * Current user ID (defaults to project lead)
     */
    currentUserId?: string;

    /**
     * Available team members to select from
     */
    availableMembers?: TeamMember[];

    /**
     * Optional custom className for modal content
     */
    className?: string;

    /**
     * Optional test ID for testing purposes
     */
    testId?: string;
}

export const ProjectInitializationModal: React.FC<ProjectInitializationModalProps> = ({
    isOpen,
    onClose,
    onSuccess,
    currentUserId,
    availableMembers = [],
    className,
    testId = 'project-initialization-modal',
}) => {
    // Form state
    const [formData, setFormData] = useState<ProjectFormData>(DEFAULT_PROJECT_FORM_DATA);
    const [errors, setErrors] = useState<FormValidationErrors>({});
    const [touchedFields, setTouchedFields] = useState<Set<keyof ProjectFormData>>(new Set());
    const [modalState, setModalState] = useState<ModalState>('idle');
    const [apiError, setApiError] = useState<string | null>(null);

    // Reset form when modal opens
    useEffect(() => {
        if (isOpen) {
            setFormData(DEFAULT_PROJECT_FORM_DATA);
            setErrors({});
            setTouchedFields(new Set());
            setModalState('idle');
            setApiError(null);

            // Set current user as project lead if available
            if (currentUserId) {
                setFormData((prev) => ({ ...prev, projectLeadId: currentUserId }));
            }
        }
    }, [isOpen, currentUserId]);

    // Handle field change
    const handleFieldChange = useCallback((field: keyof ProjectFormData, value: any) => {
        setFormData((prev) => ({ ...prev, [field]: value }));

        // Validate field on change if it's been touched
        if (isFieldTouched(touchedFields, field)) {
            // Note: We'll validate on blur for most fields
        }
    }, [touchedFields]);

    // Handle field blur
    const handleFieldBlur = useCallback((field: keyof ProjectFormData) => {
        const newTouched = markFieldTouched(touchedFields, field);
        setTouchedFields(newTouched);

        // Validate the field
        // Note: Validation is handled by parent component through errors prop
    }, [touchedFields]);

    // Validate form before submit
    const validateBeforeSubmit = useCallback(() => {
        const validationErrors = validateForm(formData);
        setErrors(validationErrors);
        return !Object.keys(validationErrors).some(
            (key) => validationErrors[key as keyof FormValidationErrors]
        );
    }, [formData]);

    // Handle form submission
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (modalState === 'submitting') return;

        // Validate form
        if (!validateBeforeSubmit()) {
            return;
        }

        setModalState('submitting');
        setApiError(null);

        try {
            // Prepare request data
            const requestData: CreateProjectRequest = {
                projectName: formData.projectName,
                projectDescription: formData.projectDescription || undefined,
                websiteUrl: formData.websiteUrl,
                contentTypes: formData.contentTypes,
                targetAudience: formData.targetAudience,
                contentVelocity: formData.contentVelocity,
                projectLeadId: formData.projectLeadId,
                contentWriterIds: formData.contentWriterIds.length > 0 ? formData.contentWriterIds : undefined,
                contentReviewerIds: formData.contentReviewerIds.length > 0 ? formData.contentReviewerIds : undefined,
                advancedOptions: formData.advancedOptions,
            };

            // Make API call
            const response = await fetch('/api/projects', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestData),
            });

            const data: CreateProjectResponse | ErrorResponse = await response.json();

            if (!response.ok || !data.success) {
                const errorData = data as ErrorResponse;
                throw new Error(errorData.error.message || 'Failed to create project');
            }

            const successData = data as CreateProjectResponse;
            setModalState('success');

            // Call success callback
            if (onSuccess) {
                onSuccess(successData.projectId, formData.projectName);
            }

            // Close modal after brief delay
            setTimeout(() => {
                onClose();
            }, 1000);

        } catch (error) {
            setModalState('error');
            setApiError(error instanceof Error ? error.message : 'An unexpected error occurred');
        }
    };

    const isFormReady = isFormValid(formData, errors);
    const isSubmitting = modalState === 'submitting';
    const isSuccess = modalState === 'success';

    return (
        <Modal
            isOpen={isOpen}
            onClose={isSubmitting ? () => { } : onClose}
            closeOnOverlayClick={!isSubmitting}
            closeOnEscape={!isSubmitting}
            contentClassName={cn('max-w-2xl max-h-[90vh] overflow-hidden flex flex-col', className)}
            data-testid={testId}
        >
            <ModalHeader>
                <div>
                    <ModalTitle>Initialize New Project</ModalTitle>
                    <ModalDescription>
                        Set up a new content workflow project with production pipelines and team roles.
                    </ModalDescription>
                </div>
            </ModalHeader>

            <ModalBody className="flex-1 overflow-y-auto">
                {/* API Error Banner */}
                {apiError && (
                    <div
                        className="mb-6 p-4 bg-error/10 border border-error/20 rounded-lg flex items-start gap-3"
                        role="alert"
                    >
                        <AlertCircle className="h-5 w-5 text-error flex-shrink-0 mt-0.5" />
                        <div className="flex-1">
                            <p className="text-sm font-medium text-error">Error creating project</p>
                            <p className="text-sm text-error/80 mt-1">{apiError}</p>
                        </div>
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setApiError(null)}
                            className="text-error hover:bg-error/10"
                        >
                            Dismiss
                        </Button>
                    </div>
                )}

                <form id="project-form" onSubmit={handleSubmit} className="space-y-6">
                    {/* Project Information Section */}
                    <ProjectInfoSection
                        formData={formData}
                        errors={errors}
                        onChange={handleFieldChange}
                        onBlur={handleFieldBlur}
                        disabled={isSubmitting || isSuccess}
                    />

                    {/* Production Pipeline Section */}
                    <PipelineSection
                        formData={formData}
                        errors={errors}
                        onChange={handleFieldChange}
                        onBlur={handleFieldBlur}
                        disabled={isSubmitting || isSuccess}
                    />

                    {/* Team Roles Section */}
                    <TeamRolesSection
                        formData={formData}
                        errors={errors}
                        onChange={handleFieldChange}
                        onBlur={handleFieldBlur}
                        disabled={isSubmitting || isSuccess}
                        currentUserId={currentUserId}
                        availableMembers={availableMembers}
                    />

                    {/* Advanced Options Section */}
                    <AdvancedOptionsSection
                        formData={formData}
                        errors={errors}
                        onChange={handleFieldChange}
                        onBlur={handleFieldBlur}
                        disabled={isSubmitting || isSuccess}
                    />
                </form>
            </ModalBody>

            <ModalFooter>
                <Button
                    type="button"
                    variant="outline"
                    onClick={onClose}
                    disabled={isSubmitting || isSuccess}
                >
                    Cancel
                </Button>
                <Button
                    type="submit"
                    form="project-form"
                    variant="primary"
                    disabled={!isFormReady || isSubmitting || isSuccess}
                    className="min-w-[140px]"
                >
                    {isSubmitting ? (
                        <>
                            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                            Creating...
                        </>
                    ) : isSuccess ? (
                        <>
                            <CheckCircle className="h-4 w-4 mr-2" />
                            Created!
                        </>
                    ) : (
                        'Create Project'
                    )}
                </Button>
            </ModalFooter>
        </Modal>
    );
};

ProjectInitializationModal.displayName = 'ProjectInitializationModal';
