'use client';

import {  Platform } from "@/types/gamepad-config";
import { 
    GameControllerButton, 
    GameControllerButtonList,
    XInputButtonMap,
    PS4ButtonMap,
    SwitchButtonMap,    
    NumBindKeyPerButtonMax,
} from "@/types/gamepad-config";
import KeymappingField from "@/components/keymapping-field";
import { toaster } from "@/components/ui/toaster";
import { useEffect, useMemo, useState } from "react";
import { SimpleGrid } from "@chakra-ui/react";

export default function KeymappingFieldset(
    props: {
        inputMode: Platform,
        inputKey: number,
        keyMapping: Map<GameControllerButton, number[]>,
        autoSwitch: boolean,
        changeKeyMappingHandler: (key: GameControllerButton, value: number[]) => void,
    }
) {

    const { inputMode, inputKey, keyMapping, autoSwitch, changeKeyMappingHandler } = props;

    const [activeButton, setActiveButton] = useState<GameControllerButton>(GameControllerButtonList[0]);
    /**
     * change key mapping when input key is changed
     */
    useEffect(() => {
        
        // input key is valid
        if(inputKey >= 0) {

            const activeKeyMapping = keyMapping.get(activeButton) ?? [];
            if(activeKeyMapping.indexOf(inputKey) !== -1) { // key already binded
                toaster.create({
                    title: "Key already binded.",
                    description: "Please select another key.",
                    type: "error",
                });
                return;
            } else if(activeKeyMapping.length >= NumBindKeyPerButtonMax) { // key not binded, and reach max number of key binding per button
                toaster.create({
                    title: "Max number of key binding per button reached.",
                    description: "Please unbind some keys first.",
                    type: "error",
                });
                return;
            } else { // key not binded, and not reach max number of key binding per button

                // remove input key from other button
                keyMapping.forEach((value, key) => {
                    if(key !== activeButton && value.indexOf(inputKey) !== -1) {
                        value.splice(value.indexOf(inputKey), 1);
                        changeKeyMappingHandler(key, value);
                        toaster.create({
                            title: "Key already binded on other button.",
                            description: `Unbinded from [ ${ buttonLabelMap.get(key) ?? "" } ] button and Rebinded to [ ${ buttonLabelMap.get(activeButton) ?? "" } ] button.`,
                            type: "info",
                        });
                    }
                });

                // add input key to active button
                activeKeyMapping.push(inputKey);
                changeKeyMappingHandler(activeButton, activeKeyMapping);

                if(autoSwitch) {
                    const nextButton = GameControllerButtonList[GameControllerButtonList.indexOf(activeButton) + 1] ?? GameControllerButtonList[0];
                    setActiveButton(nextButton);
                }
                
            }
        }
    }, [inputKey]);

    /**
     * get button label map by input mode
     */
    const buttonLabelMap = useMemo(() => {
        switch(inputMode) {
            case Platform.XINPUT: return XInputButtonMap;
            case Platform.PS4: return PS4ButtonMap;
            case Platform.SWITCH: return SwitchButtonMap;
            default: return new Map<GameControllerButton, string>();
        }
    }, [inputMode]);

    return (
        <>
            <SimpleGrid gap={1} columns={3} >
                {GameControllerButtonList.map((gameControllerButton, index) => (
                    <KeymappingField
                        key={ index }  
                        onClick={() => setActiveButton(gameControllerButton)}
                        label={buttonLabelMap.get(gameControllerButton) ?? ""} 
                        value={keyMapping?.get(gameControllerButton) ?? []}
                        changeValue={(v: number[]) => changeKeyMappingHandler(gameControllerButton, v)} 
                        isActive={activeButton === gameControllerButton}
                    />
                ))}
            </SimpleGrid>
        </>
    )
}