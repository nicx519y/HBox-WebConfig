"use client";

import { Field } from "@/components/ui/field"
import { Tag } from "@/components/ui/tag"
import { Box, HStack, Text } from "@chakra-ui/react"
import { useLanguage } from "@/contexts/language-context";

export default function KeymappingField(
    props: {
        value: number[],
        changeValue: (value: number[]) => void,
        label: string,
        isActive: boolean,
        onClick: () => void,
    }
) {
    const { t } = useLanguage();
    const { value, changeValue, label, isActive, onClick } = props;  

    const tagClick = (hitboxButton: number) => {
        if(isActive) {
            changeValue(value.filter(v => v !== hitboxButton));
        }
    }

    return (
        <>
            <Field onClick={onClick} >
                <Text fontSize={"xs"} color={isActive ? "green.500" : "gray.400"}>{`[ ${label} ]`}</Text>
                <Box width={"220px"} 
                    height={"28px"} 
                    padding={"4px"} 
                    border={"1px solid"} 
                    borderColor={isActive ? "green.500" : "gray.800"} 
                    borderRadius={"4px"} 
                    cursor={"pointer"} 
                >
                    <HStack gap={1}>
                        {value.map((hitboxButton, index) => (
                            <Tag 
                                key={index} 
                                closable={isActive}
                                colorPalette={isActive ? "green" : "gray"}
                                onClick={() => tagClick(hitboxButton)}
                            >{`${t.KEY_MAPPING_KEY_PREFIX}${hitboxButton + 1}`}</Tag>
                        ))}
                    </HStack>
                </Box>
            </Field>
        </>
    )
}
