'use client';

import React from 'react';
import { Input } from '@/components/ui/Input';
import { FormField } from '../FormField';
import { CharacterCounter } from '../CharacterCounter';
import { FormSectionProps } from '../../types/project-form.types';
import { validateField } from '../../utils/form-validation';
import { debounce } from '../../utils/form-validation';

/**
 * ProjectInfoSection Component
 *
 * Form section for project information including name, description, and website URL.
 *
 * @component
 */
export const ProjectInfoSection: React.FC<FormSectionProps> = ({
    formData,
    errors,
    onChange,
    onBlur,
    disabled = false,
}) => {
    // Debounced URL validation
    const debouncedUrlValidation = React.useMemo(
        () =>
            debounce((url: string) => {
                const error = validateField('websiteUrl', url);
                onChange('websiteUrl', url);
                // Note: Error state is managed by parent component
            }, 500),
        [onChange]
    );

    const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const url = e.target.value;
        debouncedUrlValidation(url);
    };

    const handleUrlBlur = () => {
        if (onBlur) {
            onBlur('websiteUrl');
        }
    };

    return (
        <div className="space-y-5" data-testid="project-info-section">
            {/* Section Header */}
            <div>
                <h3 className="text-lg font-semibold text-neutral-900 mb-1">
                    Project Information
                </h3>
                <p className="text-sm text-neutral-500">
                    Provide basic details about your content project
                </p>
            </div>

            {/* Project Name */}
            <FormField
                label="Project Name"
                required
                error={errors.projectName}
                testId="project-name-field"
            >
                <Input
                    type="text"
                    value={formData.projectName}
                    onChange={(e) => onChange('projectName', e.target.value)}
                    onBlur={() => onBlur?.('projectName')}
                    placeholder="Enter project name..."
                    disabled={disabled}
                    maxLength={100}
                />
            </FormField>

            {/* Project Description */}
            <FormField
                label="Project Description"
                error={errors.projectDescription}
                testId="project-description-field"
            >
                <div className="space-y-1.5">
                    <textarea
                        value={formData.projectDescription}
                        onChange={(e) => onChange('projectDescription', e.target.value)}
                        onBlur={() => onBlur?.('projectDescription')}
                        placeholder="Describe the project's goals and objectives..."
                        disabled={disabled}
                        maxLength={500}
                        rows={3}
                        className="flex w-full rounded-md border border-neutral-200 bg-white px-3 py-2 text-sm ring-offset-background placeholder:text-neutral-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 resize-none"
                    />
                    <CharacterCounter
                        current={formData.projectDescription.length}
                        max={500}
                        testId="description-character-counter"
                    />
                </div>
            </FormField>

            {/* Website URL */}
            <FormField
                label="Website URL"
                required
                error={errors.websiteUrl}
                helperText="ℹ️ The website will be analyzed for content structure"
                testId="website-url-field"
            >
                <Input
                    type="url"
                    value={formData.websiteUrl}
                    onChange={handleUrlChange}
                    onBlur={handleUrlBlur}
                    placeholder="https://example.com"
                    disabled={disabled}
                />
            </FormField>
        </div>
    );
};

ProjectInfoSection.displayName = 'ProjectInfoSection';
