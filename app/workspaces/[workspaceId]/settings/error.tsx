'use client';

import { EmptyState } from '@/components/ui/EmptyState';
import { AlertCircle, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/Button';

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
        description="We encountered an error while loading your workspace settings. Please try again or contact support if the problem persists."
        action={
          <Button onClick={reset} variant="default">
            <RefreshCw className="w-4 h-4 mr-2" />
            Retry
          </Button>
        }
      />
    </div>
  );
}
