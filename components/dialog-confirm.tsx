'use client';

import { create } from 'zustand';
import {
    DialogRoot,
    DialogBody,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Alert } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/contexts/language-context";

interface ConfirmState {
    isOpen: boolean;
    title?: string;
    message: string;
    resolve?: (value: boolean) => void;
}

const useConfirmStore = create<ConfirmState>(() => ({
    isOpen: false,
    message: '',
}));

export function DialogConfirm() {
    const { t } = useLanguage();
    const { isOpen, title, message, resolve } = useConfirmStore();

    const handleClose = (confirmed: boolean) => {
        useConfirmStore.setState({ isOpen: false });
        resolve?.(confirmed);
    };

    return (
        <DialogRoot
            open={isOpen}
            onOpenChange={(details: { open: boolean }) => {
                if (!details.open) handleClose(false);
            }}
        >
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{title ?? ""}</DialogTitle>
                </DialogHeader>
                <DialogBody>
                    <Alert colorPalette="yellow">
                        {message}
                    </Alert>
                </DialogBody>
                <DialogFooter justifyContent={"start"} >
                    <Button
                        variant="surface"
                        width={"100px"}
                        size={"xs"}
                        onClick={() => handleClose(false)}
                    >
                        {t.BUTTON_CANCEL}
                    </Button>
                    <Button
                        name="submit"
                        colorPalette={"red"}
                        width={"100px"}
                        size={"xs"}
                        onClick={() => handleClose(true)}
                    >
                        {t.BUTTON_CONFIRM}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </DialogRoot>
    )
}

export function openConfirm(options: { title?: string; message: string }): Promise<boolean> {
    return new Promise((resolve) => {
        useConfirmStore.setState({
            isOpen: true,
            title: options.title,
            message: options.message,
            resolve,
        });
    });
}
