import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

const prisma = new PrismaClient();

export async function PUT(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const session = await getServerSession(authOptions);
    if (!session) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const { id } = await params;
        const body = await request.json();

        const journal = await prisma.journal.update({
            where: { id },
            data: {
                title: body.title,
                excerpt: body.excerpt,
                content: body.content,
                imageUrl: body.imageUrl,
                date: body.date,
                published: body.published,
            },
        });

        return NextResponse.json(journal);
    } catch (error) {
        console.error('Failed to update journal:', error);
        return NextResponse.json({ error: 'Failed to update journal' }, { status: 500 });
    }
}

export async function DELETE(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const session = await getServerSession(authOptions);
    if (!session) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const { id } = await params;
        await prisma.journal.delete({
            where: { id },
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Failed to delete journal:', error);
        return NextResponse.json({ error: 'Failed to delete journal' }, { status: 500 });
    }
}
