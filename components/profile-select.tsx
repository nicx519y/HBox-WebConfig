"use client"

import { GameProfileList, GameProfile, PROFILE_NAME_MAX_LENGTH, UI_TEXT } from "@/types/gamepad-config";
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
import { useGamepadConfig } from "@/contexts/gamepad-config-context";
import { useLanguage } from '@/contexts/language-context';

export function ProfileSelect() {

    const { profileList, switchProfile, createProfile, deleteProfile, updateProfileDetails } = useGamepadConfig();
    const { t } = useLanguage();

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
    const validateProfileName = (name: string): [boolean, string] => {

        if (/[!@#$%^&*()_+\[\]{}|;:'",.<>?/\\]/.test(name)) {
            return [false, UI_TEXT.VALIDATION_PROFILE_NAME_SPECIAL_CHARACTERS];
        }

        if (name.length > PROFILE_NAME_MAX_LENGTH || name.length < 1) {
            return [false, UI_TEXT.VALIDATION_PROFILE_NAME_MAX_LENGTH];
        }

        if (name === defaultProfile?.name) {
            return [false, UI_TEXT.VALIDATION_PROFILE_NAME_CANNOT_BE_SAME_AS_CURRENT_PROFILE_NAME];
        }

        if (profileList.items.find(p => p.name === name)) {
            return [false, UI_TEXT.VALIDATION_PROFILE_NAME_ALREADY_EXISTS];
        }

        return [true, ""];
    }

    /**
     * Change the default profile.
     * @param value - The id of the profile to set as default.
     */
    const onDefaultProfileChange = async (value: string) => {
        if(value === defaultProfile?.id) {
            return;
        }
        return await switchProfile(value);
    }

    /**
     * Open the rename dialog.
     */
    const renameProfileClick = async () => {
        const result = await openForm({
            title: UI_TEXT.DIALOG_RENAME_PROFILE_TITLE,
            fields: [{
                name: "profileName",
                label: UI_TEXT.PROFILE_NAME_LABEL,
                defaultValue: defaultProfile?.name,
                placeholder: UI_TEXT.PROFILE_NAME_PLACEHOLDER,
                validate: (value) => {
                    const [isValid, errorMessage] = validateProfileName(value);
                    if (!isValid) {
                        return errorMessage;
                    }
                    return undefined;
                }
            }]
        });

        if (result) {
            await updateProfileDetails(defaultProfile?.id ?? "", { 
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
            title: UI_TEXT.PROFILE_CREATE_DIALOG_TITLE,
            fields: [{
                name: "profileName",
                label: UI_TEXT.PROFILE_NAME_LABEL,
                placeholder: UI_TEXT.PROFILE_NAME_PLACEHOLDER,
                validate: (value) => {
                    const [isValid, errorMessage] = validateProfileName(value);
                    if (!isValid) {
                        return errorMessage;
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
            title: UI_TEXT.PROFILE_DELETE_DIALOG_TITLE, 
            message: UI_TEXT.PROFILE_DELETE_CONFIRM_MESSAGE
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
            <Stack direction="row" gap={2} alignItems="center">
                <SelectRoot
                    size="sm"
                    width="200px"
                    collection={profilesCollection}
                    value={[defaultProfile?.id ?? ""]}
                    onValueChange={e => onDefaultProfileChange(e.value[0])}
                >
                    <SelectTrigger >
                        <SelectValueText color="gray.300" />
                    </SelectTrigger>
                    <SelectContent fontSize="xs" >
                        {profilesCollection.items.map((item) => (
                            <SelectItem key={item.value} item={item} color="gray.300" >
                                {item.label}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </SelectRoot>
                <MenuRoot>
                    <MenuTrigger asChild>
                        <IconButton
                            aria-label={t.PROFILE_SELECT_MENU_BUTTON}
                            variant="ghost"
                            size="sm"
                        >
                            <LuMenu />
                        </IconButton>
                    </MenuTrigger>
                    <MenuContent>
                        <MenuItem
                            value="create"
                            onClick={createProfileClick}
                        >
                            <LuPlus />
                            {t.PROFILE_SELECT_CREATE_BUTTON}
                        </MenuItem>
                        <MenuItem
                            value="rename"
                            onClick={renameProfileClick}
                        >
                            <LuPencil />
                            {t.PROFILE_SELECT_RENAME_BUTTON}
                        </MenuItem>
                        <MenuItem
                            value="delete"
                            onClick={deleteProfileClick}
                        >
                            <LuTrash />
                            {t.PROFILE_SELECT_DELETE_BUTTON}
                        </MenuItem>
                    </MenuContent>
                </MenuRoot>
            </Stack>
        </>
    )
}