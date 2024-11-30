'use client'

import { LuCheckCheck, LuLightbulb, LuLayoutGrid, LuUnfoldVertical, LuFolderCog } from "react-icons/lu"
import { Tabs, Container, Grid, Flex, Center, VStack } from "@chakra-ui/react"
import { Toaster } from "@/components/ui/toaster";
import { KeysSettingContent } from "@/components/keys-setting-content";
import { GameProfile, GameProfileList, GamepadConfig } from "@/types/gamepad-config";
import { useEffect, useState } from "react";
import { setProfileDetails, switchDefaultProfile, resetKeyProfile, createProfile, deleteProfile, getGamepadConfig } from "@/controller/services";
import { ProfileSelect } from "@/components/profile-select";
import { LEDsSettingContent } from "@/components/leds-setting-content";

export default function Home() {

    const [gamepadConfig, setGamepadConfig] = useState<GamepadConfig>({});

    const [profileList, setProfileList] = useState<GameProfileList>({
        defaultId: "",
        maxNumProfiles: 0,
        items: [],
    });

    useEffect(() => {
        setProfileList({
            defaultId: gamepadConfig.defaultProfileId ?? "",
            maxNumProfiles: gamepadConfig.numProfilesMax ?? 0,
            items: gamepadConfig.profiles?.map(p => ({
                id: p.id ?? "",
                name: p.name ?? "",
            })) ?? [],
        });
    }, [gamepadConfig]);

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

    const resetProfileDetailsHandler = (): Promise<void> => {
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
                    <Tabs.List width={"100%"} justifyContent={"center"} colorPalette={"green"} >
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

                    <Center pt={4} >
                        <ProfileSelect
                            profileList={profileList}
                            switchDefaultProfile={switchDefaultProfileHandler}
                            createProfile={createProfileHandler}
                            deleteProfile={deleteProfileHandler}
                            setProfileDetails={setProfileDetailsHandler}
                        />
                    </Center>
                    
                    <Tabs.Content value="keyMapping" flex={1} padding={0} >
                        <KeysSettingContent 
                            gamepadConfig={gamepadConfig} 
                            setProfileDetailsHandler={setProfileDetailsHandler} 
                            resetGamepadConfigHandler={resetProfileDetailsHandler}
                        />
                    </Tabs.Content>
                    <Tabs.Content value="LEDsEffect" flex={1} padding={0}  >
                        <LEDsSettingContent
                            gamepadConfig={gamepadConfig}
                            setProfileDetailsHandler={setProfileDetailsHandler}
                            resetProfileDetailsHandler={resetProfileDetailsHandler}
                        />
                    </Tabs.Content>
                    <Tabs.Content value="rapidTrigger" flex={1} padding={0}  >
                        Manage your tasks for freelancers
                    </Tabs.Content>
                    <Tabs.Content value="calibration" flex={1} padding={0}  >
                        Manage your tasks for freelancers
                    </Tabs.Content>
                    <Tabs.Content value="firmware" flex={1} padding={0}  >
                        Manage your tasks for freelancers
                        </Tabs.Content>
                    </Flex>
                </Tabs.Root>
            </Container>
            <Toaster />
        </Flex>
    );
}
