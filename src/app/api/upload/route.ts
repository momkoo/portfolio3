import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export async function POST(request: Request) {
    const session = await getServerSession(authOptions);
    if (!session) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const clientId = process.env.IMGUR_CLIENT_ID;
    if (!clientId) {
        return NextResponse.json(
            { error: 'Imgur Client ID not configured' },
            { status: 500 }
        );
    }

    try {
        const formData = await request.formData();
        const file = formData.get('image') as File;

        if (!file) {
            return NextResponse.json({ error: 'No image provided' }, { status: 400 });
        }

        // Convert file to base64
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);
        const base64Image = buffer.toString('base64');

        // Upload to Imgur
        const imgurResponse = await fetch('https://api.imgur.com/3/image', {
            method: 'POST',
            headers: {
                'Authorization': `Client-ID ${clientId}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                image: base64Image,
                type: 'base64',
            }),
        });

        const imgurData = await imgurResponse.json();

        if (!imgurData.success) {
            console.error('Imgur upload failed:', imgurData);
            return NextResponse.json(
                { error: 'Failed to upload to Imgur' },
                { status: 500 }
            );
        }

        return NextResponse.json({
            url: imgurData.data.link,
            deleteHash: imgurData.data.deletehash,
        });
    } catch (error) {
        console.error('Upload error:', error);
        return NextResponse.json(
            { error: 'Failed to upload image' },
            { status: 500 }
        );
    }
}
