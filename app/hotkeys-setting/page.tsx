'use client';

import { Box, Center, Fieldset, Stack, Text } from "@chakra-ui/react";

export default function HotkeysSettingPage() {
  return (
    <Box width="1700px" padding="18px">
      <Fieldset.Root>
        <Stack direction="column" gap={4}>
          <Fieldset.Legend fontSize="2rem" color="green.600">
            HOTKEYS SETTINGS
          </Fieldset.Legend>
          <Fieldset.Content>
            <Text color="gray.400">Hotkeys settings coming soon...</Text>
          </Fieldset.Content>
        </Stack>
      </Fieldset.Root>
    </Box>
  );
} 