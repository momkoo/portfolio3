import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

const prisma = new PrismaClient();

export async function POST(request: Request) {
    const session = await getServerSession(authOptions);
    if (!session) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const body = await request.json();

        const journal = await prisma.journal.create({
            data: {
                title: body.title,
                excerpt: body.excerpt,
                content: body.content,
                imageUrl: body.imageUrl,
                date: body.date,
                published: body.published,
                tags: [] // Tags handling can be added here or in future updates
            },
        });

        return NextResponse.json(journal);
    } catch (error) {
        console.error('Failed to create journal:', error);
        return NextResponse.json({ error: 'Failed to create journal' }, { status: 500 });
    }
}
