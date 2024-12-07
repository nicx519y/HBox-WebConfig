'use client';

import { useEffect, useState } from 'react';
import { navigationEvents } from '@/lib/event-manager';
import { openConfirm } from '@/components/dialog-confirm';

export default function useUnsavedChangesWarning(): [boolean, (value: boolean) => void] {
  const [isDirty, setIsDirty] = useState(false);
  
  useEffect(() => {
    if (!isDirty) return;

    const handleBeforeNavigate = async ({ path }: { path: string }) => {
      try {
        return await openConfirm({
          title: "Are you sure?",
          message: "You have unsaved changes. If you leave without saving, your changes will be lost.",
        });
      } catch {
        return false;
      }
    };

    navigationEvents.addListener(handleBeforeNavigate);
    return () => navigationEvents.removeListener(handleBeforeNavigate);
  }, [isDirty]);

  return [isDirty, setIsDirty];
}