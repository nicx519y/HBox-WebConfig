"use client"

import { PlatformList, GameProfileList, GameProfile } from "@/types/gamepad-config";
import { useMemo, useState } from "react";
import { 
    IconButton,
    Stack,  
    createListCollection,
    useDisclosure,
    Portal,
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

export function ProfileSelect(
    props: {
      profileList: GameProfileList, 
      switchDefaultProfile: (profileId: string) => Promise<void>, 
      createProfile: (profileName: string) => Promise<void>,
      deleteProfile: (profileId: string) => Promise<void>,
      setProfileDetails: (profileId: string, profileDetails: GameProfile) => Promise<void>,
    }
) {
    const { 
      profileList, 
      switchDefaultProfile, 
      createProfile, 
      deleteProfile, 
      setProfileDetails 
    } = props;

    const { profilesCollection, defaultProfile } = useMemo(() => {
        return {
            profilesCollection: createListCollection({ items: profileList.items.map(p => ({ id: p.id, value: p.id, label: p.name }))}),
            platformListCollection: createListCollection({items: PlatformList.map(p => ({ value: p, label: p.toString() }))}),
            defaultProfile: profileList.items.find(p => p.id === profileList.defaultId),
        }
    }, [profileList]);

    const { open: isRenameOpen, onOpen: onRenameOpen, onClose: onRenameClose } = useDisclosure();
    const { open: isAddOpen, onOpen: onAddOpen, onClose: onAddClose } = useDisclosure();

    const [ newNameInvalid, setNewNameInvalid ] = useState(false);
    const [ newNameErrorMessage, setNewNameErrorMessage ] = useState("");
    const [ newProfileInvalid, setNewProfileInvalid ] = useState(false);
    const [ newProfileErrorMessage, setNewProfileErrorMessage ] = useState("");
    const [ alertOpen, setAlertOpen ] = useState(false);
    const [ alertMessage, setAlertMessage ] = useState("");
    const [ alertConfirm, setAlertConfirm ] = useState(() => () => {});

    
    /**
     * Validate the profile name.
     * @param name - The name to validate.
     * @param setInvalid - The function to set the invalid state.
     * @param setErrorMessage - The function to set the error message.
     * @returns - Whether the profile name is valid.
     */
    const validateProfileName = (name: string, setInvalid: (invalid: boolean) => void, setErrorMessage: (errorMessage: string) => void): boolean => {

      if(/[!@#$%^&*()_+\[\]{}|;:'",.<>?/\\]/.test(name)) {
        setInvalid(true);
        setErrorMessage("Profile name cannot contain special characters.");
        return false;
      }

      if(name.length > 20 || name.length < 1) {
        setInvalid(true);
        setErrorMessage("Profile name length must be between 1 and 20 characters, current length is " + name.length + ".");
        return false;
      }

      if(name === defaultProfile?.name) {
        setInvalid(true);
        setErrorMessage("Profile name cannot be the same as the current profile name.");
        return false;
      } 

      if(profileList.items.find(p => p.name === name)) {
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
    const onDefaultProfileChange = (value: string) => {
        switchDefaultProfile(value);
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
        e ? onRenameOpen() : onRenameClose();
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
    const addProfileClick = () => {
        setNewProfileInvalid(false);
        setNewProfileErrorMessage(""); 
        onAddOpen();
    }

    /**
     * Open or close the add dialog.
     * @param e - The open state of the dialog.
     */
    const onAddOpenChange = (e: boolean) => {
        e ? onAddOpen() : onAddClose();
    }

    /**
     * Open the delete dialog.
     */
    const deleteProfileClick = () => {
      setAlertConfirm(() => () => {
        onDeleteConfirm().then(() => setAlertOpen(false));
      });
      setAlertMessage("Deleting this profile can not be undone or reverted. Are you sure you want to delete this profile?");
      setAlertOpen(true);
    }

    /**************************************************************** set api confirmation ******************************************************************************** */
    /**
     * Confirm the rename of the default profile.
     * @param e - The form event.
     */
    const onRenameConfirm = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const newName = (e.currentTarget.elements.namedItem("profileName") as HTMLInputElement)?.value.trim() ?? "";

        if (!validateProfileName(newName, setNewNameInvalid, setNewNameErrorMessage)) {
          return;
        }
        
        if (defaultProfile) {
            defaultProfile.name = newName;
            setProfileDetails(defaultProfile?.id ?? "", defaultProfile).then(() => {
              onRenameClose();
            });
        }
    }
    /**
     * Confirm the creation of a new profile.
     * @param e - The form event.
     */
    const onAddConfirm = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      const newName = (e.currentTarget.elements.namedItem("profileName") as HTMLInputElement)?.value.trim() ?? "";

      if (!validateProfileName(newName, setNewProfileInvalid, setNewProfileErrorMessage)) {
        return;
      }

      createProfile(newName).then(() => {
        onAddClose();
      });
    }
    /**
     * Confirm the deletion of the default profile.
     */
    const onDeleteConfirm = (): Promise<void> => {
        return deleteProfile(defaultProfile?.id ?? "");
    }

    return (
      <>
          <Stack direction="row" gap={2} >
            <SelectRoot 
              size="sm" 
              width="180px" 
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
                    { item.label }
                  </SelectItem>
                ))}
            </SelectContent>
            </SelectRoot>   

            <MenuRoot size={"md"} >
                <MenuTrigger asChild  >
                    <IconButton aria-label="Settings" variant="ghost" color="gray.500" size="sm">
                      <LuMenu />
                    </IconButton>
                </MenuTrigger>
                <MenuContent   >
                    <MenuItem onClick={renameProfileClick} value="rename">
                        <LuPencil />
                        Rename Profile
                    </MenuItem>
                    <MenuItem onClick={addProfileClick} value="add">
                        <LuPlus />
                        Add Profile
                    </MenuItem>
                    <MenuItem onClick={deleteProfileClick} value="delete">
                        <LuTrash />
                        Delete Profile
                    </MenuItem>
                </MenuContent>
            </MenuRoot>
          </Stack>
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

            <DialogRoot 
              placement="center"
              open={isAddOpen} 
              onOpenChange={e => onAddOpenChange(e.open)} 
              modal={true} 
              closeOnInteractOutside={true}
            >
              <form onSubmit={onAddConfirm} >
                <DialogContent >
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
                    <Button variant="surface" width={"100px"} size={"xs"} onClick={onAddClose} >Cancel</Button>
                    <Button type="submit" name="submit" colorPalette={"green"} width={"100px"} size={"xs"} >Confirm</Button>
                  </DialogFooter>
                </DialogContent>
              </form>   
            </DialogRoot>

            <DialogRoot 
              placement="center"
              open={alertOpen} 
              onOpenChange={e => setAlertOpen(e.open)} 
              modal={true} 
              closeOnInteractOutside={true}
            >
              <DialogContent  >
                <DialogHeader>
                </DialogHeader>
                <DialogBody>
                  <Alert>{ alertMessage }</Alert>
                </DialogBody>
                <DialogFooter justifyContent={"start"} >
                  <Button variant="surface" width={"100px"} size={"xs"} onClick={() => setAlertOpen(false)} >Cancel</Button>
                  <Button name="submit" colorPalette={"red"} width={"100px"} size={"xs"} onClick={() => alertConfirm()} >Confirm</Button>
                </DialogFooter>
              </DialogContent>
            </DialogRoot>
        </>
  )
}