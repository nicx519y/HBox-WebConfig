"use client";

import {
    Flex,
    Center,
    Stack,
    Fieldset,
    Button,
} from "@chakra-ui/react";
import { useEffect, useState, useMemo } from "react";
import {
    HotkeyAction,
    DEFAULT_NUM_HOTKEYS_MAX,
    Hotkey,
} from "@/types/gamepad-config";
import Hitbox from "@/components/hitbox";
import HotkeysField from "./hotkeys-field";
import { toaster } from "@/components/ui/toaster";

export function HotkeysSettingContent(
    props: {
        hotkeysConfig: Hotkey[],
        resetHotkeysConfigHandler: () => void,
        setHotkeysConfigHandler: (hotkeysConfig: Hotkey[]) => void,
        setIsDirty?: (value: boolean) => void,  
    }
) {
    const {
        hotkeysConfig,
        resetHotkeysConfigHandler,
        setHotkeysConfigHandler,
        setIsDirty,
    } = props;

    const [hotkeys, setHotkeys] = useState<Hotkey[]>([]);
    const [activeHotkeyIndex, setActiveHotkeyIndex] = useState<number>(0);
    
    useEffect(() => {
        // 从 gamepadConfig 加载 hotkeys 配置
        setHotkeys(Array.from({ length: DEFAULT_NUM_HOTKEYS_MAX }, (_, i) => {
            return hotkeysConfig?.[i] ?? { key: -1, action: HotkeyAction.None, isLocked: false };
        }));
        setIsDirty?.(false);
    }, [hotkeysConfig]);

    useMemo(() => {
        if(activeHotkeyIndex >= 0 && hotkeys[activeHotkeyIndex]?.isLocked === true) {
            const index = hotkeys.findIndex(h => h.isLocked === undefined || h.isLocked === false);
            if(index >= 0) {
                setActiveHotkeyIndex(index);
            }
        }
    }, [hotkeys]);  

    const saveHotkeysConfigHandler = async () => {
        if (!hotkeysConfig) return;
        await setHotkeysConfigHandler(hotkeys);
    };

    const updateHotkey = (index: number, hotkey: Hotkey) => {
        if (index < 0 || index >= DEFAULT_NUM_HOTKEYS_MAX) return;

        const keys = hotkeys.map(h => h.key);
        const keyIndex = keys.indexOf(hotkey.key);
        // 如果 hotkey 的 key 已经在 hotkeys 中，并且不是当前正在编辑的 hotkey，则不更新
        if(keyIndex >= 0 && keyIndex !== index && hotkey.key >= 0) {
            toaster.create({
                title: "Key already binded.",
                description: "Please select another key, or unbind the key first.",
                type: "error",
            });
            return;
        }

        const newHotkeys = hotkeys.slice();
        newHotkeys[index] = hotkey;
        setHotkeys(newHotkeys);
        setIsDirty?.(true); // 更新 dirty 状态
    };

    const handleHitboxClick = (id: number) => {
        if (id >= 0 && id < 19) {
            updateHotkey(activeHotkeyIndex, { ...hotkeys[activeHotkeyIndex], key: id });
        }
    };

    return (
        <Flex direction="row" width="1700px" padding="18px">
            <Center width="100%" flex={1}>
                <Hitbox
                    interactiveIds={[...Array(19).fill(0).map((_, i) => i)]} // 0-18 共19个按键可以交互，并设置为hotkey
                    onClick={handleHitboxClick}
                />
            </Center>
            <Center width="700px">
                <Fieldset.Root>
                    <Stack direction="column" gap={4}>
                        <Fieldset.Legend fontSize="2rem" color="green.600">
                            HOTKEYS SETTINGS
                        </Fieldset.Legend>
                        <Fieldset.HelperText fontSize="smaller" color="gray.400">
                            Configure up to 10 hotkeys for quick access to various functions.
                            <br />
                            - Click on the hotkey field and press the desired key on the hitbox to bind the hotkey.
                            <br />
                            - Choice the hotkey action from the dropdown list.
                            <br />
                            - Locked hotkeys are used for web configuration mode because this function is required.
                        </Fieldset.HelperText>
                        <Fieldset.Content pt="30px" >
                            <Stack gap={4}>
                                {Array.from({ length: DEFAULT_NUM_HOTKEYS_MAX }, (_, i) => (
                                    <HotkeysField
                                        key={i}
                                        index={i}
                                        value={hotkeys[i] ?? { key: -1, action: HotkeyAction.None }}
                                        onValueChange={(changeDetail) => {
                                            updateHotkey(i, changeDetail);
                                        }}
                                        isActive={ i === activeHotkeyIndex }
                                        onFieldClick={(index) => setActiveHotkeyIndex(index)}
                                        disabled={hotkeys[i]?.isLocked ?? false}
                                    />
                                ))}

                                <Stack direction="row" gap={4} justifyContent="flex-start" padding="32px 0px">
                                    <Button
                                        colorPalette="gray"
                                        variant="surface"
                                        size="lg"
                                        width="140px"
                                        onClick={resetHotkeysConfigHandler}
                                    >
                                        Reset
                                    </Button>
                                    <Button
                                        colorPalette="green"
                                        size="lg"
                                        width="140px"
                                        onClick={saveHotkeysConfigHandler}
                                    >
                                        Save
                                    </Button>
                                </Stack>
                            </Stack>
                        </Fieldset.Content>
                    </Stack>
                </Fieldset.Root>
            </Center>
        </Flex>
    );
} 