import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function POST(request: Request) {
    const session = await getServerSession(authOptions);
    if (!session) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const apiKey = process.env.IMGBB_API_KEY;
    if (!apiKey) {
        return NextResponse.json(
            { error: 'ImgBB API Key not configured' },
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

        // Upload to ImgBB
        const imgbbFormData = new FormData();
        imgbbFormData.append('key', apiKey);
        imgbbFormData.append('image', base64Image);

        const imgbbResponse = await fetch('https://api.imgbb.com/1/upload', {
            method: 'POST',
            body: imgbbFormData,
        });

        const imgbbData = await imgbbResponse.json();

        if (!imgbbData.success) {
            console.error('ImgBB upload failed:', imgbbData);
            return NextResponse.json(
                { error: imgbbData.error?.message || 'Failed to upload to ImgBB' },
                { status: 500 }
            );
        }

        // Save to Media library
        const media = await prisma.media.create({
            data: {
                url: imgbbData.data.url,
                displayUrl: imgbbData.data.display_url,
                thumbnailUrl: imgbbData.data.thumb?.url,
                deleteUrl: imgbbData.data.delete_url,
                filename: file.name,
                size: file.size,
            },
        });

        return NextResponse.json({
            id: media.id,
            url: media.url,
            displayUrl: media.displayUrl,
            deleteUrl: media.deleteUrl,
            thumbnail: media.thumbnailUrl,
        });
    } catch (error) {
        console.error('Upload error:', error);
        return NextResponse.json(
            { error: 'Failed to upload image' },
            { status: 500 }
        );
    }
}
