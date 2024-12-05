"use client";

import {
    Flex,
    Center,
    Stack,
    Fieldset,
    SimpleGrid,
    Button,
    HStack,
    RadioCardLabel,
} from "@chakra-ui/react";
import { Tooltip } from "@/components/ui/tooltip"
import KeymappingFieldset from "@/components/keymapping-fieldset";
import { useEffect, useState } from "react";
import { Switch } from "@/components/ui/switch";
import {
    RadioCardItem,
    RadioCardRoot,
} from "@/components/ui/radio-card"
import {
    GameProfile,
    GamepadConfig,
    GameSocdMode,
    GameSocdModeList,
    GameSocdModeLabelMap,
    Platform,
    PlatformList,
    PlatformLabelMap,
    GameControllerButton,
} from "@/types/gamepad-config";
import { SegmentedControl } from "@/components/ui/segmented-control";
import Hitbox from "@/components/hitbox";
import { LuInfo } from "react-icons/lu";
import { ToggleTip } from "@/components/ui/toggle-tip"

export function KeysSettingContent(

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


    const [inputMode, setInputMode] = useState<Platform>(Platform.XINPUT);
    const [socdMode, setSocdMode] = useState<GameSocdMode>(GameSocdMode.SOCD_MODE_UP_PRIORITY);
    const [invertXAxis, setInvertXAxis] = useState<boolean>(false);
    const [invertYAxis, setInvertYAxis] = useState<boolean>(false);
    const [fourWayMode, setFourWayMode] = useState<boolean>(false);
    const [keyMapping, setKeyMapping] = useState<{ [key in GameControllerButton]?: number[] }>({});
    const [autoSwitch, setAutoSwitch] = useState<boolean>(true);
    const [inputKey, setInputKey] = useState<number>(-1);

    useEffect(() => {
        setInputMode(gamepadConfig.profiles?.[0]?.keysConfig?.inputMode ?? Platform.XINPUT);
        setSocdMode(gamepadConfig.profiles?.[0]?.keysConfig?.socdMode ?? GameSocdMode.SOCD_MODE_UP_PRIORITY);
        setInvertXAxis(gamepadConfig.profiles?.[0]?.keysConfig?.invertXAxis ?? false);
        setInvertYAxis(gamepadConfig.profiles?.[0]?.keysConfig?.invertYAxis ?? false);
        setFourWayMode(gamepadConfig.profiles?.[0]?.keysConfig?.fourWayMode ?? false);
        setKeyMapping(gamepadConfig.profiles?.[0]?.keysConfig?.keyMapping ?? {});

    }, [gamepadConfig]);

    /**
     * set key mapping
     * @param key - game controller button
     * @param hitboxButtons - hitbox buttons
     */
    const setHitboxButtons = (key: string, hitboxButtons: number[]) => {
        setKeyMapping({
            ...keyMapping,
            [key as GameControllerButton]: hitboxButtons,
        });
    }

    const hitboxButtonClick = (keyId: number) => {
        console.log("hitboxButtonClick: ", keyId);
        setInputKey(keyId);
    }

    const saveProfileDetailHandler = () => {

        const newProfile: GameProfile = {
            id: gamepadConfig.defaultProfileId ?? "",
            keysConfig: {
                invertXAxis: invertXAxis,
                invertYAxis: invertYAxis,
                fourWayMode: fourWayMode,
                socdMode: socdMode,
                inputMode: inputMode,
                keyMapping: keyMapping,
            },
        }

        setProfileDetailsHandler(gamepadConfig.defaultProfileId ?? "", newProfile);
    }

    return (
        <>
            <Flex direction="row" width={"1700px"} padding={"18px"} >
                <Center flex={1}  >
                    <Hitbox 
                        onClick={hitboxButtonClick} 
                        interactiveIds={[ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18 ]} 
                    />
                </Center>
                <Center width={"700px"}  >
                    <Fieldset.Root>
                        <Stack direction={"column"} gap={4} >
                            <Fieldset.Legend fontSize={"2rem"} color={"green.600"} >
                                KEY SETTINGS
                            </Fieldset.Legend>
                            <Fieldset.HelperText fontSize={"smaller"} color={"gray.400"} >
                                - Input Mode: The input mode of the game controller.
                                <br />
                                - Key Mapping: The mapping relationship between the Hitbox buttons and the Game Controller buttons.
                            </Fieldset.HelperText>
                            <Fieldset.Content position={"relative"} paddingTop={"30px"}  >

                                {/* Key Mapping */}
                                <Stack direction={"column"} gap={6} >
                                    <Fieldset.Legend fontSize={"md"} >Key Mapping</Fieldset.Legend>
                                    <HStack gap={1} >
                                        <SegmentedControl
                                            width={"177px"}
                                            size={"xs"}
                                            defaultValue={autoSwitch ? "Auto Switch" : "Manual Switch"}
                                            items={["Auto Switch", "Manual Switch"]}
                                            onValueChange={(detail) => setAutoSwitch(detail.value === "Auto Switch")}
                                        />
                                        <ToggleTip
                                            content="Auto Switch: Automatically switch the button field when the input key is changed.\nManual Switch: Manually set the active button field."
                                        >
                                            <Button size="xs" variant="ghost">
                                                <LuInfo />
                                            </Button>
                                        </ToggleTip>
                                    </HStack>
                                    <KeymappingFieldset
                                        autoSwitch={autoSwitch}
                                        inputKey={inputKey}
                                        inputMode={inputMode}
                                        keyMapping={keyMapping}
                                        changeKeyMappingHandler={setHitboxButtons}
                                    />
                                </Stack>

                                {/* Input Mode Choice */}
                                <RadioCardRoot
                                    colorPalette={"green"}
                                    size={"sm"}
                                    variant={"subtle"}
                                    value={inputMode?.toString() ?? Platform.XINPUT.toString()}
                                    onValueChange={(detail) => setInputMode(detail.value as Platform)}
                                >
                                    <RadioCardLabel>Input Mode Choice</RadioCardLabel>
                                    <SimpleGrid gap={1} columns={3} >
                                        {PlatformList.map((platform, index) => (
                                            <Tooltip key={index} content={PlatformLabelMap.get(platform as Platform)?.description ?? ""} >
                                                <RadioCardItem
                                                    fontSize={"xs"}
                                                    indicator={false}
                                                    key={index}
                                                    value={platform.toString()}
                                                    label={PlatformLabelMap.get(platform as Platform)?.label ?? ""}
                                                />
                                            </Tooltip>
                                        ))}
                                    </SimpleGrid>
                                </RadioCardRoot>


                                {/* SOCD Mode Choice */}
                                <RadioCardRoot
                                    colorPalette={"green"}
                                    size={"sm"}
                                    variant={"subtle"}
                                    value={socdMode?.toString() ?? GameSocdMode.SOCD_MODE_UP_PRIORITY.toString()}
                                    onValueChange={(detail) => setSocdMode(detail.value as GameSocdMode)}
                                >
                                    <RadioCardLabel>SOCD Mode Choice</RadioCardLabel>
                                    <SimpleGrid gap={1} columns={5} >
                                        {GameSocdModeList.map((socdMode, index) => (
                                            <Tooltip key={index} content={GameSocdModeLabelMap.get(socdMode as GameSocdMode)?.description ?? ""} >
                                                <RadioCardItem
                                                    fontSize={"xs"}
                                                    indicator={false}
                                                    key={index}
                                                    value={socdMode.toString()}
                                                    label={GameSocdModeLabelMap.get(socdMode as GameSocdMode)?.label ?? ""}
                                                />
                                            </Tooltip>
                                        ))}
                                    </SimpleGrid>
                                </RadioCardRoot>

                                {/* Invert Axis Choice & Invert Y Axis Choice & FourWay Mode Choice */}
                                <HStack gap={5} >
                                    <Switch colorPalette={"green"} checked={invertXAxis} onChange={() => setInvertXAxis(!invertXAxis)} >Invert X Axis</Switch>
                                    <Switch colorPalette={"green"} checked={invertYAxis} onChange={() => setInvertYAxis(!invertYAxis)} >Invert Y Axis</Switch>
                                    {/* <Switch colorPalette={"green"} checked={fourWayMode} onChange={() => setFourWayMode(!fourWayMode)} >FourWay Mode</Switch>  
                                                <ToggleTip content="FourWay Mode: Enable the four-way mode of the Dpad, which means the Dpad will be treated as a four-way direction pad.\n(Only available when the input mode is Switch)" >
                                                    <Button size="xs" variant="ghost">
                                                        <LuInfo />
                                                    </Button>
                                                </ToggleTip> */}
                                </HStack>

                            </Fieldset.Content>
                            <Stack direction={"row"} gap={4} justifyContent={"flex-start"} padding={"32px 0px"} >
                                <Button colorPalette={"gray"} variant={"surface"} size={"lg"} width={"140px"} onClick={resetProfileDetailsHandler} >
                                    Reset
                                </Button>
                                <Button colorPalette={"green"} size={"lg"} width={"140px"} onClick={saveProfileDetailHandler} >
                                    Save
                                </Button>
                            </Stack>
                        </Stack>
                    </Fieldset.Root>
                </Center>
            </Flex>
        </>
    )
}
