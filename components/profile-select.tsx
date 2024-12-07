"use client"

import { GameProfileList, GameProfile } from "@/types/gamepad-config";
import { useMemo } from "react";
import {
    IconButton,
    Stack,
    createListCollection,
} from "@chakra-ui/react"

import {
    MenuContent,
    MenuItem,
    MenuRoot,
    MenuTrigger,
} from "@/components/ui/menu"

import {
    SelectContent,
    SelectItem,
    SelectRoot,
    SelectTrigger,
    SelectValueText,
} from "@/components/ui/select"

import { LuTrash, LuPlus, LuPencil, LuMenu } from "react-icons/lu"
import { openConfirm } from '@/components/dialog-confirm';
import { openForm } from '@/components/dialog-form';

export function ProfileSelect(
    props: {
        profileList: GameProfileList,
        switchDefaultProfile: (profileId: string) => void,
        createProfile: (profileName: string) => void,
        deleteProfile: (profileId: string) => void,
        setProfileDetails: (profileId: string, profileDetails: GameProfile) => void,
    }
) {
    const {
        profileList,
        switchDefaultProfile,
        createProfile,
        deleteProfile,
        setProfileDetails
    } = props;


    const defaultProfile = useMemo(() => {
        const profile = profileList.items.find(p => p.id === profileList.defaultId);
        return profile;
    }, [profileList]);
    
    const profilesCollection = useMemo(() => createListCollection({
        items: profileList.items.map(p => ({
            value: p.id,
            label: p.name,
        })),
    }), [profileList]);

    /**
     * Validate the profile name.
     * @param name - The name to validate.
     * @param setInvalid - The function to set the invalid state.
     * @param setErrorMessage - The function to set the error message.
     * @returns - Whether the profile name is valid.
     */
    const validateProfileName = (name: string, setInvalid: (invalid: boolean) => void, setErrorMessage: (errorMessage: string) => void): boolean => {

        if (/[!@#$%^&*()_+\[\]{}|;:'",.<>?/\\]/.test(name)) {
            setInvalid(true);
            setErrorMessage("Profile name cannot contain special characters.");
            return false;
        }

        if (name.length > 20 || name.length < 1) {
            setInvalid(true);
            setErrorMessage("Profile name length must be between 1 and 20 characters, current length is " + name.length + ".");
            return false;
        }

        if (name === defaultProfile?.name) {
            setInvalid(true);
            setErrorMessage("Profile name cannot be the same as the current profile name.");
            return false;
        }

        if (profileList.items.find(p => p.name === name)) {
            setInvalid(true);
            setErrorMessage("Profile name already exists.");
            return false;
        }

        return true;
    }

    /**
     * Change the default profile.
     * @param value - The id of the profile to set as default.
     */
    const onDefaultProfileChange = async (value: string) => {
        if(value === defaultProfile?.id) {
            return;
        }
        return await switchDefaultProfile(value);
    }

    /**
     * Open the rename dialog.
     */
    const renameProfileClick = async () => {
        const result = await openForm({
            title: "Rename Profile",
            fields: [{
                name: "profileName",
                label: "Profile Name",
                defaultValue: defaultProfile?.name,
                placeholder: "Enter new profile name",
                validate: (value) => {
                    if (!validateProfileName(value, () => {}, () => {})) {
                        return "Invalid profile name";
                    }
                    return undefined;
                }
            }]
        });

        if (result) {
            await setProfileDetails(defaultProfile?.id ?? "", { 
                id: defaultProfile?.id ?? "",
                name: result.profileName 
            });
        }
    };

    /**
     * Open the add dialog.
     */
    const createProfileClick = async () => {
        const result = await openForm({
            title: "Create New Profile",
            fields: [{
                name: "profileName",
                label: "Profile Name",
                placeholder: "Enter new profile name",
                validate: (value) => {
                    if (!validateProfileName(value, () => {}, () => {})) {
                        return "Invalid profile name";
                    }
                    return undefined;
                }
            }]
        });

        if (result) {
            await createProfile(result.profileName);
        }
    };

    /**
     * Open the delete dialog.
     */
    const deleteProfileClick = async () => {
        const confirmed = await openConfirm({
            title: "Delete Profile",
            message: "Deleting this profile can not be undone or reverted. Are you sure you want to delete this profile?"
        });
        
        if (confirmed) {
            await onDeleteConfirm();
        }
    };

    /**************************************************************** set api confirmation ******************************************************************************** */
    /**
     * Confirm the deletion of the default profile.
     */
    const onDeleteConfirm = async () => {
        return await deleteProfile(defaultProfile?.id ?? "");
    }

    return (
        <>
            <Stack direction="row" gap={2} >
                {/* 选择profile */}
                <SelectRoot
                    size="sm"
                    width="218px"
                    collection={profilesCollection}
                    value={[defaultProfile?.id ?? ""]}
                    onValueChange={e => onDefaultProfileChange(e.value[0])}
                >
                    <SelectTrigger>
                        <SelectValueText placeholder="Select profile" />
                    </SelectTrigger>
                    <SelectContent fontSize="xs" >
                        {profilesCollection.items.map((item) => (
                            <SelectItem item={item} key={item.value}>
                                {item.label}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </SelectRoot>
                {/* 功能菜单 */}
                <MenuRoot size={"md"} >
                    <MenuTrigger asChild  >
                        <IconButton aria-label="Settings" variant="ghost" color="gray.500" size="sm">
                            <LuMenu />
                        </IconButton>
                    </MenuTrigger>
                    <MenuContent   >
                        <MenuItem onClick={renameProfileClick} value="rename">
                            <LuPencil />
                            Rename Current Profile
                        </MenuItem>
                        <MenuItem onClick={createProfileClick} value="add">
                            <LuPlus />
                            Create New Profile
                        </MenuItem>
                        <MenuItem onClick={deleteProfileClick} value="delete">
                            <LuTrash />
                            Delete Current Profile
                        </MenuItem>
                    </MenuContent>
                </MenuRoot>
            </Stack>
        </>
    )
}