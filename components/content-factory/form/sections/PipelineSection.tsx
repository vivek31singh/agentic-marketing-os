'use client';

import React from 'react';
import { FormField } from '../FormField';
import { CharacterCounter } from '../CharacterCounter';
import { ContentTypesSelector } from '../ContentTypesSelector';
import { ContentVelocitySelector } from '../ContentVelocitySelector';
import { FormSectionProps, ContentType, ContentVelocity } from '../../types/project-form.types';

/**
 * PipelineSection Component
 *
 * Form section for production pipeline configuration including content types,
 * target audience, and content velocity.
 *
 * @component
 */
export const PipelineSection: React.FC<FormSectionProps> = ({
    formData,
    errors,
    onChange,
    onBlur,
    disabled = false,
}) => {
    const handleContentTypeChange = (selected: ContentType[]) => {
        onChange('contentTypes', selected);
    };

    const handleVelocityChange = (velocity: ContentVelocity) => {
        onChange('contentVelocity', velocity);
    };

    return (
        <div className="space-y-5" data-testid="pipeline-section">
            {/* Section Header */}
            <div>
                <h3 className="text-lg font-semibold text-neutral-900 mb-1">
                    Production Pipeline Configuration
                </h3>
                <p className="text-sm text-neutral-500">
                    Define what content you will create and how often
                </p>
            </div>

            {/* Content Types */}
            <div>
                <label className="text-sm font-medium text-neutral-900 flex items-center gap-1 mb-2">
                    Content Types
                    <span className="text-error" aria-label="required">*</span>
                </label>
                <ContentTypesSelector
                    selected={formData.contentTypes}
                    onChange={handleContentTypeChange}
                    error={errors.contentTypes}
                    disabled={disabled}
                    testId="content-types-selector"
                />
            </div>

            {/* Target Audience */}
            <FormField
                label="Target Audience"
                required
                error={errors.targetAudience}
                testId="target-audience-field"
            >
                <div className="space-y-1.5">
                    <textarea
                        value={formData.targetAudience}
                        onChange={(e) => onChange('targetAudience', e.target.value)}
                        onBlur={() => onBlur?.('targetAudience')}
                        placeholder="Describe your target audience..."
                        disabled={disabled}
                        maxLength={300}
                        rows={2}
                        className="flex w-full rounded-md border border-neutral-200 bg-white px-3 py-2 text-sm ring-offset-background placeholder:text-neutral-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 resize-none"
                    />
                    <CharacterCounter
                        current={formData.targetAudience.length}
                        max={300}
                        testId="audience-character-counter"
                    />
                </div>
            </FormField>

            {/* Content Velocity */}
            <div>
                <label className="text-sm font-medium text-neutral-900 flex items-center gap-1 mb-2">
                    Content Velocity
                    <span className="text-error" aria-label="required">*</span>
                </label>
                <ContentVelocitySelector
                    value={formData.contentVelocity}
                    onChange={handleVelocityChange}
                    error={errors.contentVelocity}
                    disabled={disabled}
                    testId="content-velocity-selector"
                />
            </div>
        </div>
    );
};

PipelineSection.displayName = 'PipelineSection';
