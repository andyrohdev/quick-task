// app/layout.tsx
import '@mantine/core/styles.css';
import '../styles/globals.css';
import { MantineWrapper } from '../components/MantineWrapper';

export const metadata = {
  title: 'QuickTask',
  description: 'Simple task tracker app',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head />
      <body>
        <MantineWrapper>
          {children}
        </MantineWrapper>
      </body>
    </html>
  );
}
