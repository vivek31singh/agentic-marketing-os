'use client';

import { EmptyState } from '@/components/ui/EmptyState';
import { AlertCircle } from 'lucide-react';

export default function SettingsError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex items-center justify-center min-h-[400px]">
      <EmptyState
        icon={<AlertCircle className="w-12 h-12 text-error" />}
        title="Failed to Load Settings"
        description="We encountered an error while loading the workspace settings. This could be due to a temporary network issue or a configuration problem."
        actions={[
          {
            label: 'Try Again',
            onClick: reset,
            variant: 'primary',
          },
          {
            label: 'Go to Dashboard',
            onClick: () => (window.location.href = '/workspaces/[workspaceId]'),
            variant: 'outline',
          },
        ]}
      />
    </div>
  );
}
