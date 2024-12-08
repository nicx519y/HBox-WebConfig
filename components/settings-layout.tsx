'use client';

import { useRouter, usePathname } from 'next/navigation';
import { Flex, Center, Tabs, HStack } from '@chakra-ui/react';
import { ProfileSelect } from '@/components/profile-select';
import {
    LuKeyboard,
    LuRocket,
    LuLightbulb,
    LuKeyRound,
    LuCpu
} from 'react-icons/lu';
import { navigationEvents } from '@/lib/event-manager';
import { useLanguage } from "@/contexts/language-context";

export default function SettingsLayout({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const pathname = usePathname();
    const { t } = useLanguage();

    const tabs = [
        { label: t.SETTINGS_TAB_KEYS, path: '/keys-setting', icon: LuKeyboard },
        { label: t.SETTINGS_TAB_LEDS, path: '/leds-setting', icon: LuLightbulb },
        { label: t.SETTINGS_TAB_RAPID_TRIGGER, path: '/rapid-trigger', icon: LuRocket },
        { label: t.SETTINGS_TAB_HOTKEYS, path: '/hotkeys-setting', icon: LuKeyRound },
        { label: t.SETTINGS_TAB_FIRMWARE, path: '/firmware', icon: LuCpu }
    ];


    const showProfileSelect = !['/hotkeys-setting', '/firmware'].includes(pathname);

    const handleTabChange = async (path: string) => {
        const canNavigate = await navigationEvents.emit(path);
        if (canNavigate) {
            router.push(path);
        }
    };

    return (
        <Flex direction="column" height="100%" flex={1}>
            <Tabs.Root
                defaultValue={pathname}
                value={pathname}
                size="md"
                variant="subtle"
                colorPalette="green"
                backgroundColor="rgba(0, 0, 0, 0.3)"
                borderBottom="1px solid rgba(0, 255, 0, 0.1)"
                boxShadow="0 1px 10px rgba(0, 0, 0, 0.7)"
            >
                <Tabs.List justifyContent="center" width="100%"  >
                    {tabs.map((tab, index) => (
                        <Tabs.Trigger
                            key={index}
                            value={tab.path}
                            onClick={() => handleTabChange(tab.path)}
                            width="180px"
                            justifyContent="center"
                        >
                            <HStack>
                                <tab.icon size={18} />
                                <span>{tab.label}</span>
                            </HStack>
                        </Tabs.Trigger>
                    ))}
                    <Tabs.Indicator rounded="l2" />
                </Tabs.List>
            </Tabs.Root>
            
            <Flex direction="column" flex={1} height="100%">
                <Center pt={4} height="50px"  >
                    {showProfileSelect && (
                        <ProfileSelect />
                    )}
                </Center>
                <Center pt={4} flex={1}>
                    {children}
                </Center>
            </Flex>
        </Flex>
    );
} 