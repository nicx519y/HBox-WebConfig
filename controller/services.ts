import { GamepadConfig, GameProfile } from "@/types/gamepad-config";

const requestServer = async (url: string, method: string, body: any): Promise<any> => {
    console.log("requestServer: ", url, method, body);

    if(url === "" || url === null) { // test
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(null);
            }, 2000);
        });
    } else {
        const response = await fetch(url, {
            method: method,
            body: JSON.stringify(body),
        });
        return response.json();
    } 
}

export const getGamepadConfig = async (): Promise<GamepadConfig> => {
    console.log("getGamepadConfig");

    const url = "";
    const method = "GET";
    return await requestServer(url, method, null);
}

export const resetKeyProfile = async (profileId: string): Promise<void> => {
    console.log("resetKeyProfile: ", profileId);

    const url = "";
    const method = "POST";
    const body = {
        profileId: profileId,
    };
    return await requestServer(url, method, body);
}

export const createProfile = async (profileName: string): Promise<string> => {
    console.log("createProfile: ", profileName);

    const url = "";
    const method = "POST";
    const body = {
        profileName: profileName,
    };
    return await requestServer(url, method, body);
}

export const deleteProfile = async (profileId: string): Promise<void> => {
    console.log("deleteProfile: ", profileId);

    const url = "";
    const method = "POST";
    const body = {
        profileId: profileId,
    };
    return await requestServer(url, method, body);
}

export const setProfileDetails = async (profileId: string, keyMappings: GameProfile): Promise<void> => {
    console.log("setProfileDetails: ", profileId, keyMappings);

    const url = "";
    const method = "POST";
    const body = {
        profileId: profileId,
        keyMappings: keyMappings,
    };
    return await requestServer(url, method, body);
}

export const switchDefaultProfile = async (profileId: string): Promise<void> => {
    console.log("switchDefaultProfile: ", profileId);

    const url = "";
    const method = "POST";
    const body = {
        profileId: profileId,
    };
    return await requestServer(url, method, body);
}