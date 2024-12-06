'use client';
    
import { Hotkey, HotkeyAction, HotkeyActionLabelMap, HotkeyActionList } from "@/types/gamepad-config";
import { 
    createListCollection, 
    Flex, 
    HStack, 
    Text, 
} from "@chakra-ui/react";

import {
    SelectContent,
    SelectItem,
    SelectRoot,
    SelectTrigger,
    SelectValueText,
  } from "@/components/ui/select"

import { Tag } from "@/components/ui/tag"
import { useMemo } from "react";



export default function HotkeysField(
    props: {
        index: number,
        value: Hotkey,
        onValueChange: (value: Hotkey) => void,
        isActive: boolean,
        disabled?: boolean,
        onFieldClick?: (index: number) => void,
    }
) {
    const { index, value, onValueChange, isActive, disabled, onFieldClick } = props;
    /**
     * 创建热键选择列表
     */
    const hotkeyCollection = useMemo(() => {
        return createListCollection({
            items: HotkeyActionList.map(action => ({
                value: action,
                label: HotkeyActionLabelMap.get(action)?.label ?? action
            }))
        });
    }, []);

    /**
     * 点击关闭键 将键值设置为-1 表示没有绑定按键
     */
    const tagCloseClick = () => {
        onValueChange({ ...value, key: -1 });
    }

    return (
        <Flex padding={"2px"} width={"450px"} >
            <HStack 
                width="130px" 
                pl="2" 
                pr="2" 
                flex={1}  
                border="1px solid" 
                borderColor={isActive ? "green.400" : "gray.800"} 
                borderRadius="sm" 
                mr="1" 
                cursor={disabled ? "not-allowed" : "pointer"}
                onClick={() => (!disabled) && onFieldClick?.(index)}
                opacity={disabled ? 0.7 : 1}
            >
                <Tag colorPalette={isActive ? "green" : "gray"} >{`Fn`}</Tag>
                <Text>{` + `}</Text>
                {value.key !== undefined && value.key >= 0 &&
                    <Tag 
                        closable={isActive} 
                        colorPalette={isActive ? "green" : "gray"} 
                        onClick={ () => (!disabled) && isActive && tagCloseClick() }
                    >{`KEY-${value.key + 1}`}</Tag>
                }
            </HStack>
            <SelectRoot
                variant="subtle"
                size="sm"
                collection={hotkeyCollection}
                value={[value.action ?? HotkeyAction.None]}
                onValueChange={e => onValueChange({ ...value, action: e.value[0] as HotkeyAction })}
                width="240px"
                disabled={disabled}
            >

                <SelectTrigger >
                    < SelectValueText placeholder="Select action" />
                </SelectTrigger>
                <SelectContent fontSize="xs"  >
                    {hotkeyCollection.items.map((item) => (
                        <SelectItem key={item.value} item={item}  >
                            {item.label}
                        </SelectItem>
                    ))}
                </SelectContent>
            </SelectRoot>
        </Flex>
    )
}

