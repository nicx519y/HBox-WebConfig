"use client";

import {
    Flex,
    Center,
    Stack,
    Fieldset,
    Button,
    RadioCardLabel,
    SimpleGrid,
    Icon,
    HStack,
    parseColor,
    Text,
} from "@chakra-ui/react";

import { Field } from "@/components/ui/field"
import { Slider } from "@/components/ui/slider"
import { Tooltip } from "@/components/ui/tooltip"
import { Switch } from "@/components/ui/switch"
import {
    RadioCardItem,
    RadioCardRoot,
} from "@/components/ui/radio-card"

import {
    ColorPickerArea,
    ColorPickerContent,
    ColorPickerControl,
    ColorPickerEyeDropper,
    ColorPickerInput,
    ColorPickerLabel,
    ColorPickerRoot,
    ColorPickerSliders,
    ColorPickerTrigger,
} from "@/components/ui/color-picker"

import { useEffect, useState } from "react";
import {
    GameProfile,
    GamepadConfig,
    LedsEffectStyle,
    LedsEffectStyleList,
    LedsEffectStyleLabelMap,
    ledColorsLabel,
} from "@/types/gamepad-config";
import Hitbox from "@/components/hitbox";
import { LuSunDim, LuActivity } from "react-icons/lu";

export function LEDsSettingContent(

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


    const [ledsEffectStyle, setLedsEffectStyle] = useState<LedsEffectStyle>(LedsEffectStyle.STATIC);
    const [ledColors, setLedColors] = useState<string[]>(["#000000", "#000000", "#000000"]);
    const [ledBrightness, setLedBrightness] = useState<number>(0);
    const [ledEnabled, setLedEnabled] = useState<boolean>(false);

    const iconMap: Record<string, JSX.Element> = {
        'sun-dim': <LuSunDim />,
        'activity': <LuActivity />
    };

    // Initialize the state with the default profile details
    useEffect(() => {
        const defaultProfile = gamepadConfig.profiles?.find(p => p.id === gamepadConfig.defaultProfileId);
        if (defaultProfile) {
            setLedsEffectStyle(defaultProfile.ledEffectStyle ?? LedsEffectStyle.STATIC);
            setLedColors(defaultProfile.ledColors ?? ['#000000', '#000000', '#000000']);
            setLedBrightness(defaultProfile.ledBrightness ?? 0);
            setLedEnabled(defaultProfile.ledEnabled ?? true);
        }
    }, [gamepadConfig]);

    // Save the profile details
    const saveProfileDetailsHandler = () => {
        const newProfileDetails = {
            ...gamepadConfig.profiles?.find(p => p.id === gamepadConfig.defaultProfileId),
        }

        console.log("saveProfileDetailHandler: ", newProfileDetails);
        setProfileDetailsHandler(gamepadConfig.defaultProfileId ?? "", newProfileDetails);
    }

    const colorPickerDisabled = (index: number) => {
        return (index==2 && !(LedsEffectStyleLabelMap.get(ledsEffectStyle)?.hasBackColor2 ?? false)) || !ledEnabled;
    }

    return (
        <>
            <Flex direction="column" height={"100%"} >
                <Flex flex={1} margin={"0 auto"} >
                    <Flex direction="row" width={"1700px"} padding={"18px"} >
                        <Center flex={1}  >
                            <Hitbox />
                        </Center>
                        <Center width={"700px"}  >
                            <Fieldset.Root>
                                <Stack direction={"column"} gap={4} >
                                    <Fieldset.Legend fontSize={"2rem"} color={"green.600"} >
                                        LEDS SETTINGS
                                    </Fieldset.Legend>
                                    <Fieldset.HelperText fontSize={"smaller"} color={"gray.400"} >
                                        The LED effect style, colors, and brightness can be customized here.
                                        <br />
                                        - Static: The LEDs are always on with the same color.
                                        <br />
                                        - Breathing: The LEDs breath with the two colors.
                                        <br />
                                        - Front Color: The color of the LEDs when the button is pressed, And back Color: The color of the LEDs based on the effect.
                                    </Fieldset.HelperText>
                                    <Fieldset.Content position={"relative"} paddingTop={"30px"}  >

                                        {/* LED Effect Style */}
                                        <Stack direction={"column"} gap={6} >
                                            <Switch colorPalette={"green"} checked={ledEnabled} onChange={() => setLedEnabled(!ledEnabled)} >LED Enabled</Switch>
                                            {/* LED Effect Style */}    
                                            <RadioCardRoot
                                                colorPalette={ledEnabled ? "green" : "gray" }
                                                size={"sm"}
                                                variant={"subtle"}
                                                defaultValue={ledsEffectStyle?.toString() ?? LedsEffectStyle.STATIC.toString()}
                                                onValueChange={(detail) => setLedsEffectStyle(detail.value as LedsEffectStyle)}
                                                disabled={!ledEnabled}
                                            >
                                                <RadioCardLabel>LED Effect Style Choice</RadioCardLabel>
                                                <SimpleGrid gap={1} columns={5} >
                                                    {LedsEffectStyleList.map((ledsEffectStyle, index) => (
                                                        <Tooltip key={index} content={LedsEffectStyleLabelMap.get(ledsEffectStyle)?.description ?? ""} >
                                                            <RadioCardItem
                                                                fontSize={"xs"}
                                                                indicator={false}
                                                                key={index}
                                                                icon={
                                                                    <Icon fontSize={"2xl"} >
                                                                        {iconMap[LedsEffectStyleLabelMap.get(ledsEffectStyle)?.icon ?? ""]}
                                                                    </Icon>
                                                                }
                                                                value={ledsEffectStyle.toString()}
                                                                label={LedsEffectStyleLabelMap.get(ledsEffectStyle)?.label ?? ""}
                                                                disabled={!ledEnabled}
                                                            />
                                                        </Tooltip>
                                                    ))}
                                                </SimpleGrid>
                                            </RadioCardRoot>
                                            
                                            {/* LED Colors */}
                                            <Field >
                                                {ledColors.map((color, index) => (
                                                    <ColorPickerRoot 
                                                        key={index} 
                                                        defaultValue={parseColor(color)} 
                                                        maxW="200px" 
                                                        disabled={colorPickerDisabled(index)} 
                                                        
                                                    >
                                                        <ColorPickerLabel color={colorPickerDisabled(index) ? "gray.800" : "gray.400"} >{ledColorsLabel[index]}</ColorPickerLabel>
                                                        <ColorPickerControl >
                                                            <ColorPickerInput colorPalette={"green"} fontSize={"sm"} color={"gray.400"}/>
                                                            <ColorPickerTrigger />
                                                        </ColorPickerControl>
                                                        <ColorPickerContent>
                                                            <ColorPickerArea />
                                                            <HStack>
                                                                <ColorPickerEyeDropper />
                                                                <ColorPickerSliders  />
                                                            </HStack>
                                                        </ColorPickerContent>
                                                    </ColorPickerRoot>
                                                ))}
                                            </Field>

                                            {/* LED Brightness */}  
                                            <Slider
                                                label="LED Brightness"
                                                size={"md"}
                                                colorPalette={"green"}
                                                width={"300px"}
                                                defaultValue={[ledBrightness]}
                                                onValueChange={(e) => setLedBrightness(e.value[0])}
                                                disabled={!ledEnabled}
                                                marks={[
                                                    { value: 0, label: "0" },
                                                    { value: 25, label: "25" },
                                                    { value: 50, label: "50" },
                                                    { value: 75, label: "75" },
                                                    { value: 100, label: "100" },
                                                ]}
                                            />
                                            <Text fontSize={"sm"} color={"gray.400"} >
                                                Brightness: {ledBrightness}
                                            </Text> 

                                        </Stack>

                            </Fieldset.Content>
                            <Stack direction={"row"} gap={4} justifyContent={"flex-start"} padding={"32px 0px"} >
                                <Button colorPalette={"gray"} variant={"surface"} size={"lg"} width={"140px"} onClick={resetProfileDetailsHandler} >
                                    Reset
                                </Button>
                                <Button colorPalette={"green"} size={"lg"} width={"140px"} onClick={saveProfileDetailsHandler} >
                                    Save
                                </Button>
                            </Stack>
                        </Stack>
                    </Fieldset.Root>
                </Center>
            </Flex>
        </Flex >
            </Flex >
        </>
    )
}
