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
    Color,
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
    ColorPickerInput,
    ColorPickerLabel,
    ColorPickerRoot,
    ColorPickerSliders,
    ColorPickerTrigger,
} from "@/components/ui/color-picker"

import { useEffect, useState } from "react";
import {
    GameProfile,
    LedsEffectStyle,
    LedsEffectStyleList,
    LedsEffectStyleLabelMap,
    ledColorsLabel,
    LEDS_COLOR_DEFAULT,
} from "@/types/gamepad-config";
import { LuSunDim, LuActivity } from "react-icons/lu";
import Hitbox from "./hitbox";

export function LEDsSettingContent(

    props: {
        defaultProfile: GameProfile,
        setProfileDetailsHandler: (profileId: string, profileDetails: GameProfile) => void,
        resetProfileDetailsHandler: () => void,
        setIsDirty?: (value: boolean) => void,   
    }
) {

    const {
        defaultProfile,
        setProfileDetailsHandler,
        resetProfileDetailsHandler,
        setIsDirty,
    } = props;


    const [ledsEffectStyle, setLedsEffectStyle] = useState<LedsEffectStyle>(LedsEffectStyle.STATIC);
    const [color1, setColor1] = useState<Color>(parseColor(LEDS_COLOR_DEFAULT));
    const [color2, setColor2] = useState<Color>(parseColor(LEDS_COLOR_DEFAULT));
    const [color3, setColor3] = useState<Color>(parseColor(LEDS_COLOR_DEFAULT));
    const [ledBrightness, setLedBrightness] = useState<number>(75);
    const [ledEnabled, setLedEnabled] = useState<boolean>(true);

    const iconMap: Record<string, JSX.Element> = {
        'sun-dim': <LuSunDim />,
        'activity': <LuActivity />
    };

    // Initialize the state with the default profile details
    useEffect(() => {
        const ledsConfigs = defaultProfile.ledsConfigs;
        if (ledsConfigs) {
            setLedsEffectStyle(ledsConfigs.ledsEffectStyle  ?? LedsEffectStyle.STATIC);
            setColor1(parseColor(ledsConfigs.ledColors?.[0] ?? LEDS_COLOR_DEFAULT));
            setColor2(parseColor(ledsConfigs.ledColors?.[1] ?? LEDS_COLOR_DEFAULT));
            setColor3(parseColor(ledsConfigs.ledColors?.[2] ?? LEDS_COLOR_DEFAULT));
            setLedBrightness(ledsConfigs.ledBrightness ?? 75);
            setLedEnabled(ledsConfigs.ledEnabled ?? true);
            setIsDirty?.(false);
        }
    }, [defaultProfile]);

    // Save the profile details
    const saveProfileDetailsHandler = () => {
        const newProfileDetails = {
            id: defaultProfile.id,
            ledsConfigs: {
                ledEnabled: ledEnabled,
                ledsEffectStyle: ledsEffectStyle,
                ledColors: [color1.toString('hex'), color2.toString('hex'), color3.toString('hex')],
                ledBrightness: ledBrightness,
            }
        }

        console.log("saveProfileDetailHandler: ", newProfileDetails);
        setProfileDetailsHandler(defaultProfile.id, newProfileDetails as GameProfile);
    }

    const colorPickerDisabled = (index: number) => {
        return (index == 2 && !(LedsEffectStyleLabelMap.get(ledsEffectStyle)?.hasBackColor2 ?? false)) || !ledEnabled;
    }

    return (
        <>
            <Flex direction="row" width={"1700px"} padding={"18px"} >
                <Center flex={1}  >
                    <Hitbox
                        hasLeds={true}
                        colorEnabled={ledEnabled}
                        frontColor={color1}
                        backColor1={color2}
                        backColor2={color3}
                        effectStyle={ledsEffectStyle}
                        brightness={ledBrightness}
                        interactiveIds={[
                            0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15,
                        ]} 
                    />
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
                                    <Switch colorPalette={"green"} checked={ledEnabled} 
                                        onChange={() => {
                                            setLedEnabled(!ledEnabled);
                                            setIsDirty?.(true);
                                        }} >LED Enabled</Switch>
                                    {/* LED Effect Style */}
                                    <RadioCardRoot
                                        colorPalette={ledEnabled ? "green" : "gray"}
                                        size={"sm"}
                                        variant={"subtle"}
                                        value={ledsEffectStyle?.toString() ?? LedsEffectStyle.STATIC.toString()}
                                        onValueChange={(detail) => {
                                            setLedsEffectStyle(detail.value as LedsEffectStyle);
                                            setIsDirty?.(true);
                                        }}
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
                                        {Array.from({ length: 3 }).map((_, index) => (
                                            <ColorPickerRoot
                                                key={index}
                                                value={
                                                    index === 0 ? color1 :
                                                    index === 1 ? color2 :
                                                    index === 2 ? color3 :
                                                    parseColor(LEDS_COLOR_DEFAULT)  
                                                }
                                                maxW="200px"
                                                disabled={colorPickerDisabled(index)}
                                                onValueChange={(e) => {
                                                    setIsDirty?.(true);
                                                    const hex = e.value;
                                                    if (index === 0) setColor1(hex);
                                                    if (index === 1) setColor2(hex);
                                                    if (index === 2) setColor3(hex);
                                                }}
                                            >
                                                <ColorPickerLabel color={colorPickerDisabled(index) ? "gray.800" : "gray.400"} >{ledColorsLabel[index]}</ColorPickerLabel>
                                                <ColorPickerControl >
                                                    <ColorPickerInput colorPalette={"green"} fontSize={"sm"} color={"gray.400"} />
                                                    <ColorPickerTrigger />
                                                </ColorPickerControl>
                                                <ColorPickerContent>
                                                    <ColorPickerArea />
                                                    <HStack>
                                                        <ColorPickerSliders />
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
                                        value={[ledBrightness]}
                                        onValueChange={(e) => {
                                            setLedBrightness(e.value[0]);
                                            setIsDirty?.(true);
                                        }}
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
                                        Value: {ledBrightness}
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
        </>
    )
}
