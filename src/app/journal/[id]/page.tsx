import { prisma } from "@/lib/prisma";
import JournalDetailClient from './JournalDetailClient';

export const dynamic = 'force-dynamic';

export default async function JournalDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;

    const journal = await prisma.journal.findUnique({
        where: { id }
    });

    if (!journal) {
        return <div className="min-h-screen flex items-center justify-center">Journal not found</div>;
    }

    return <JournalDetailClient journal={journal} />;
}
