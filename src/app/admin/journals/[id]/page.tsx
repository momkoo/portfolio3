import JournalForm from '@/components/admin/JournalForm';
import { PrismaClient, Journal } from '@prisma/client';

const prisma = new PrismaClient();

export const dynamic = 'force-dynamic';

export default async function EditJournalPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    let journal: Journal | null = null;
    let error: string | null = null;

    try {
        journal = await prisma.journal.findUnique({
            where: { id },
        });

        if (!journal) {
            return <div>Journal not found</div>;
        }
    } catch (e) {
        console.error("Failed to fetch journal:", e);
        error = "Database connection failed.";
    }

    if (error) {
        return (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md">
                <p className="font-bold">Error</p>
                <p>{error}</p>
            </div>
        );
    }

    return (
        <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-6">Edit Journal Entry</h1>
            <JournalForm initialData={journal} />
        </div>
    );
}
