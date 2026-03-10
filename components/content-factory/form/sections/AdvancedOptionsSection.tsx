'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { FormField } from '../FormField';
import { ToggleSwitch } from '../ToggleSwitch';
import { FormSectionProps } from '../../types/project-form.types';

/**
 * AdvancedOptionsSection Component
 *
 * Form section for advanced options including SEO optimization,
 * GSC data integration, brand voice analysis, and custom tech stack.
 *
 * @component
 */
export const AdvancedOptionsSection: React.FC<FormSectionProps> = ({
    formData,
    errors,
    onChange,
    disabled = false,
}) => {
    const { advancedOptions } = formData;

    const handleToggleChange = (key: keyof typeof advancedOptions) => (checked: boolean) => {
        onChange('advancedOptions', {
            ...advancedOptions,
            [key]: checked,
        });
    };

    const handleCustomTechStackChange = (value: string) => {
        onChange('advancedOptions', {
            ...advancedOptions,
            customTechStack: value,
        });
    };

    return (
        <div className="space-y-5" data-testid="advanced-options-section">
            {/* Section Header */}
            <div>
                <h3 className="text-lg font-semibold text-neutral-900 mb-1">
                    Advanced Options
                    <span className="text-neutral-400 font-normal text-sm ml-2">(Optional)</span>
                </h3>
                <p className="text-sm text-neutral-500">
                    Configure additional settings for your project
                </p>
            </div>

            {/* Toggle Options */}
            <div className="space-y-4">
                <ToggleSwitch
                    checked={advancedOptions.enableSeoOptimization}
                    onChange={handleToggleChange('enableSeoOptimization')}
                    label="Enable SEO Optimization"
                    description="Optimize content for search engines automatically"
                    disabled={disabled}
                    testId="seo-optimization-toggle"
                />

                <ToggleSwitch
                    checked={advancedOptions.includeGscData}
                    onChange={handleToggleChange('includeGscData')}
                    label="Include Google Search Console Data"
                    description="Use GSC data for keyword insights and performance tracking"
                    disabled={disabled}
                    testId="gsc-data-toggle"
                />

                <ToggleSwitch
                    checked={advancedOptions.enableBrandVoiceAnalysis}
                    onChange={handleToggleChange('enableBrandVoiceAnalysis')}
                    label="Enable Brand Voice Analysis"
                    description="Analyze and match your brand's unique voice and tone"
                    disabled={disabled}
                    testId="brand-voice-toggle"
                />

                <ToggleSwitch
                    checked={advancedOptions.useCustomTechStack}
                    onChange={handleToggleChange('useCustomTechStack')}
                    label="Use Custom Tech Stack"
                    description="Specify the tech stack used by your website"
                    disabled={disabled}
                    testId="custom-tech-stack-toggle"
                />
            </div>

            {/* Custom Tech Stack Input */}
            {advancedOptions.useCustomTechStack && (
                <div
                    className={cn(
                        'pl-4 border-l-2 border-neutral-200 space-y-2 animate-in slide-in-from-top-2 duration-200'
                    )}
                >
                    <FormField
                        label="Custom Tech Stack"
                        required={advancedOptions.useCustomTechStack}
                        error={errors.customTechStack}
                        testId="custom-tech-stack-field"
                    >
                        <input
                            type="text"
                            value={advancedOptions.customTechStack || ''}
                            onChange={(e) => handleCustomTechStackChange(e.target.value)}
                            onBlur={() => {
                                // Trigger validation for custom tech stack
                                if (advancedOptions.useCustomTechStack && !advancedOptions.customTechStack?.trim()) {
                                    onChange('advancedOptions', {
                                        ...advancedOptions,
                                        customTechStack: '',
                                    });
                                }
                            }}
                            placeholder="e.g., React, Next.js, WordPress..."
                            disabled={disabled}
                            maxLength={100}
                            className={cn(
                                'flex h-10 w-full rounded-md border border-neutral-200 bg-white px-3 py-2 text-sm',
                                'ring-offset-background focus-visible:outline-none focus-visible:ring-2',
                                'focus-visible:ring-primary/50 focus-visible:ring-offset-2',
                                'disabled:cursor-not-allowed disabled:opacity-50',
                                errors.customTechStack && 'border-error focus-visible:ring-error/50'
                            )}
                        />
                    </FormField>
                    <p className="text-xs text-neutral-500">
                        Specify the technologies used by your website for better content compatibility
                    </p>
                </div>
            )}
        </div>
    );
};

AdvancedOptionsSection.displayName = 'AdvancedOptionsSection';
