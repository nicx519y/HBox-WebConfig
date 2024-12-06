'use client';

import { HotkeysSettingContent } from "@/components/hotkeys-setting-content";
import { useGamepadConfig } from "@/contexts/gamepad-config-context";

export default function HotkeysSettingPage() {
    const { hotkeysConfig, updateHotkeysConfig, fetchHotkeysConfig } = useGamepadConfig();

    return (
        <HotkeysSettingContent
            hotkeysConfig={hotkeysConfig}
            setHotkeysConfigHandler={updateHotkeysConfig}
            resetHotkeysConfigHandler={fetchHotkeysConfig}
        />
    );
} 