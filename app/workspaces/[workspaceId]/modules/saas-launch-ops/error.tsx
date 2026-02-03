'use client';

import { EmptyState } from '@/components/ui/EmptyState';
import { RefreshCw, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export default function SaaSLaunchOpsError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="p-6">
      <EmptyState
        icon={AlertTriangle}
        title="Failed to load SaaS Launch Ops"
        description="We encountered an error while fetching the SaaS Launch Ops module data. Please try again."
        variant="error"
        actions={
          <div className="flex gap-3">
            <Button onClick={reset} variant="primary">
              <RefreshCw className="h-4 w-4 mr-2" />
              Try Again
            </Button>
            <Button
              onClick={() => (window.location.href = '/workspaces')}
              variant="outline"
            >
              Back to Workspace
            </Button>
          </div>
        }
      />
      {process.env.NODE_ENV === 'development' && (
        <div className="mt-6 p-4 bg-error-50 dark:bg-error-900/10 rounded-lg border border-error-200 dark:border-error-800">
          <p className="text-sm font-medium text-error-800 dark:text-error-200 mb-2">
            Error Details:
          </p>
          <pre className="text-xs text-error-600 dark:text-error-400 overflow-auto">
            {error.message}
          </pre>
        </div>
      )}
    </div>
  );
}