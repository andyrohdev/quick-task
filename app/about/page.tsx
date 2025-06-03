'use client';

import { Container, Title, Text, Paper, Divider, Box, Image, Group } from '@mantine/core';
import { motion } from 'framer-motion';
import { cardStyle } from '../../styles/theme';
import Link from 'next/link';
import { Button } from '@mantine/core';

export default function AboutPage() {
    return (
        <Container size="sm" py="xl">
            <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <Paper className="glassCard" style={cardStyle} p="xl" shadow="md" radius="md">

                    <Group align="center" gap="xs" mb="sm">
                        <Image
                            src="/quick-task-logo.png"
                            alt="QuickTask Icon"
                            width={50}
                            height={50}
                            fit="cover"
                            radius="sm"
                            style={{
                                width: '50px',
                                height: '50px',
                                borderRadius: '4px',
                            }}
                        />
                        <Title order={2} mb={0}>
                            About QuickTask
                        </Title>
                    </Group>

                    <Divider my="md" />

                    <Box>
                        <Text size="md" mb="sm">
                            <strong>QuickTask</strong> a task manager. A quiet observer. A patient keeper of the things you said you’d do… but haven’t.
                        </Text>

                        <Text size="sm" color="dimmed" mb="xs">
                            Here, tasks don’t vanish. Each one a whisper in the void, reminding you of promises made to yourself.
                        </Text>

                        <Text size="sm" color="dimmed">
                            Add, Drag, and Complete. QuickTask remembers. Even if you try to forget.
                        </Text>
                    </Box>

                    <Button
                        component={Link}
                        href="/"
                        variant="outline"
                        color="gray"
                        mt="lg"
                    >
                        ← Back to Tasks
                    </Button>
                </Paper>
            </motion.div>
        </Container>
    );
}
