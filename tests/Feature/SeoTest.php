<?php

test('robots.txt blocks private areas and points to the sitemap', function () {
    $this->get('/robots.txt')
        ->assertOk()
        ->assertHeader('Content-Type', 'text/plain; charset=UTF-8')
        ->assertSee('Disallow: /admin')
        ->assertSee('Sitemap: '.route('sitemap'), false);
});

test('robots.txt leaves the login and register pages crawlable', function () {
    $this->get('/robots.txt')
        ->assertOk()
        ->assertDontSee('Disallow: /login')
        ->assertDontSee('Disallow: /register');
});

test('sitemap lists public pages only', function () {
    $this->get('/sitemap.xml')
        ->assertOk()
        ->assertHeader('Content-Type', 'application/xml')
        ->assertSee(route('testimonials'), false)
        ->assertSee(route('hangout'), false)
        ->assertSee(route('register'), false)
        ->assertSee(route('login'), false)
        ->assertDontSee(route('give'), false)
        ->assertDontSee('/admin', false);
});

test('inertia shares the canonical url without the query string', function () {
    $this->get(route('testimonials', ['utm_source' => 'x']))
        ->assertInertia(fn ($page) => $page
            ->where('canonicalUrl', route('testimonials'))
            ->has('appUrl'));
});

test('sitemap entries carry a lastmod date once the frontend is built', function () {
    $manifest = public_path('build/manifest.json');
    $existed = is_file($manifest);

    if (! $existed) {
        @mkdir(dirname($manifest), 0755, true);
        file_put_contents($manifest, '{}');
    }

    try {
        $this->get('/sitemap.xml')
            ->assertOk()
            ->assertSee('<lastmod>'.date('Y-m-d', filemtime($manifest)).'</lastmod>', false);
    } finally {
        if (! $existed) {
            unlink($manifest);
        }
    }
});
