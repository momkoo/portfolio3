import { prisma } from "@/lib/prisma";
import { JournalSection } from '@/components';

export const dynamic = 'force-dynamic';

export default async function JournalPage() {
    const journals = await prisma.journal.findMany({
        orderBy: { createdAt: 'desc' }
    });

    return (
        <main className="pt-20">
            <JournalSection journals={journals} />
        </main>
    );
}
