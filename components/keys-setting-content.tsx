"use client";

import { ProfileSelect  } from "@/components/profile-select";
import { 
    Flex, 
    Center, 
    Text, 
    Box, 
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
    GameProfileList,
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
        switchDefaultProfileHandler: (profileId: string) => Promise<void>,
        resetKeyProfileHandler: (profileId: string) => Promise<void>,
        createProfileHandler: (profileName: string) => Promise<void>,
        deleteProfileHandler: (profileId: string) => Promise<void>,
        resetGamepadConfigHandler: () => Promise<void>,
    }
) {
    
    const { 
        gamepadConfig, 
        setProfileDetailsHandler, 
        switchDefaultProfileHandler, 
        createProfileHandler, 
        deleteProfileHandler,
        resetGamepadConfigHandler,
    } = props;

    const [profileList, setProfileList] = useState<GameProfileList>({
        defaultId: "",
        maxNumProfiles: 0,
        items: [], 
    });
    const [inputMode, setInputMode] = useState<Platform>(Platform.XINPUT);
    const [socdMode, setSocdMode] = useState<GameSocdMode>(GameSocdMode.SOCD_MODE_UP_PRIORITY);
    const [invertXAxis, setInvertXAxis] = useState<boolean>(false);
    const [invertYAxis, setInvertYAxis] = useState<boolean>(false);
    const [fourWayMode, setFourWayMode] = useState<boolean>(false);
    const [keyMapping, setKeyMapping] = useState<Map<GameControllerButton, number[]>>(new Map());
    const [autoSwitch, setAutoSwitch] = useState<boolean>(true);
    const [inputKey, setInputKey] = useState<number>(-1);

    useEffect(() => {
        setProfileList({
            defaultId: gamepadConfig.defaultProfileId ?? "",
            maxNumProfiles: gamepadConfig.numProfilesMax ?? 0,
            items: gamepadConfig.profiles?.map(p => ({
                id: p.id ?? "",
                name: p.name ?? "",
                gamePlatform: p.inputMode ?? Platform.XINPUT,
            })) ?? [],
        });

        setInputMode(gamepadConfig.profiles?.find(p => p.id === gamepadConfig.defaultProfileId)?.inputMode ?? Platform.XINPUT);
        setSocdMode(gamepadConfig.profiles?.find(p => p.id === gamepadConfig.defaultProfileId)?.socdMode ?? GameSocdMode.SOCD_MODE_UP_PRIORITY);
        setInvertXAxis(gamepadConfig.profiles?.find(p => p.id === gamepadConfig.defaultProfileId)?.invertXAxis ?? false);
        setInvertYAxis(gamepadConfig.profiles?.find(p => p.id === gamepadConfig.defaultProfileId)?.invertYAxis ?? false);
        setFourWayMode(gamepadConfig.profiles?.find(p => p.id === gamepadConfig.defaultProfileId)?.fourWayMode ?? false);
        setKeyMapping(gamepadConfig.profiles?.find(p => p.id === gamepadConfig.defaultProfileId)?.keyMapping ?? new Map());

    }, [gamepadConfig]);

    /**
     * set key mapping
     * @param key - game controller button
     * @param hitboxButtons - hitbox buttons
     */
    const setHitboxButtons = (key: string, hitboxButtons: number[]) => {
        setKeyMapping(new Map(keyMapping).set(key as GameControllerButton, hitboxButtons));
    }

    const hitboxButtonClick = (keyId: number) => {
        setInputKey(keyId);
    }

    const saveGamepadConfigHandler = () => {

        const newGamepadConfig = {
            ...gamepadConfig,
            invertXAxis: invertXAxis,
            invertYAxis: invertYAxis,
            fourWayMode: fourWayMode,
            socdMode: socdMode,
            inputMode: inputMode,
            keyMapping: keyMapping,
        }

        console.log("saveGamepadConfigHandler: ", newGamepadConfig);

        setProfileDetailsHandler(profileList.defaultId, newGamepadConfig);
    }

    return (
        <>
            <Flex direction="column" height={"100%"} >
                <Center>
                    <ProfileSelect 
                        profileList={profileList} 
                        switchDefaultProfile={switchDefaultProfileHandler}
                        createProfile={createProfileHandler} 
                        deleteProfile={deleteProfileHandler} 
                        setProfileDetails={setProfileDetailsHandler}
                    />
                </Center>
                <Flex flex={1} margin={"0 auto"} >
                    <Flex direction="row" width={"1700px"} padding={"18px"} >
                        <Center flex={1}  >
                            <Hitbox onClick={hitboxButtonClick} />
                        </Center>
                        <Center width={"700px"}  >
                            <Fieldset.Root>
                                <Stack direction={"column"} gap={4} >
                                    <Fieldset.Legend fontSize={"2rem"} >
                                        KEY SETTINGS
                                    </Fieldset.Legend>
                                    <Fieldset.HelperText fontSize={"smaller"} color={"gray.400"} >
                                        - Input Mode: The input mode of the game controller.
                                        <br />
                                        - Key Mapping: The mapping relationship between the Hitbox buttons and the Game Controller buttons.
                                    </Fieldset.HelperText>
                                    <Fieldset.Content position={"relative"} paddingTop={"30px"}  >
                                        <Stack direction={"column"} gap={6} >
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
                                            
                                            <RadioCardRoot 
                                                colorPalette={"green"} 
                                                size={"sm"} 
                                                variant={"subtle"} 
                                                defaultValue={socdMode?.toString() ?? GameSocdMode.SOCD_MODE_UP_PRIORITY.toString()} 
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
                                            
                                            <RadioCardRoot 
                                                colorPalette={"green"} 
                                                size={"sm"} 
                                                variant={"subtle"} 
                                                defaultValue={inputMode?.toString() ?? Platform.XINPUT.toString()} 
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
                                    </Fieldset.Content>
                                    <Stack direction={"row"} gap={4} justifyContent={"flex-start"} padding={"32px 0px"} >
                                        <Button colorPalette={"gray"} variant={"surface"} size={"lg"} width={"140px"} onClick={resetGamepadConfigHandler} >
                                            Reset
                                        </Button>  
                                        <Button colorPalette={"green"} size={"lg"} width={"140px"} onClick={saveGamepadConfigHandler} >
                                            Save
                                        </Button>
                                    </Stack>
                                </Stack>
                            </Fieldset.Root>
                        </Center>
                    </Flex>
                </Flex>
            </Flex>
        </>
    )
}
