'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';
import { workspaces } from '@/data/mockData';
import { cn } from '@/lib/utils';
import {
    Plus,
    Settings,
    Compass,
    LayoutDashboard,
    Zap,
    Globe,
    Rocket
} from 'lucide-react';
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from '@/components/ui';

export function WorkspaceSwitcher() {
    const params = useParams();
    const currentWorkspaceId = params.workspaceId as string;

    return (
        <TooltipProvider delayDuration={0}>
            <aside className="w-[72px] flex flex-col items-center py-3 gap-2 bg-neutral-900 h-screen border-r border-neutral-800">
                {/* Home/Dashboard Button */}
                <Link href="/">
                    <WorkspaceButton
                        icon={<Zap className="w-6 h-6" />}
                        label="Agentic OS Home"
                        isActive={!currentWorkspaceId}
                    />
                </Link>
                <div className="w-8 h-[2px] bg-neutral-800 rounded-full mx-auto my-1" />

                {/* Workspaces List */}
                {workspaces.map((workspace) => (
                    <Link key={workspace.id} href={`/workspaces/${workspace.id}/mission-control`}>
                        <WorkspaceButton
                            label={workspace.name}
                            isActive={currentWorkspaceId === workspace.id}
                            initials={workspace.name.substring(0, 2).toUpperCase()}
                        />
                    </Link>
                ))}

                {/* Action Buttons */}
                <div className="mt-auto flex flex-col gap-2 pb-2">
                    <WorkspaceButton
                        icon={<Plus className="w-6 h-6" />}
                        label="New Workspace"
                        variant="action"
                    />
                    <WorkspaceButton
                        icon={<Compass className="w-6 h-6" />}
                        label="Explore Agents"
                        variant="action"
                    />
                </div>
            </aside>
        </TooltipProvider>
    );
}

function WorkspaceButton({
    label,
    isActive,
    initials,
    icon,
    variant = 'workspace'
}: {
    label: string;
    isActive?: boolean;
    initials?: string;
    icon?: React.ReactNode;
    variant?: 'workspace' | 'action'
}) {
    return (
        <Tooltip>
            <TooltipTrigger asChild>
                <div className="relative flex items-center group cursor-pointer">
                    {/* Active Indicator */}
                    <div className={cn(
                        "absolute -left-3 w-1 bg-white rounded-r-full transition-all duration-200",
                        isActive ? "h-10" : "h-0 group-hover:h-5"
                    )} />

                    <div className={cn(
                        "w-12 h-12 flex items-center justify-center transition-all duration-200",
                        variant === 'workspace'
                            ? cn(
                                "rounded-[24px] group-hover:rounded-[16px]",
                                isActive ? "rounded-[16px] bg-primary-600 text-white" : "bg-neutral-800 text-neutral-400 group-hover:bg-primary-600 group-hover:text-white"
                            )
                            : "rounded-[24px] group-hover:rounded-[16px] bg-neutral-800 text-success-500 group-hover:bg-success-600 group-hover:text-white"
                    )}>
                        {icon || <span className="text-sm font-bold">{initials}</span>}
                    </div>
                </div>
            </TooltipTrigger>
            <TooltipContent side="right" sideOffset={12} className="bg-black text-white border-neutral-800 px-3 py-1 font-bold">
                {label}
            </TooltipContent>
        </Tooltip>
    );
}
