'use client';

import { Provider } from "@/components/ui/provider"
import StyledComponentsRegistry from '@/lib/registry'
import { SettingsLayout } from '@/components/settings-layout'
import { GamepadConfigProvider, useGamepadConfig } from '@/contexts/gamepad-config-context'
import { Box, Flex, Center, Text } from '@chakra-ui/react'
import { toaster, Toaster } from "@/components/ui/toaster"
import { LoadingModal } from "@/components/ui/loading-modal"
import { useState, useEffect } from 'react'
import { DialogConfirm } from '@/components/dialog-confirm'
import { DialogForm } from "@/components/dialog-form";
import { DialogCannotClose } from '@/components/dialog-cannot-close'
import { LanguageProvider } from '@/contexts/language-context';
import { LanguageSwitcher } from '@/components/language-switcher'

// 创建一个内部组件来使用 context
function AppContent({ children }: { children: React.ReactNode }) {
    const { isLoading } = useGamepadConfig();
    const [showLoading, setShowLoading] = useState(false);
    const { error } = useGamepadConfig();

    useEffect(() => {
        if (error) {
            toaster.error({
                title: "Error",
                description: error,
            });
        }
    }, [error]);

    useEffect(() => {
        let timer: NodeJS.Timeout;
        // 延迟300ms显示loading
        if (!isLoading) {
            timer = setTimeout(() => {
                setShowLoading(false);
            }, 300);
        } else {
            setShowLoading(true);
        }

        return () => {
            // 清理定时器
            if (timer) {
                clearTimeout(timer);
            }
        };
    }, [isLoading]);

    return (
        <Flex
            direction="column"
            height="100vh"
            width="100vw"
            background="linear-gradient(135deg, rgba(0, 0, 0, 0.95) 0%, rgba(0, 0, 0, 0.85) 100%),
        radial-gradient(circle at 0% 0%, rgba(0, 210, 255, 0.15) 0%, transparent 50%),
        radial-gradient(circle at 100% 0%, rgba(0, 255, 150, 0.1) 0%, transparent 50%),
        radial-gradient(circle at 100% 100%, rgba(0, 180, 255, 0.15) 0%, transparent 50%),
        radial-gradient(circle at 0% 100%, rgba(0, 210, 255, 0.1) 0%, transparent 50%),
        linear-gradient(180deg, rgba(0, 0, 0, 0.9) 0%, rgba(0, 0, 0, 0.95) 100%)"
            position="relative"
            overflow="auto"
        >
            {/* 添加语言切换按钮 */}
            <Box
                position="fixed"
                top={"5.5px"}
                right={4}
                zIndex={2}
            >
                <LanguageSwitcher />
            </Box>

            {/* 网格光效层 */}
            <Box
                position="absolute"
                top={0}
                left={0}
                right={0}
                bottom={0}
                pointerEvents="none"
                background="repeating-linear-gradient(90deg, 
          rgba(0, 210, 255, 0.03) 0px, 
          transparent 1px, 
          transparent 60px
        ),
        repeating-linear-gradient(180deg, 
          rgba(0, 210, 255, 0.03) 0px, 
          transparent 1px, 
          transparent 60px
        )"
                zIndex={0}
                opacity={0.35}
            />

            {/* 渐变光晕层 */}
            <Box
                position="absolute"
                top={0}
                left={0}
                right={0}
                bottom={0}
                pointerEvents="none"
                background="radial-gradient(
          circle at 50% 50%,
          rgba(0, 210, 255, 0.1) 0%,
          rgba(0, 180, 255, 0.06) 25%,
          rgba(0, 150, 255, 0.03) 50%,
          transparent 70%
        )"
                zIndex={0}
                backdropFilter="blur(90px)"
            />

            {/* 内容区域 */}
            <Flex direction="column" height="100%" zIndex={1}>
                <SettingsLayout>
                    {children}
                </SettingsLayout>
                <Center as="footer" height="40px" borderTop="1px solid" borderColor="rgba(0, 150, 255, 0.15)">
                    <Text fontSize="sm" color="gray.500">
                        © 2024 Hitbox Web Config. All rights reserved.
                    </Text>
                </Center>
            </Flex>
            <Toaster />
            <LoadingModal isOpen={showLoading} />
        </Flex>
    );
}

// 根布局组件
export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html suppressHydrationWarning style={{ height: '100%' }}>
            <body style={{ height: '100vh', margin: 0 }}>
                <StyledComponentsRegistry>
                    <Provider>
                        <GamepadConfigProvider>
                            <LanguageProvider>
                                <AppContent>
                                    {children}
                                </AppContent>
                                <DialogConfirm />
                                <DialogForm />
                                <DialogCannotClose />
                            </LanguageProvider>
                        </GamepadConfigProvider>
                    </Provider>
                </StyledComponentsRegistry>
            </body>
        </html>
    )
}
