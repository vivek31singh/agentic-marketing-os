'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { FormField } from '../FormField';
import { TeamMemberSelector } from '../TeamMemberSelector';
import { FormSectionProps, TeamMember } from '../../types/project-form.types';

/**
 * TeamRolesSection Component
 *
 * Form section for team roles and permissions including project lead,
 * content writers, and content reviewers.
 *
 * @component
 */
export interface TeamRolesSectionProps extends FormSectionProps {
    /**
     * Current user ID (defaults to project lead)
     */
    currentUserId?: string;

    /**
     * Available team members to select from
     */
    availableMembers: TeamMember[];
}

export const TeamRolesSection: React.FC<TeamRolesSectionProps> = ({
    formData,
    errors,
    onChange,
    disabled = false,
    currentUserId,
    availableMembers,
}) => {
    // Get project lead member object
    const projectLead = availableMembers.find((m) => m.id === formData.projectLeadId);

    return (
        <div className="space-y-5" data-testid="team-roles-section">
            {/* Section Header */}
            <div>
                <h3 className="text-lg font-semibold text-neutral-900 mb-1">
                    Team Roles & Permissions
                </h3>
                <p className="text-sm text-neutral-500">
                    Assign team members to different roles
                </p>
            </div>

            {/* Project Lead */}
            <FormField
                label="Project Lead"
                required
                error={errors.projectLeadId}
                testId="project-lead-field"
            >
                <div className="relative">
                    <select
                        value={formData.projectLeadId}
                        onChange={(e) => onChange('projectLeadId', e.target.value)}
                        disabled={disabled}
                        className={cn(
                            'flex h-10 w-full rounded-md border border-neutral-200 bg-white px-3 py-2 text-sm',
                            'ring-offset-background focus-visible:outline-none focus-visible:ring-2',
                            'focus-visible:ring-primary/50 focus-visible:ring-offset-2',
                            'disabled:cursor-not-allowed disabled:opacity-50',
                            'appearance-none pr-10'
                        )}
                    >
                        <option value="">Select project lead...</option>
                        {availableMembers.map((member) => (
                            <option key={member.id} value={member.id}>
                                {member.name}
                            </option>
                        ))}
                    </select>
                    {/* Custom arrow icon */}
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                        <svg
                            className="h-4 w-4 text-neutral-500"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M19 9l-7 7-7-7"
                            />
                        </svg>
                    </div>
                </div>
            </FormField>

            {/* Content Writers */}
            <div>
                <label className="text-sm font-medium text-neutral-900 mb-2 block">
                    Content Writers
                </label>
                <TeamMemberSelector
                    selectedIds={formData.contentWriterIds}
                    availableMembers={availableMembers}
                    onChange={(ids) => onChange('contentWriterIds', ids)}
                    label="Content Writers"
                    placeholder="Add team members..."
                    maxSelections={10}
                    disabled={disabled}
                    testId="content-writers-selector"
                />
            </div>

            {/* Content Reviewers */}
            <div>
                <label className="text-sm font-medium text-neutral-900 mb-2 block">
                    Content Reviewers
                </label>
                <TeamMemberSelector
                    selectedIds={formData.contentReviewerIds}
                    availableMembers={availableMembers}
                    onChange={(ids) => onChange('contentReviewerIds', ids)}
                    label="Content Reviewers"
                    placeholder="Add team members..."
                    maxSelections={10}
                    disabled={disabled}
                    testId="content-reviewers-selector"
                />
            </div>
        </div>
    );
};

TeamRolesSection.displayName = 'TeamRolesSection';
