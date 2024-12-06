'use client';

import { Box, Fieldset, Stack, Text } from "@chakra-ui/react";

export default function FirmwarePage() {
  return (
    <Box width="1700px" padding="18px">
      <Fieldset.Root>
        <Stack direction="column" gap={4}>
          <Fieldset.Legend fontSize="2rem" color="green.600" textAlign="center">
            FIRMWARE
          </Fieldset.Legend>
          <Fieldset.Content textAlign="center">
            <Text color="gray.400">Firmware settings coming soon...</Text>
          </Fieldset.Content>
        </Stack>
      </Fieldset.Root>
    </Box>
  );
} 