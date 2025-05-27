'use client';

import { Group, Title, Button, Container } from '@mantine/core';
import Link from 'next/link';

export function Header() {
  return (
    <Container size="sm" py="md">
      <Group position="apart" align="center">
        <Title order={1}>QuickTask</Title>
        <Button component={Link} href="/about" variant="light" color="blue">
          Learn More
        </Button>
      </Group>
    </Container>
  );
}
