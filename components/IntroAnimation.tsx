'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function IntroAnimation({
  onFinish,
  disabled,
}: {
  onFinish: () => void;
  disabled?: boolean;
}) {
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    if (disabled) onFinish();
  }, [disabled, onFinish]);

  // Start fade out after text fade-in
  const handleTextAnimationComplete = () => {
    setTimeout(() => setFadeOut(true), 800); // Wait for text fade-in, then start fade-out
  };

  if (disabled) return null;

  return (
    <AnimatePresence onExitComplete={onFinish}>
      {!fadeOut && (
        <motion.div
          key="intro-bg"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 9999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <motion.h1
            key="intro-title"
            initial={{ opacity: 0, y: 0 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -40 }}
            transition={{ duration: 1.2 }}
            style={{
              color: '#fff',
              fontSize: '3rem',
              fontWeight: 700,
              letterSpacing: '0.1em',
              textAlign: 'center',
              margin: 0,
              fontFamily: 'inherit', // Use the app's font
              border: 'none',
              textShadow: 'none',
            }}
            onAnimationComplete={handleTextAnimationComplete}
          >
            QuickTask
          </motion.h1>
        </motion.div>
      )}
    </AnimatePresence>
  );
}