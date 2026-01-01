import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export const dynamic = 'force-dynamic';

// GET /api/journal - 저널 목록 조회
export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const limit = searchParams.get('limit');
        const published = searchParams.get('published');

        const journals = await prisma.journal.findMany({
            where: {
                ...(published === 'true' ? { published: true } : {}),
            },
            orderBy: { createdAt: 'desc' },
            ...(limit ? { take: parseInt(limit) } : {}),
        });

        return NextResponse.json(journals);
    } catch (error) {
        console.error('Error fetching journals:', error);
        return NextResponse.json(
            { error: 'Failed to fetch journals' },
            { status: 500 }
        );
    }
}

// POST /api/journal - 저널 생성 (관리자)
export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { title, excerpt, content, imageUrl, published } = body;

        const journal = await prisma.journal.create({
            data: {
                title,
                excerpt,
                content,
                imageUrl,
                published: published || false,
            },
        });

        return NextResponse.json(journal, { status: 201 });
    } catch (error) {
        console.error('Error creating journal:', error);
        return NextResponse.json(
            { error: 'Failed to create journal' },
            { status: 500 }
        );
    }
}
