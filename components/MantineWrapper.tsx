'use client';

import { useState, useEffect } from 'react';
import { MantineProvider, ColorSchemeScript } from '@mantine/core';
import { ReactNode } from 'react';

export function MantineWrapper({ children }: { children: ReactNode }) {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    return (
        <>
            <ColorSchemeScript defaultColorScheme="light" />
            <MantineProvider defaultColorScheme="light">
                {children}
            </MantineProvider>
        </>

    );
}
