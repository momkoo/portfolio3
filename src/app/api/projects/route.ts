import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { revalidateTag } from 'next/cache';

export async function POST(request: Request) {
    const session = await getServerSession(authOptions);
    if (!session) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const body = await request.json();

        // Ensure category exists or use default/create one (Simplified logic)
        let categoryId = body.categoryId;
        const categoryExists = await prisma.category.findUnique({ where: { id: categoryId || 'unknown' } });

        if (!categoryExists) {
            // For safety, if user provided a valid looking ID but it doesn't exist, we might fail or create it.
            // Let's assume we need to fail or create a fallback. 
            // In a real app we'd have a category selector.
            // For now, let's try to find by name or create default.
            const defaultCat = await prisma.category.upsert({
                where: { name: body.categoryId || 'commercial' },
                update: {},
                create: {
                    name: body.categoryId || 'commercial',
                    nameKr: '기본 카테고리'
                }
            });
            categoryId = defaultCat.id;
        }

        const project = await prisma.project.create({
            data: {
                title: body.title,
                titleKr: body.titleKr,
                year: body.year,
                client: body.client,
                service: body.service,
                description: body.description,
                mainImage: body.mainImage,
                categoryId: categoryId,
                // Add first image to ProjectImage if mainImage is present (optional logic)
                images: body.mainImage ? {
                    create: {
                        url: body.mainImage,
                        isThumbnail: true,
                        order: 0
                    }
                } : undefined
            },
        });

        // Revalidate cache
        await revalidateTag('projects', 'max');

        return NextResponse.json(project);
    } catch (error) {
        console.error('Failed to create project:', error);
        return NextResponse.json({ error: 'Failed to create project' }, { status: 500 });
    }
}
