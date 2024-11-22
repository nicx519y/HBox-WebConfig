import { ProfileSelect, GamePlatform, Profile } from "@/components/profile-select";
import { ListCollection, Flex, Center } from "@chakra-ui/react";

export function KeymappingContent(
   props: {profiles: ListCollection<Profile>, gamePlatforms: ListCollection<GamePlatform>}
) {
    const {profiles, gamePlatforms} = props;
    return (
        <Flex direction="column" height={"100%"} >
            <Center>
                <ProfileSelect profiles={profiles} gamePlatforms={gamePlatforms} />
            </Center>
        </Flex>
    )
}
