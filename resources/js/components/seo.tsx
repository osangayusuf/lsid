import { Head, usePage } from '@inertiajs/react';

type SeoProps = {
    title: string;
    description: string;
    image?: string;
    /** Emit Organization and WebSite JSON-LD (landing page only). */
    withOrganizationSchema?: boolean;
};

// Dimensions of the default share image, public/images/hero.webp.
const DEFAULT_IMAGE = '/images/hero.webp';
const DEFAULT_IMAGE_SIZE = { width: 928, height: 1152 };

export default function Seo({
    title,
    description,
    image = DEFAULT_IMAGE,
    withOrganizationSchema = false,
}: SeoProps) {
    const { name, canonicalUrl, appUrl } = usePage().props;
    const imageUrl = image.startsWith('http') ? image : `${appUrl}${image}`;
    const shareTitle = `${title} - ${name}`;

    const organizationSchema = {
        '@context': 'https://schema.org',
        '@graph': [
            {
                '@type': 'Organization',
                '@id': `${appUrl}/#organization`,
                name,
                url: `${appUrl}/`,
                logo: `${appUrl}/icons/icon-512.png`,
                description,
            },
            {
                '@type': 'WebSite',
                '@id': `${appUrl}/#website`,
                name,
                url: `${appUrl}/`,
                inLanguage: 'en',
                publisher: { '@id': `${appUrl}/#organization` },
            },
        ],
    };

    return (
        <Head title={title}>
            <meta
                head-key="description"
                name="description"
                content={description}
            />
            <link head-key="canonical" rel="canonical" href={canonicalUrl} />
            <meta head-key="og:type" property="og:type" content="website" />
            <meta head-key="og:locale" property="og:locale" content="en_US" />
            <meta
                head-key="og:site_name"
                property="og:site_name"
                content={name}
            />
            <meta
                head-key="og:title"
                property="og:title"
                content={shareTitle}
            />
            <meta
                head-key="og:description"
                property="og:description"
                content={description}
            />
            <meta head-key="og:url" property="og:url" content={canonicalUrl} />
            <meta head-key="og:image" property="og:image" content={imageUrl} />
            {image === DEFAULT_IMAGE && (
                <meta
                    head-key="og:image:width"
                    property="og:image:width"
                    content={String(DEFAULT_IMAGE_SIZE.width)}
                />
            )}
            {image === DEFAULT_IMAGE && (
                <meta
                    head-key="og:image:height"
                    property="og:image:height"
                    content={String(DEFAULT_IMAGE_SIZE.height)}
                />
            )}
            <meta
                head-key="twitter:card"
                name="twitter:card"
                content="summary_large_image"
            />
            <meta
                head-key="twitter:title"
                name="twitter:title"
                content={shareTitle}
            />
            <meta
                head-key="twitter:description"
                name="twitter:description"
                content={description}
            />
            <meta
                head-key="twitter:image"
                name="twitter:image"
                content={imageUrl}
            />
            {withOrganizationSchema && (
                <script head-key="ld-json" type="application/ld+json">
                    {JSON.stringify(organizationSchema)}
                </script>
            )}
        </Head>
    );
}
