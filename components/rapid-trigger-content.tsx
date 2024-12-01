"use client";

import {
    Flex,
    Center,
    Stack,
    Fieldset,
    Button,
    Text,
} from "@chakra-ui/react";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { useEffect, useState } from "react";
import {
    GameProfile,
    GamepadConfig,
    GameControllerButton,
    RapidTriggerConfig
} from "@/types/gamepad-config";
import Hitbox from "@/components/hitbox";

interface TriggerConfig {
    topDeadzone: number;
    bottomDeadzone: number;
    pressAccuracy: number;
    releaseAccuracy: number;
}

const defaultTriggerConfig: TriggerConfig = {
    topDeadzone: 0,
    bottomDeadzone: 0,
    pressAccuracy: 0,
    releaseAccuracy: 0
};

export function RapidTriggerContent(
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

    const [selectedButton, setSelectedButton] = useState<number | null>(0); // 当前选中的按钮
    const [triggerConfigs, setTriggerConfigs] = useState<Map<number, TriggerConfig>>(new Map()); // 按钮配置
    const [isAllBtnsConfiguring, setIsAllBtnsConfiguring] = useState(false); // 是否同时配置所有按钮
    const [allBtnsConfig, setAllBtnsConfig] = useState<RapidTriggerConfig>({  // 覆盖所有按钮的配置
        topDeadzone: 0,
        bottomDeadzone: 0,
        pressAccuracy: 0,
        releaseAccuracy: 0
    });

    /**
     * 加载触发配置
     */
    useEffect(() => {
        // Load trigger configs from gamepadConfig when it changes
        const configs = new Map(
            Array.from(gamepadConfig.profiles?.find(p => p.id === gamepadConfig.defaultProfileId)?.triggerConfigs ?? [])
                .map(([key, value]) => [Number(key), value])
        );
        setTriggerConfigs(configs);
    }, [gamepadConfig]);

    /**
     * 获取当前配置
     */
    const getCurrentConfig = () => {
        if (selectedButton === null) return defaultTriggerConfig;
        return triggerConfigs.get(selectedButton) ?? defaultTriggerConfig;
    };

    /**
     * 更新当前配置
     */
    const updateConfig = (key: keyof TriggerConfig, value: number) => {
        if (selectedButton === null) return;

        const newConfigs = new Map(triggerConfigs);
        newConfigs.set(selectedButton, {
            ...getCurrentConfig(),
            [key]: value
        });
        setTriggerConfigs(newConfigs);
    };

    /**
     * 更新所有按钮配置
     */
    const updateAllBtnsConfig = (key: keyof RapidTriggerConfig, value: number) => {
        setAllBtnsConfig({
            ...allBtnsConfig,
            [key]: value
        });
    };

    /**
     * 切换所有按钮配置
     */
    const switchAllBtnsConfiging = (n: boolean) => {
        if(n === true) {
            setAllBtnsConfig({
                ...allBtnsConfig,
                ...getCurrentConfig()
            });
        }
        setIsAllBtnsConfiguring(n);
    }

    /**
     * 保存配置
     */ 
    const saveProfileDetailHandler = async () => {
        const currentProfile = gamepadConfig.profiles?.find(p => p.id === gamepadConfig.defaultProfileId);
        const profileId = gamepadConfig.defaultProfileId;
        if (!currentProfile || typeof(profileId) !== 'number') return;

        // 使用 unknown 作为中间类型进行安全转换
        const convertedConfigs = new Map(
            Array.from(triggerConfigs.entries())
                .map(([key, value]) => [(key as unknown) as number, value])
        );

        await setProfileDetailsHandler(profileId, {
            ...currentProfile,
            triggerConfigs: convertedConfigs
        });
    };

    /**
     * 点击按钮
     */
    const handleButtonClick = (id: number) => {
        console.log("handleButtonClick: ", id);
        if (!isAllBtnsConfiguring && selectedButton !== id && id >= 0) {
            setSelectedButton(id);
        }
    };

    return (
        <Flex direction="row" width="1700px" padding={"18px"} >
            <Center width="100%" flex={1} >
                <Hitbox 
                    onClick={(id) => handleButtonClick(id)}
                    highlightIds={!isAllBtnsConfiguring ? [selectedButton ?? -1] : [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15 ]}
                    interactiveIds={[ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15 ]} 
                />
            </Center>
            <Center width="700px" >
                <Fieldset.Root width="100%">
                    <Stack direction="column" gap={4}>
                        <Fieldset.Legend fontSize="2rem" color="green.600">
                            RAPID TRIGGER SETTINGS
                        </Fieldset.Legend>
                        <Fieldset.HelperText fontSize="smaller" color="gray.400">
                            - Top Deadzone: The distance from the top of the trigger to the deadzone.
                            <br />
                            - Bottom Deadzone: The distance from the bottom of the trigger to the deadzone.
                            <br />
                            - Press Accuracy: The accuracy of the trigger when pressed.
                            <br />
                            - Release Accuracy: The accuracy of the trigger when released.
                        </Fieldset.HelperText>
                        <Fieldset.Content>
                            <Stack gap={6}>

                                <Switch
                                    colorPalette={"green"}
                                    checked={isAllBtnsConfiguring}
                                    onChange={() => switchAllBtnsConfiging(!isAllBtnsConfiguring)}
                                >Configure all buttons at once</Switch>

                                <Text color={!isAllBtnsConfiguring ? "green.400" : "gray.700"} >
                                    {(selectedButton !== null && !isAllBtnsConfiguring) ? 
                                        `Configuring button: `
                                        : 'Select a button to configure'
                                    }
                                    {(selectedButton !== null && !isAllBtnsConfiguring) && (
                                        <Text as="span" fontWeight="bold">
                                            KEY-{(selectedButton ?? 0) + 1}
                                        </Text>
                                    )}
                                </Text>

                                {/* Sliders */}
                                {[
                                    { key: 'topDeadzone', label: 'Top Deadzone (mm)' },
                                    { key: 'bottomDeadzone', label: 'Bottom Deadzone (mm)' },
                                    { key: 'pressAccuracy', label: 'Press Accuracy (mm)' },
                                    { key: 'releaseAccuracy', label: 'Release Accuracy (mm)' },
                                ].map(({ key, label }) => (
                                    <Stack key={key} gap={6} >
                                        <Slider
                                            label={label}
                                            value={[ isAllBtnsConfiguring ? allBtnsConfig[key as keyof RapidTriggerConfig] : getCurrentConfig()[key as keyof TriggerConfig]]}
                                            colorPalette={"green"}
                                            min={0}
                                            max={1}
                                            step={0.1}
                                            onValueChange={(details) => isAllBtnsConfiguring ? updateAllBtnsConfig(key as keyof RapidTriggerConfig, details.value[0]) : updateConfig(key as keyof TriggerConfig, details.value[0])}
                                            disabled={selectedButton === null && !isAllBtnsConfiguring}
                                            width={"400px"}
                                            marks={[
                                                { value: 0, label: '0' },
                                                { value: 0.2, label: '0.2' },
                                                { value: 0.4, label: '0.4' },
                                                { value: 0.6, label: '0.6' },
                                                { value: 0.8, label: '0.8' },
                                                { value: 1, label: '1' },
                                            ]}
                                        />
                                        <Text fontSize="sm" color="gray.400">
                                            Value: { isAllBtnsConfiguring ? allBtnsConfig[key as keyof RapidTriggerConfig] : getCurrentConfig()[key as keyof TriggerConfig]}
                                        </Text>
                                    </Stack>
                                ))}

                                {/* Buttons */}
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