import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Footer({
  introEnabled,
  onToggleIntro,
}: {
  introEnabled: boolean;
  onToggleIntro: () => void;
}) {
  return (
    <AnimatePresence>
      <motion.footer
        key="footer-toggle-intro"
        className="footer-toggle-intro"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 40 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
      >
        <div onClick={onToggleIntro}>
          {introEnabled ? 'Disable Intro' : 'Enable Intro'}
        </div>
      </motion.footer>
    </AnimatePresence>
  );
}