"use client";

import {
    Flex,
    Center,
    Stack,
    Fieldset,
    SimpleGrid,
    Button,
    Text,
    Box,
    Input,
    SelectRoot,
    SelectTrigger,
    SelectContent,
    SelectItem,
    SelectValueText,
    createListCollection,
    Portal,
    HStack,
} from "@chakra-ui/react";
import { useEffect, useState, useMemo } from "react";
import {
    GameProfile,
    GamepadConfig,
    HotkeyAction,
    HotkeyActionList,
    HotkeyActionLabelMap,
} from "@/types/gamepad-config";
import Hitbox from "@/components/hitbox";
import HotkeysField from "./hotkeys-field";

export function HotkeysSettingContent(
    props: {
        gamepadConfig: GamepadConfig,
        setProfileDetailsHandler: (profileId: string, profileDetails: GameProfile) => Promise<void>,
        resetProfileDetailsHandler: () => Promise<void>,
    }
) {
    const {
        gamepadConfig,
        setProfileDetailsHandler,
        resetProfileDetailsHandler,
    } = props;

    const [hotkeys, setHotkeys] = useState<Map<number, HotkeyAction>>(new Map());
    const [hotkeyInputs, setHotkeyInputs] = useState<string[]>(Array(10).fill(""));

    const hotkeyCollection = useMemo(() => {
        return createListCollection({
            items: HotkeyActionList.map(action => ({
                value: action,
                label: HotkeyActionLabelMap.get(action)?.label ?? action
            }))
        });
    }, []);

    useEffect(() => {
        // 从 gamepadConfig 加载 hotkeys 配置
        const currentProfile = gamepadConfig.profiles?.find(p => p.id === gamepadConfig.defaultProfileId);
        if (currentProfile?.hotkeys) {
            setHotkeys(new Map(currentProfile.hotkeys));
            // 更新输入框的值
            const inputs = Array(10).fill("");
            currentProfile.hotkeys.forEach((_, index) => {
                inputs[index] = `Hotkey ${index + 1}`;
            });
            setHotkeyInputs(inputs);
        }
    }, [gamepadConfig]);

    const saveProfileDetailHandler = async () => {
        const currentProfile = gamepadConfig.profiles?.find(p => p.id === gamepadConfig.defaultProfileId);
        const profileId = gamepadConfig.defaultProfileId;
        if (!currentProfile || !profileId) return;

        await setProfileDetailsHandler(profileId, {
            ...currentProfile,
            hotkeys: hotkeys
        });
    };

    const updateHotkey = (index: number, action: HotkeyAction) => {
        const newHotkeys = new Map(hotkeys);
        newHotkeys.set(index, action);
        setHotkeys(newHotkeys);
    };

    return (
        <Flex direction="row" width="1700px" padding="18px">
            <Center width="100%" flex={1}>
                <Hitbox />
            </Center>
            <Center width="700px">
                <Fieldset.Root>
                    <Stack direction="column" gap={4}>
                        <Fieldset.Legend fontSize="2rem" color="green.600">
                            HOTKEYS SETTINGS
                        </Fieldset.Legend>
                        <Fieldset.HelperText fontSize="smaller" color="gray.400">
                            Configure up to 10 hotkeys for quick access to various functions.
                        </Fieldset.HelperText>
                        <Fieldset.Content>
                            <Stack gap={6}>
                                    {Array.from({ length: 10 }, (_, i) => (
                                        <HotkeysField 
                                            key={i}
                                            value={{ key: i, action: hotkeys.get(i) ?? HotkeyAction.LedsEffectStyleNext }}
                                            changeValue={(value) => updateHotkey(i, value.action)}
                                            isActive={true}
                                        />
                                    ))}

                                <Stack direction="row" gap={4} justifyContent="flex-start" padding="32px 0px">
                                    <Button
                                        colorPalette="gray"
                                        variant="surface"
                                        size="lg"
                                        width="140px"
                                        onClick={resetProfileDetailsHandler}
                                    >
                                        Reset
                                    </Button>
                                    <Button
                                        colorPalette="green"
                                        size="lg"
                                        width="140px"
                                        onClick={saveProfileDetailHandler}
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