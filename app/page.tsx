'use client'

import { LuCheckCheck, LuLightbulb, LuLayoutGrid, LuUnfoldVertical, LuFolderCog } from "react-icons/lu"
import { Tabs, Container, Grid, Flex } from "@chakra-ui/react"
import { Toaster } from "@/components/ui/toaster";
import { KeysSettingContent } from "@/components/keys-setting-content";
import { GameProfile, GamepadConfig } from "@/types/gamepad-config";
import { useState } from "react";
import { setProfileDetails, switchDefaultProfile, resetKeyProfile, createProfile, deleteProfile, getGamepadConfig } from "@/controller/services";

export default function Home() {

    const [gamepadConfig, setGamepadConfig] = useState<GamepadConfig>({});

    /**
     * Set the details of a profile
     * @param profileId 
     * @param profileDetails 
     * @returns 
     */
    const setProfileDetailsHandler = (profileId: string, profileDetails: GameProfile): Promise<void> => {
        console.log("setProfileDetailsHandler: ", profileId, profileDetails);

        return new Promise((resolve, reject) => {
            setProfileDetails(profileId, profileDetails)
                .then(() => getGamepadConfig().then(setGamepadConfig).then(resolve).catch(reject))
                .catch(reject);
        });
    }

    /**
     * Switch the default profile
     * @param profileId 
     * @returns 
     */
    const switchDefaultProfileHandler = (profileId: string): Promise<void> => {
        console.log("switchDefaultProfileHandler: ", profileId);
        
        return new Promise((resolve, reject) => {
            switchDefaultProfile(profileId)
                .then(() => getGamepadConfig().then(setGamepadConfig).then(resolve).catch(reject))
                .catch(reject);
        });
    }

    /**
     * Reset the key mapping of a profile
     * @param profileId 
     * @returns 
     */
    const resetKeyProfileHandler = (profileId: string): Promise<void> => {
        console.log("resetKeyProfileHandler: ", profileId);
        
        return new Promise((resolve, reject) => {
            resetKeyProfile(profileId)
                .then(() => getGamepadConfig().then(setGamepadConfig).then(resolve).catch(reject))
                .catch(reject);
        });
    }

    /**
     * Create a new profile
     * @param profileName 
     * @returns 
     */
    const createProfileHandler = (profileName: string): Promise<void> => {
        console.log("createProfileHandler: ", profileName);
        
        return new Promise((resolve, reject) => {
            createProfile(profileName)
                .then((id: string) => switchDefaultProfile(id)) // Set the new profile as the default profile
                .then(() => getGamepadConfig().then(setGamepadConfig).then(resolve).catch(reject)) // Get the gamepad config and update the state
                .catch(reject);
        });
    }

    /**
     * Delete a profile
     * @param profileId 
     * @returns 
     */
    const deleteProfileHandler = (profileId: string): Promise<void> => {
        console.log("deleteProfileHandler: ", profileId);
        
        return new Promise((resolve, reject) => {
            // Find the next profile to be the default profile
            const newId = gamepadConfig.profiles?.find(profile => profile.id !== profileId)?.id ?? gamepadConfig.profiles?.[0].id;

            deleteProfile(profileId)
                .then(() => switchDefaultProfile(newId ?? "")) // Set the new profile as the default profile
                .then(() => getGamepadConfig().then(setGamepadConfig).then(resolve).catch(reject)) // Get the gamepad config and update the state
                .catch(reject);
        });
    }

    const resetGamepadConfigHandler = (): Promise<void> => {
        console.log("resetGamepadConfigHandler");
        
        return new Promise((resolve, reject) => {
            getGamepadConfig().then(setGamepadConfig).then(resolve).catch(reject);
        });
    }

    return (    
        <Flex direction="column" height={"100vh"} >
            <Grid height={"60px"} width={"100%"} px={8} py={3} >
            </Grid>
            <Container fluid flex={1} >
                <Tabs.Root key={"enclosed"} defaultValue="keyMapping" variant={"enclosed"} height={"100%"} >
                <Flex direction="column" height={"100%"} >
                    <Tabs.List width={"100%"} justifyContent={"center"}>
                        <Tabs.Trigger value="keyMapping">
                            <LuLayoutGrid />
                            Key Settings
                        </Tabs.Trigger>
                        <Tabs.Trigger value="LEDsEffect">
                            <LuLightbulb />
                            LEDs Effect
                        </Tabs.Trigger>
                        <Tabs.Trigger value="rapidTrigger">
                            <LuUnfoldVertical />
                            Rapid Trigger
                        </Tabs.Trigger>
                        <Tabs.Trigger value="calibration">
                            <LuCheckCheck />
                            Calibration
                        </Tabs.Trigger>
                        <Tabs.Trigger value="firmware">
                            <LuFolderCog />
                            Firmware
                        </Tabs.Trigger>
                        <Tabs.Indicator rounded="18" />
                    </Tabs.List>
                    <Tabs.Content value="keyMapping" flex={1} >
                        <KeysSettingContent 
                            gamepadConfig={gamepadConfig} 
                            setProfileDetailsHandler={setProfileDetailsHandler} 
                            switchDefaultProfileHandler={switchDefaultProfileHandler} 
                            resetKeyProfileHandler={resetKeyProfileHandler} 
                            createProfileHandler={createProfileHandler} 
                            deleteProfileHandler={deleteProfileHandler} 
                            resetGamepadConfigHandler={resetGamepadConfigHandler}
                        />
                    </Tabs.Content>
                    <Tabs.Content value="LEDsEffect" flex={1} >
                        Manage your projects
                    </Tabs.Content>
                    <Tabs.Content value="rapidTrigger" flex={1} >
                        Manage your tasks for freelancers
                    </Tabs.Content>
                    <Tabs.Content value="calibration" flex={1} >
                        Manage your tasks for freelancers
                    </Tabs.Content>
                    <Tabs.Content value="firmware" flex={1} >
                        Manage your tasks for freelancers
                        </Tabs.Content>
                    </Flex>
                </Tabs.Root>
            </Container>
            <Toaster />
        </Flex>
    );
}
