import { createInertiaApp } from '@inertiajs/react';
import { registerSW } from 'virtual:pwa-register';
import { initializeTheme } from '@/hooks/use-appearance';
import { resolveLayout, resolveTitle, wrapApp } from '@/lib/inertia-app';

void createInertiaApp({
    title: resolveTitle,
    layout: resolveLayout,
    strictMode: true,
    withApp: wrapApp,
    progress: {
        color: '#4B5563',
    },
});

// This will set light / dark mode on load...
initializeTheme();

// Keep the installed PWA's service worker current.
registerSW({ immediate: true });
