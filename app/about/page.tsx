'use client';

import { Container, Title, Text, Paper, Divider, Box } from '@mantine/core';
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
                    <Title order={2} mb="sm">
                        About QuickTask
                    </Title>

                    <Divider my="md" />

                    <Box>
                        <Text size="md" mb="sm">
                            <strong>QuickTask</strong> is your friendly, lightning-fast task manager — built to be simple, fast, easy.
                        </Text>

                        <Text size="sm" color="dimmed" mb="xs">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur
                            vehicula libero nec ullamcorper congue. Duis fringilla sapien, ac
                            finibus sem. Integer imperdiet, tortor a luctus suscipit, lectus magna
                            bibendum neque.
                        </Text>

                        <Text size="sm" color="dimmed">
                            Aenean sed lorem et augue ultricies efficitur. Morbi pretium nisi non
                            ex tincidunt, sit amet scelerisque libero dapibus.
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
