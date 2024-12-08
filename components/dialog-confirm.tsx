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
    const { isOpen, title, message, resolve } = useConfirmStore();
    const { t } = useLanguage();

    const handleClose = () => {
        useConfirmStore.setState({ isOpen: false });
    };

    const handleCancel = () => {
        resolve(false);
        handleClose();
    };

    const handleConfirm = () => {
        resolve(true);
        handleClose();
    };

    return (
        <DialogRoot open={isOpen} onOpenChange={handleClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                </DialogHeader>
                <DialogBody>
                    <Alert>{message}</Alert>
                </DialogBody>
                <DialogFooter>
                    <Button 
                        colorPalette="gray" 
                        variant="surface" 
                        onClick={handleCancel}
                    >
                        {t.BUTTON_CANCEL}
                    </Button>
                    <Button 
                        colorPalette="green" 
                        onClick={handleConfirm}
                    >
                        {t.BUTTON_CONFIRM}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </DialogRoot>
    );
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
