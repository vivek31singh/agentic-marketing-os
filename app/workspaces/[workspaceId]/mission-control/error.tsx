'use client';

import { useParams, useRouter } from 'next/navigation';
import { AlertTriangle, RefreshCw, LayoutDashboard } from 'lucide-react';
import { EmptyState } from '@/components/ui/EmptyState';
import { Button } from '@/components/ui/Button';

export default function MissionControlError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const router = useRouter();
  const params = useParams();
  const workspaceId = params.workspaceId as string;

  const handleRetry = () => {
    reset();
  };

  const handleGoToWorkspace = () => {
    router.push(`/workspaces/${workspaceId}`);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-50 dark:bg-slate-900 p-4">
      <EmptyState
        icon={AlertTriangle}
        title="Mission Control Unavailable"
        description={
          <>
            We encountered an error loading the Mission Control dashboard.{" "}
            <span className="text-slate-500 dark:text-slate-400">
              {error.message || 'Please try again or return to the workspace view.'}
            </span>
          </>
        }
        variant="error"
      >
        <div className="flex flex-col sm:flex-row gap-3 mt-6">
          <Button
            variant="primary"
            onClick={handleRetry}
            className="flex items-center gap-2"
          >
            <RefreshCw className="w-4 h-4" />
            Retry
          </Button>
          <Button
            variant="outline"
            onClick={handleGoToWorkspace}
            className="flex items-center gap-2"
          >
            <LayoutDashboard className="w-4 h-4" />
            Go to Workspace
          </Button>
        </div>
      </EmptyState>
    </div>
  );
}