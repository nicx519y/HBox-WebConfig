'use client';

import { useEffect, useState } from 'react';
import { navigationEvents } from '@/lib/event-manager';
import { openConfirm } from '@/components/dialog-confirm';

/**
 * use unsaved changes warning
 * isDirty: whether there are unsaved changes
 * setIsDirty: set the unsaved changes status
 * if setIsDirty is not provided, the unsaved changes status will not be tracked
 * @returns [isDirty, setIsDirty]
 */
const useUnsavedChangesWarning = (): [boolean, (value: boolean) => void] => {
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

    // add the listener
    navigationEvents.addListener(handleBeforeNavigate);

        // remove the listener when the component unmounts  
    return () => navigationEvents.removeListener(handleBeforeNavigate);

  }, [isDirty]);

  return [isDirty, setIsDirty];
};

export default useUnsavedChangesWarning;