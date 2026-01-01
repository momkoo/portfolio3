import JournalForm from '@/components/admin/JournalForm';

export default function NewJournalPage() {
    return (
        <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-6">Create New Journal Entry</h1>
            <JournalForm />
        </div>
    );
}
