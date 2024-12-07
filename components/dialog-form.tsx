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
import { Button } from "@/components/ui/button"
import { Field } from "@/components/ui/field"
import { Input } from "@chakra-ui/react"
import { useState } from 'react';

interface FormField {
    name: string;
    label: string;
    defaultValue?: string;
    placeholder?: string;
    type?: string;
    validate?: (value: string) => string | undefined;
}

interface FormState {
    isOpen: boolean;
    title?: string;
    fields: FormField[];
    resolve?: (value: { [key: string]: string } | null) => void;
}

const useFormStore = create<FormState>(() => ({
    isOpen: false,
    fields: [],
}));

export function DialogForm() {
    const { isOpen, title, fields, resolve } = useFormStore();
    const [errors, setErrors] = useState<{[key: string]: string}>({});

    const handleClose = () => {
        useFormStore.setState({ isOpen: false });
        resolve?.(null);
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const values: {[key: string]: string} = {};
        const newErrors: {[key: string]: string} = {};

        fields.forEach(field => {
            const value = formData.get(field.name)?.toString() || '';
            values[field.name] = value;

            if (field.validate) {
                const error = field.validate(value);
                if (error) {
                    newErrors[field.name] = error;
                }
            }
        });

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        useFormStore.setState({ isOpen: false });
        resolve?.(values);
    };

    return (
        <DialogRoot
            open={isOpen}
            onOpenChange={(details) => {
                if (!details.open) handleClose();
            }}
        >
            <DialogContent>
                <form onSubmit={handleSubmit}>
                    <DialogHeader>
                        <DialogTitle>{title}</DialogTitle>
                    </DialogHeader>
                    <DialogBody>
                        {fields.map((field) => (
                            <Field 
                                key={field.name}
                                label={field.label}
                                errorText={errors[field.name]}
                                invalid={!!errors[field.name]}
                            >
                                <Input
                                    name={field.name}
                                    type={field.type || "text"}
                                    defaultValue={field.defaultValue}
                                    placeholder={field.placeholder}
                                    autoComplete="off"
                                />
                            </Field>
                        ))}
                    </DialogBody>
                    <DialogFooter justifyContent="start">
                        <Button
                            variant="surface"
                            width="100px"
                            size="xs"
                            onClick={handleClose}
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            colorPalette="green"
                            width="100px"
                            size="xs"
                        >
                            Submit
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </DialogRoot>
    );
}

export function openForm(options: { 
    title?: string; 
    fields: FormField[];
}): Promise<{ [key: string]: string } | null> {
    return new Promise((resolve) => {
        useFormStore.setState({
            isOpen: true,
            title: options.title,
            fields: options.fields,
            resolve,
        });
    });
} 