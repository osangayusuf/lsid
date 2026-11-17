import { createInertiaApp } from '@inertiajs/react';
import { resolveLayout, resolveTitle, wrapApp } from '@/lib/inertia-app';

// The @inertiajs/vite plugin wraps this call with the SSR server bootstrap and
// page resolution at build time. Browser-only setup (service worker, theme
// initialisation) intentionally lives in app.tsx only.
void createInertiaApp({
    title: resolveTitle,
    layout: resolveLayout,
    strictMode: true,
    withApp: wrapApp,
});
