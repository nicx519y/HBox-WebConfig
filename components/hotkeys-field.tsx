'use client';
    
import { HotkeyAction, HotkeyActionLabelMap, HotkeyActionList } from "@/types/gamepad-config";
import { 
    createListCollection, 
    HStack, 
    SelectItem, 
    SelectTrigger, 
    SelectContent, 
    SelectRoot, 
    SelectValueText, 
    Text, 
} from "@chakra-ui/react";
import { Tag } from "@/components/ui/tag"
import { useMemo } from "react";

export default function HotkeysField(
    props: {
        value: { key: number, action: HotkeyAction },
        changeValue: (value: { key: number, action: HotkeyAction }) => void,
        isActive: boolean,
    }
) {
    const { value, changeValue, isActive } = props;

    const hotkeyCollection = useMemo(() => {
        return createListCollection({
            items: HotkeyActionList.map(action => ({
                value: action,
                label: HotkeyActionLabelMap.get(action)?.label ?? action
            }))
        });
    }, []);

    return (
        <HStack>
            <HStack width="130px">
                <Tag colorPalette={isActive ? "green" : "gray"} >{`Fn`}</Tag>
                <Text>{` + `}</Text>
                <Tag closable={isActive} colorPalette={isActive ? "green" : "gray"} >{`KEY-${value.key + 1}`}</Tag>
            </HStack>
            <SelectRoot
                size="sm"
                collection={hotkeyCollection}
                value={[value.action.toString()]}
                onValueChange={e => changeValue({ key: value.key, action: e.value[0] as HotkeyAction })}
                position="relative"
                width="200px"
            >

                <SelectTrigger >
                    < SelectValueText placeholder="Select action" />
                </SelectTrigger>
                <SelectContent
                    zIndex={1000}
                    position="absolute"
                    left={0}
                    top="108%"
                    width="100%"
                    style={{
                        transform: 'translateY(0)',
                        maxHeight: '300px',
                        overflowY: 'auto'
                    }}
                >
                    {hotkeyCollection.items.map((item) => (
                        <SelectItem key={item.value} item={item}>
                            {item.label}
                        </SelectItem>
                    ))}
                </SelectContent>
            </SelectRoot>
        </HStack>
    )
}

