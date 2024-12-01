import { Provider } from "@/components/ui/provider"
import StyledComponentsRegistry from '@/lib/registry'
import SettingsLayout from '@/components/settings-layout'
import { GamepadConfigProvider } from '@/contexts/gamepad-config-context'
import { Box, Container, Flex, Grid, Text, Center } from '@chakra-ui/react'
import { Toaster, toaster } from "@/components/ui/toaster"

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
              <Flex minHeight="100%" width="100%" direction="column" >
                <Grid height="60px" px={8} py={3} /> {/* TODO: LOGO */}
                <SettingsLayout>
                  {children}
                </SettingsLayout>
                <Center as="footer" height="40px" borderTop="1px solid" borderColor="gray.800">
                  <Text fontSize="sm" color="gray.500">
                    © 2024 Hitbox Web Config. All rights reserved.
                  </Text>
                </Center>
              </Flex>
              <Toaster />
            </GamepadConfigProvider>
          </Provider>
        </StyledComponentsRegistry>
        
      </body>
    </html>
  )
}
