'use client';

import { Box, Fieldset, Stack, Text } from "@chakra-ui/react";

export default function CalibrationPage() {
  return (
    <Box width="1700px" padding="18px">
      <Fieldset.Root>
        <Stack direction="column" gap={4}>
          <Fieldset.Legend fontSize="2rem" color="green.600" textAlign="center">
            CALIBRATION
          </Fieldset.Legend>
          <Fieldset.Content textAlign="center"  >
            <Text color="gray.400">Calibration settings coming soon...</Text>
          </Fieldset.Content>
        </Stack>
      </Fieldset.Root>
    </Box>
  );
} 