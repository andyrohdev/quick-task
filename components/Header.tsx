'use client';

import { Group, Title, Button, Container } from '@mantine/core';
import Link from 'next/link';

export function Header() {
  return (
    <Container size="sm" py="md">
      <Group justify='space-between' align="center">
        <Title order={1} style={{ marginTop: "1.5rem" }}>QuickTask</Title>
        <Button component={Link} href="/about" variant="light" color="blue" style={{ marginTop: "1.5rem" }}>
          Learn More
        </Button>
      </Group>
    </Container>
  );
}
