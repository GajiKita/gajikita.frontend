'use client';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useSyncTokensPresentation } from '../hooks/useBlockchainPresentation';

interface SyncTokensFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void;
}

export const SyncTokensForm = ({
  open,
  onOpenChange,
  onSuccess,
}: SyncTokensFormProps) => {
  const { syncTokens, isLoading, isError, error } = useSyncTokensPresentation();

  const handleSync = () => {
    syncTokens(undefined, {
      onSuccess: () => {
        onSuccess?.();
      },
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Sync Supported Tokens</DialogTitle>
          <DialogDescription>
            Pull the latest supported payout stablecoins directly from the blockchain contract to keep
            the list up to date.
          </DialogDescription>
        </DialogHeader>

        {isError && (
          <p className="text-sm text-destructive">
            {error?.message || 'Unable to sync supported tokens. Please try again.'}
          </p>
        )}

        <DialogFooter className="pt-0">
          <Button variant="ghost" onClick={() => onOpenChange(false)} disabled={isLoading}>
            Cancel
          </Button>
          <Button onClick={handleSync} disabled={isLoading}>
            {isLoading ? 'Syncing...' : 'Sync Tokens'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
