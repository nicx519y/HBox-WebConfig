"use client"

import { 
    Flex, 
    SelectRoot, 
    SelectTrigger, 
    SelectContent, 
    SelectItem, 
    SelectValueText, 
    ListCollection,
    MenuRoot,
    MenuTrigger,
    MenuContent,
    MenuItem,
    IconButton,
    Stack
} from "@chakra-ui/react"
import { LuMoreVertical, LuTrash, LuPlus, LuPencil } from "react-icons/lu"

export interface Profile {
  label: string;
  value: string;
}

export interface GamePlatform {
  label: string;
  value: string;
}

export function ProfileSelect(
    {profiles, gamePlatforms}: 
    {profiles: ListCollection<Profile>, gamePlatforms: ListCollection<GamePlatform>}
) {
  return (
        <Stack direction="row" gap={2} position="relative" >  

          <SelectRoot size="sm" width="180px" collection={profiles}  >
            <SelectTrigger>
              <SelectValueText placeholder="Select profile" />
            </SelectTrigger>
            <SelectContent>
                {profiles.items.map((item) => (
                  <SelectItem item={item} key={item.value}>
                    {item.label}
                  </SelectItem>
                ))}
            </SelectContent>
          </SelectRoot> 

          <SelectRoot size="sm" width="180px" collection={gamePlatforms} >
            <SelectTrigger>
              <SelectValueText placeholder="Select Platform" />
            </SelectTrigger>
            <SelectContent>
                {gamePlatforms.items.map((item) => (
                  <SelectItem item={item} key={item.value}>
                    {item.label}
                  </SelectItem>
                ))}
            </SelectContent>
          </SelectRoot> 

          <MenuRoot size={"md"} positioning={{ placement: "right-start" }}  >
            <MenuTrigger asChild  >
                <IconButton aria-label="Settings" variant="ghost" color="gray.500" size="sm">
                    <LuMoreVertical />
                </IconButton>
            </MenuTrigger>
            <MenuContent position="absolute" zIndex={1000} left={"101.5%"} top={0}  width={"160px"}   >
                <MenuItem value="rename">
                    <LuPencil />
                    Rename Profile
                </MenuItem>
                <MenuItem value="add">
                    <LuPlus />
                    Add Profile
                </MenuItem>
                <MenuItem value="delete">
                    <LuTrash />
                    Delete Profile
                </MenuItem>
            </MenuContent>
        </MenuRoot>
        </Stack>
  )
}