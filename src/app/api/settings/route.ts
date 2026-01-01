import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

const prisma = new PrismaClient();

export async function GET() {
    try {
        let settings = await prisma.siteSettings.findUnique({
            where: { id: 'main' },
        });

        if (!settings) {
            settings = await prisma.siteSettings.create({
                data: {
                    id: 'main',
                    instagram: 'https://instagram.com/vantage_studio',
                    behance: 'https://behance.net/vantage_studio',
                    artstation: 'https://artstation.com/vantage_studio',
                    linkedin: 'https://linkedin.com/in/vantage-studio',
                },
            });
        }

        return NextResponse.json(settings);
    } catch (error) {
        console.error('Failed to fetch settings:', error);
        return NextResponse.json(
            {
                instagram: 'https://instagram.com/vantage_studio',
                behance: 'https://behance.net/vantage_studio',
                artstation: 'https://artstation.com/vantage_studio',
                linkedin: 'https://linkedin.com/in/vantage-studio',
            },
            { status: 200 } // Fallback to defaults on DB error
        );
    }
}

export async function PUT(request: Request) {
    const session = await getServerSession(authOptions);
    if (!session) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const body = await request.json();
        const settings = await prisma.siteSettings.upsert({
            where: { id: 'main' },
            update: {
                instagram: body.instagram,
                behance: body.behance,
                artstation: body.artstation,
                linkedin: body.linkedin,
            },
            create: {
                id: 'main',
                instagram: body.instagram,
                behance: body.behance,
                artstation: body.artstation,
                linkedin: body.linkedin,
            },
        });

        return NextResponse.json(settings);
    } catch (error) {
        console.error('Failed to update settings:', error);
        return NextResponse.json({ error: 'Failed to update settings' }, { status: 500 });
    }
}
