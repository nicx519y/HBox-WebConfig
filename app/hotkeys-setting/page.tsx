'use client';

import { HotkeysSettingContent } from "@/components/hotkeys-setting-content";
import { useGamepadConfig } from "@/contexts/gamepad-config-context";
import useUnsavedChangesWarning from "@/hooks/use-unsaved-changes-warning";

export default function HotkeysSettingPage() {
    const { hotkeysConfig, updateHotkeysConfig, fetchHotkeysConfig } = useGamepadConfig();
    const [isDirty, setIsDirty] = useUnsavedChangesWarning();
    return (
        <HotkeysSettingContent
            hotkeysConfig={hotkeysConfig}
            setHotkeysConfigHandler={updateHotkeysConfig}
            resetHotkeysConfigHandler={fetchHotkeysConfig}
            setIsDirty={setIsDirty}
        />
    );
} 