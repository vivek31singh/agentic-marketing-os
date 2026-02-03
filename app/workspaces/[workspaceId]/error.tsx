'use client';

import { useEffect } from 'react';
import { EmptyState } from '@/components/ui/EmptyState';
import { AlertTriangle } from 'lucide-react';

export default function WorkspaceError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Workspace error:', error);
  }, [error]);

  return (
    <div className="flex h-full items-center justify-center p-6">
      <EmptyState
        icon={<AlertTriangle className="h-12 w-12 text-error" />}
        title="Something went wrong"
        description="We encountered an error while loading your workspace. Please try again or contact support if the problem persists."
        action={{
          label: "Try again",
          onClick: () => reset(),
          variant: "default",
        }}
      />
    </div>
  );
}
