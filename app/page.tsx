'use client'

import { LuCheckCheck , LuLightbulb , LuLayoutGrid, LuUnfoldVertical, LuFolderCog    } from "react-icons/lu"
import { Tabs, Container, Grid, createListCollection, Flex  } from "@chakra-ui/react"
import { useEffect, useState } from "react";
import { GamePlatform, Profile } from "@/components/profile-select";
import { KeymappingContent } from "@/components/keymapping-content";

export default function Home() {
  
  const [profiles, setProfiles] = useState(createListCollection<Profile>({ items: [] }));
  const [gamePlatforms, setGamePlatforms] = useState(createListCollection<GamePlatform>({ items: [] }));

  useEffect(() => {
    setProfiles(createListCollection({
      items: [
        {label: "Profile 1", value: "Profile1"},
        {label: "Profile 2", value: "Profile2"},
        {label: "Profile 3", value: "Profile3"},
        {label: "Profile 4", value: "Profile4"},
        {label: "Profile 5", value: "Profile5"},
        {label: "Profile 6", value: "Profile6"},
        {label: "Profile 7", value: "Profile7"},
      ]
    }));
  }, []);

  useEffect(() => {
    setGamePlatforms(createListCollection({
      items: [
        {label: "XInput", value: "XInput"},
        {label: "PS4", value: "PS4"},
        {label: "PS5", value: "PS5"},
        {label: "Switch", value: "Switch"},
      ]
    }));
  }, []);

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
                Key Mapping
              </Tabs.Trigger>
              <Tabs.Trigger value="LEDsEffect">
                <LuLightbulb  />
                LEDs Effect
              </Tabs.Trigger>
              <Tabs.Trigger value="rapidTrigger">
                <LuUnfoldVertical  />
                Rapid Trigger
              </Tabs.Trigger>
              <Tabs.Trigger value="calibration">
                <LuCheckCheck  />
                Calibration
              </Tabs.Trigger>
              <Tabs.Trigger value="firmware">
                <LuFolderCog  />
                Firmware
              </Tabs.Trigger>
              <Tabs.Indicator rounded="18" />
            </Tabs.List>
            <Tabs.Content value="keyMapping" flex={1} >
              <KeymappingContent profiles={profiles} gamePlatforms={gamePlatforms} />
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
    </Flex>
  );
}
