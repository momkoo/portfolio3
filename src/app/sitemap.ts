import { MetadataRoute } from 'next';
import { projects } from '@/data/projects';
import { journals } from '@/data/journals';

const BASE_URL = process.env.NEXTAUTH_URL || 'http://localhost:3000';

export default function sitemap(): MetadataRoute.Sitemap {
    // 1. Static Routes
    const staticRoutes = [
        '',
        '/work',
        '/about',
        '/journal',
        '/contact',
    ].map((route) => ({
        url: `${BASE_URL}${route}`,
        lastModified: new Date(),
        changeFrequency: 'daily' as const,
        priority: route === '' ? 1 : 0.8,
    }));

    // 2. Dynamic Work Routes
    const workRoutes = projects.map((project) => ({
        url: `${BASE_URL}/work/${project.id}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.7,
    }));

    // 3. Dynamic Journal Routes
    const journalRoutes = journals.map((journal) => ({
        url: `${BASE_URL}/journal/${journal.id}`,
        lastModified: new Date(journal.date),
        changeFrequency: 'weekly' as const,
        priority: 0.6,
    }));

    return [...staticRoutes, ...workRoutes, ...journalRoutes];
}
