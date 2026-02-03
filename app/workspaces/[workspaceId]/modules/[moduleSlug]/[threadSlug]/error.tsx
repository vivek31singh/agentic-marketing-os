'use client';

import { EmptyState } from '@/components/ui/EmptyState';
import { RefreshCw, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export default function ThreadDetailError({
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
        title="Failed to load thread details"
        description="We encountered an error while fetching the thread data. This could be due to a network issue or the thread may not exist."
        action={
          <Button onClick={reset} variant="default">
            <RefreshCw className="mr-2 h-4 w-4" />
            Try Again
          </Button>
        }
      />
    </div>
  );
}