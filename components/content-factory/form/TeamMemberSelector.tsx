'use client';

import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { Avatar } from '@/components/ui/Avatar';
import { Button } from '@/components/ui/Button';
import { X, Plus, Search } from 'lucide-react';
import { TeamMember } from '../types/project-form.types';

/**
 * TeamMemberSelector Component
 *
 * A multi-select component for choosing team members with avatar chips.
 *
 * @component
 */
export interface TeamMemberSelectorProps {
    /**
     * Currently selected team member IDs
     */
    selectedIds: string[];

    /**
     * Available team members to select from
     */
    availableMembers: TeamMember[];

    /**
     * Callback when selection changes
     */
    onChange: (selectedIds: string[]) => void;

    /**
     * Label for the selector
     */
    label: string;

    /**
     * Placeholder text for the input
     */
    placeholder?: string;

    /**
     * Maximum number of members that can be selected
     * @default 10
     */
    maxSelections?: number;

    /**
     * Optional custom className
     */
    className?: string;

    /**
     * Optional test ID for testing purposes
     */
    testId?: string;

    /**
     * Optional disabled state
     */
    disabled?: boolean;
}

export const TeamMemberSelector: React.FC<TeamMemberSelectorProps> = ({
    selectedIds,
    availableMembers,
    onChange,
    label,
    placeholder = 'Add team members...',
    maxSelections = 10,
    className,
    testId = 'team-member-selector',
    disabled = false,
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    const selectedMembers = availableMembers.filter((member) =>
        selectedIds.includes(member.id)
    );

    const filteredMembers = availableMembers.filter(
        (member) =>
            !selectedIds.includes(member.id) &&
            (member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                member.email.toLowerCase().includes(searchQuery.toLowerCase()))
    );

    const handleAddMember = (memberId: string) => {
        if (selectedIds.length >= maxSelections) return;
        onChange([...selectedIds, memberId]);
        setSearchQuery('');
    };

    const handleRemoveMember = (memberId: string) => {
        onChange(selectedIds.filter((id) => id !== memberId));
    };

    const canAddMore = selectedIds.length < maxSelections;

    return (
        <div className={cn('space-y-2', className)} data-testid={testId}>
            {/* Selected Members */}
            {selectedMembers.length > 0 && (
                <div className="flex flex-wrap gap-2">
                    {selectedMembers.map((member) => (
                        <div
                            key={member.id}
                            className={cn(
                                'inline-flex items-center gap-1.5 px-2 py-1.5 rounded-full bg-neutral-100 border border-neutral-200',
                                disabled && 'opacity-50'
                            )}
                        >
                            <Avatar
                                src={member.avatar}
                                alt={member.name}
                                initials={member.initials}
                                size="xs"
                            />
                            <span className="text-sm font-medium text-neutral-700">
                                {member.name}
                            </span>
                            {!disabled && (
                                <button
                                    type="button"
                                    onClick={() => handleRemoveMember(member.id)}
                                    className="p-0.5 rounded-full hover:bg-neutral-200 text-neutral-500 hover:text-neutral-700 transition-colors"
                                    aria-label={`Remove ${member.name}`}
                                >
                                    <X className="h-3 w-3" />
                                </button>
                            )}
                        </div>
                    ))}
                </div>
            )}

            {/* Add Member Button */}
            {!disabled && canAddMore && (
                <div className="relative">
                    {isOpen ? (
                        <div className="relative z-10">
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400" />
                                <input
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    placeholder={placeholder}
                                    className="w-full pl-9 pr-4 py-2 rounded-lg border border-neutral-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
                                    autoFocus
                                    onBlur={(e) => {
                                        // Delay to allow click events to register
                                        setTimeout(() => setIsOpen(false), 150);
                                    }}
                                />
                            </div>

                            {/* Dropdown */}
                            {filteredMembers.length > 0 && (
                                <div className="absolute mt-1 w-full bg-white border border-neutral-200 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                                    {filteredMembers.map((member) => (
                                        <button
                                            key={member.id}
                                            type="button"
                                            onClick={() => handleAddMember(member.id)}
                                            className="w-full px-3 py-2 flex items-center gap-3 hover:bg-neutral-50 text-left transition-colors"
                                        >
                                            <Avatar
                                                src={member.avatar}
                                                alt={member.name}
                                                initials={member.initials}
                                                size="sm"
                                            />
                                            <div className="flex-1 min-w-0">
                                                <p className="text-sm font-medium text-neutral-900 truncate">
                                                    {member.name}
                                                </p>
                                                <p className="text-xs text-neutral-500 truncate">
                                                    {member.email}
                                                </p>
                                            </div>
                                            <Plus className="h-4 w-4 text-neutral-400" />
                                        </button>
                                    ))}
                                </div>
                            )}

                            {filteredMembers.length === 0 && searchQuery && (
                                <div className="absolute mt-1 w-full bg-white border border-neutral-200 rounded-lg shadow-lg px-3 py-4 text-center">
                                    <p className="text-sm text-neutral-500">
                                        No team members found
                                    </p>
                                </div>
                            )}
                        </div>
                    ) : (
                        <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => setIsOpen(true)}
                            disabled={disabled}
                            className="gap-1.5"
                        >
                            <Plus className="h-4 w-4" />
                            {selectedMembers.length === 0 ? placeholder : 'Add more...'}
                        </Button>
                    )}
                </div>
            )}

            {/* Max Selections Warning */}
            {!canAddMore && (
                <p className="text-xs text-neutral-500">
                    Maximum {maxSelections} team members selected
                </p>
            )}
        </div>
    );
};

TeamMemberSelector.displayName = 'TeamMemberSelector';
