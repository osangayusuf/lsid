import type { ReactElement } from 'react';
import { CelebrationModal } from '@/components/celebration-modal';
import { Toaster } from '@/components/ui/sonner';
import { TooltipProvider } from '@/components/ui/tooltip';
import AppLayout from '@/layouts/app-layout';
import AuthLayout from '@/layouts/auth-layout';
import MobileShellLayout from '@/layouts/mobile-shell-layout';

/**
 * Shared by the browser entry (app.tsx) and the SSR entry (ssr.tsx) so the
 * server-rendered markup matches what the client hydrates.
 */
export const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

const MOBILE_SHELL_PAGE_PREFIXES = [
    'home',
    'give/',
    'groups/',
    'verses/',
    'insights/',
    'leaderboard/',
    'partner/',
    'announcements/',
    'notifications/',
    'profile',
    'marketplace/',
    'settings/',
    'quizzes/',
    'certificates/',
];

export function resolveTitle(title: string): string {
    return title ? `${title} - ${appName}` : appName;
}

export function resolveLayout(name: string) {
    switch (true) {
        case name === 'landing':
        case name === 'testimonials':
        case name === 'support':
        case name === 'manual':
        case name === 'accountability-partners':
        case name === 'hangout':
        case name === 'certificates/show':
        case name.startsWith('onboarding/'):
            return null;
        case name.startsWith('auth/'):
            return AuthLayout;
        case name.startsWith('admin/'):
            return AppLayout;
        case MOBILE_SHELL_PAGE_PREFIXES.some((prefix) =>
            name.startsWith(prefix),
        ):
            return MobileShellLayout;
        default:
            return AppLayout;
    }
}

export function wrapApp(app: ReactElement): ReactElement {
    return (
        <TooltipProvider delayDuration={0}>
            {app}
            <Toaster />
            <CelebrationModal />
        </TooltipProvider>
    );
}
