"use client"

import { GameProfileList, GameProfile } from "@/types/gamepad-config";
import { useMemo, useState } from "react";
import {
    IconButton,
    Stack,
    createListCollection,
    useDisclosure,
    Input,
    Button,
} from "@chakra-ui/react"

import {
    DialogBody,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogRoot,
    DialogTitle,
} from "@/components/ui/dialog"

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

import { Alert } from "@/components/ui/alert"
import { Field } from "@/components/ui/field"
import { LuTrash, LuPlus, LuPencil, LuMenu } from "react-icons/lu"
import { openConfirm } from '@/components/dialog-confirm';

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

    const { open: isRenameOpen, onOpen: onRenameOpen, onClose: onRenameClose } = useDisclosure();
    const { open: isAddOpen, onOpen: onCreateOpen, onClose: onCreateClose } = useDisclosure();
    const [newNameInvalid, setNewNameInvalid] = useState(false);
    const [newNameErrorMessage, setNewNameErrorMessage] = useState("");
    const [newProfileInvalid, setNewProfileInvalid] = useState(false);
    const [newProfileErrorMessage, setNewProfileErrorMessage] = useState("");


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
    const renameProfileClick = () => {
        setNewNameInvalid(false);
        setNewNameErrorMessage("");
        onRenameOpen();
    }

    /**
     * Open or close the rename dialog.
     * @param e - The open state of the dialog.
     */
    const onRenameOpenChange = (e: boolean) => {
        if (e) {
            onRenameOpen();
        } else {
            onRenameClose();
        }
    }

    /**
     * Cancel the rename of the default profile.
     */
    const onRenameCancel = () => {
        onRenameClose();
    }

    /**
     * Open the add dialog.
     */
    const createProfileClick = () => {
        setNewProfileInvalid(false);
        setNewProfileErrorMessage("");
        onCreateOpen();
    }

    /**
     * Open or close the add dialog.
     * @param e - The open state of the dialog.
     */
    const onCreateOpenChange = (e: boolean) => {
        if (e) {
            onCreateOpen();
        } else {
            onCreateClose();
        }
    }

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
     * Confirm the rename of the default profile.
     * @param e - The form event.
     */
    const onRenameConfirm = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const newName = (e.currentTarget.elements.namedItem("profileName") as HTMLInputElement)?.value.trim() ?? "";

        if (!validateProfileName(newName, setNewNameInvalid, setNewNameErrorMessage)) {
            return;
        }

        if (defaultProfile) {
            await setProfileDetails(defaultProfile?.id ?? "", { ...defaultProfile, name: newName });
            onRenameClose();
        }
    }
    /**
     * Confirm the creation of a new profile.
     * @param e - The form event.
     */
    const onCreateConfirm = async (e: React.FormEvent<HTMLFormElement>) => {

        e.preventDefault();

        const newName = (e.currentTarget.elements.namedItem("profileName") as HTMLInputElement)?.value.trim() ?? "";

        if (!validateProfileName(newName, setNewProfileInvalid, setNewProfileErrorMessage)) {
            return;
        }

        await createProfile(newName);
        onCreateClose();
    }
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

            {/* 重命名对话框 */}
            <DialogRoot
                placement="center"
                open={isRenameOpen}
                onOpenChange={e => onRenameOpenChange(e.open)}
                modal={true}
                closeOnInteractOutside={true}
            >
                <DialogContent zIndex={1001}  >
                    <form onSubmit={onRenameConfirm} >

                        <DialogHeader>
                            <DialogTitle fontSize={"md"} >Rename Profile</DialogTitle>
                        </DialogHeader>
                        <DialogBody paddingBottom={2}>
                            <Field errorText={newNameErrorMessage ?? ""} invalid={newNameInvalid} height={"62px"}  >
                                <Input
                                    name="profileName"
                                    type="text"
                                    placeholder={"Enter new profile name"}
                                    defaultValue={defaultProfile?.name ?? ""}
                                    autoComplete="off"
                                />
                            </Field>
                        </DialogBody>
                        <DialogFooter justifyContent={"start"} >
                            <Button variant="surface" width={"100px"} size={"xs"} onClick={onRenameCancel} >Cancel</Button>
                            <Button type="submit" name="submit" colorPalette={"green"} width={"100px"} size={"xs"} >Confirm</Button>
                        </DialogFooter>

                    </form>
                </DialogContent>
            </DialogRoot>
            
            {/* 新建profile对话框 */}
            <DialogRoot
                placement="center"
                open={isAddOpen}
                onOpenChange={e => onCreateOpenChange(e.open)}
                modal={true}
                closeOnInteractOutside={true}
            >
                <DialogContent >
                    <form onSubmit={onCreateConfirm} >
                        <DialogHeader>
                            <DialogTitle fontSize={"md"} >Create New Profile</DialogTitle>
                        </DialogHeader>
                        <DialogBody paddingBottom={2}>
                            <Field errorText={newProfileErrorMessage ?? ""} invalid={newProfileInvalid} height={"62px"}  >
                                <Input
                                    name="profileName"
                                    type="text"
                                    placeholder={"Enter new profile name"}
                                    autoComplete="off"
                                />
                            </Field>
                        </DialogBody>
                        <DialogFooter justifyContent={"start"} >
                            <Button variant="surface" width={"100px"} size={"xs"} onClick={onCreateClose} >Cancel</Button>
                            <Button type="submit" name="submit" colorPalette={"green"} width={"100px"} size={"xs"} >Confirm</Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </DialogRoot>
        </>
    )
}