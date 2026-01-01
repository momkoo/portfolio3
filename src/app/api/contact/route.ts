import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export const dynamic = 'force-dynamic';

// POST /api/contact - 문의 메시지 전송
export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { name, email, subject, message } = body;

        // 유효성 검사
        if (!name || !email || !message) {
            return NextResponse.json(
                { error: '필수 항목을 모두 입력해주세요.' },
                { status: 400 }
            );
        }

        const contactMessage = await prisma.contactMessage.create({
            data: {
                name,
                email,
                subject,
                message,
            },
        });

        return NextResponse.json(
            { message: '문의가 성공적으로 전송되었습니다.', id: contactMessage.id },
            { status: 201 }
        );
    } catch (error) {
        console.error('Error creating contact message:', error);
        return NextResponse.json(
            { error: '문의 전송에 실패했습니다.' },
            { status: 500 }
        );
    }
}

// GET /api/contact - 문의 목록 조회 (관리자)
export async function GET() {
    try {
        const messages = await prisma.contactMessage.findMany({
            orderBy: { createdAt: 'desc' },
        });

        return NextResponse.json(messages);
    } catch (error) {
        console.error('Error fetching contact messages:', error);
        return NextResponse.json(
            { error: 'Failed to fetch messages' },
            { status: 500 }
        );
    }
}
