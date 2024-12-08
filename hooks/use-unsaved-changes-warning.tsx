'use client';

import { useEffect, useState } from 'react';
import { navigationEvents } from '@/lib/event-manager';
import { openConfirm } from '@/components/dialog-confirm';
import { useLanguage } from '@/contexts/language-context';

export default function useUnsavedChangesWarning(): [boolean, (value: boolean) => void] {
  const [isDirty, setIsDirty] = useState(false);
  const { t } = useLanguage();
  
  useEffect(() => {
    if (!isDirty) return;

    const handleBeforeNavigate = async ({ path }: { path: string }) => {
      try {
        return await openConfirm({
          title: t.UNSAVED_CHANGES_WARNING_TITLE,
          message: t.UNSAVED_CHANGES_WARNING_MESSAGE,
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