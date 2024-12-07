'use client';

import { usePathname, useRouter } from 'next/navigation';
import { Flex, Center, Tabs, HStack } from '@chakra-ui/react';
import { ProfileSelect } from '@/components/profile-select';
import { useGamepadConfig } from '@/contexts/gamepad-config-context';
import { 
  LuKeyboard, 
  LuRocket, 
  LuLightbulb, 
  LuKeyRound,
  LuCpu
} from 'react-icons/lu';

export default function SettingsLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();

  const tabs = [
    { label: 'Keys Setting', path: '/keys-setting', icon: LuKeyboard },
    { label: 'LEDs Setting', path: '/leds-setting', icon: LuLightbulb },
    { label: 'Rapid Trigger', path: '/rapid-trigger', icon: LuRocket },
    { label: 'Hotkeys Setting', path: '/hotkeys-setting', icon: LuKeyRound },
    { label: 'Firmware', path: '/firmware', icon: LuCpu }
  ];

  const { deleteProfile, createProfile, switchProfile, setProfileDetails, profileList } = useGamepadConfig();

  const showProfileSelect = !['/hotkeys-setting', '/firmware'].includes(pathname);

  return (
    <Flex direction="column" height="100%" flex={1}>
      <Tabs.Root
        defaultValue={pathname}
        // lazyMount={true}
        // unmountOnExit={true}
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
              onClick={() => router.push(tab.path)}
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
            <ProfileSelect
              profileList={profileList}
              switchDefaultProfile={switchProfile}
              createProfile={createProfile}
              deleteProfile={deleteProfile}
              setProfileDetails={setProfileDetails}
            />
          )}
        </Center>
        <Center pt={4} flex={1}>
          {children}
        </Center>
      </Flex>
    </Flex>
  );
} 