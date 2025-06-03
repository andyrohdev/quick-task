'use client';

import { Group, Title, Button, Container, Image } from '@mantine/core';
import { useRouter } from 'next/navigation';

export function Header() {
  const router = useRouter();

  const handleLearnMore = () => {
    sessionStorage.setItem('introEnabled', 'false');
    router.push('/about');
  };

  return (
    <Container size="sm" py="md">
      <Group justify="space-between" align="center">
        {/* Logo + Title */}
        <Group align="center" gap="xs" mt="sm">
          <Image
            src="/quick-task-logo.png"
            alt="QuickTask Logo"
            width={32}
            height={32}
            radius="sm"
            fit="cover"
            style={{
              width: '50px',
              height: '50px',
              display: 'inline-block',
            }}
          />

          <Title order={1} m={0}>
            QuickTask
          </Title>
        </Group>

        {/* Learn More Button */}
        <Button
          variant="light"
          color="blue"
          mt="sm"
          onClick={handleLearnMore}
        >
          Learn More
        </Button>
      </Group>
    </Container>
  );
}