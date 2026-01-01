'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import ImageUpload from './ImageUpload';

export default function JournalForm({ initialData }: { initialData?: any }) {
    const router = useRouter();
    const [saving, setSaving] = useState(false);
    const [formData, setFormData] = useState({
        title: initialData?.title || '',
        excerpt: initialData?.excerpt || '',
        content: initialData?.content || '',
        imageUrl: initialData?.imageUrl || '', // URL input
        date: initialData?.date || new Date().toISOString().split('T')[0],
        published: initialData?.published ?? true, // Default to true
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, checked } = e.target;
        setFormData(prev => ({ ...prev, [name]: checked }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);

        try {
            const url = initialData?.id ? `/api/journals/${initialData.id}` : '/api/journals';
            const method = initialData?.id ? 'PUT' : 'POST';

            const res = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            if (!res.ok) throw new Error('Failed to save journal');

            router.push('/admin/journals');
            router.refresh();
        } catch (error) {
            alert('Failed to save journal. (Database connection might be missing)');
            console.error(error);
        } finally {
            setSaving(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6 max-w-3xl bg-white p-6 rounded-lg shadow-sm">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                    <input
                        type="text"
                        name="title"
                        required
                        value={formData.title}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border rounded focus:ring-2 focus:ring-amber-500 outline-none"
                    />
                </div>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Excerpt (Short Summary)</label>
                <textarea
                    name="excerpt"
                    rows={2}
                    required
                    value={formData.excerpt}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border rounded focus:ring-2 focus:ring-amber-500 outline-none"
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Content (Markdown supported)</label>
                <textarea
                    name="content"
                    rows={10}
                    required
                    value={formData.content}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border rounded focus:ring-2 focus:ring-amber-500 outline-none font-mono text-sm"
                />
            </div>

            <ImageUpload
                label="Cover Image"
                value={formData.imageUrl}
                onChange={(url) => setFormData(prev => ({ ...prev, imageUrl: url }))}
            />

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                <input
                    type="date"
                    name="date"
                    required
                    value={formData.date}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border rounded focus:ring-2 focus:ring-amber-500 outline-none"
                />
            </div>

            <div className="flex items-center gap-2">
                <input
                    type="checkbox"
                    id="published"
                    name="published"
                    checked={formData.published}
                    onChange={handleCheckboxChange}
                    className="w-4 h-4 text-amber-600 border-gray-300 rounded focus:ring-amber-500"
                />
                <label htmlFor="published" className="text-sm font-medium text-gray-700">Published</label>
            </div>

            <div className="pt-4 flex gap-4">
                <button
                    type="submit"
                    disabled={saving}
                    className="px-6 py-2 bg-amber-500 text-white font-bold rounded hover:bg-amber-600 transition-colors disabled:opacity-50"
                >
                    {saving ? 'Saving...' : (initialData ? 'Update Entry' : 'Create Entry')}
                </button>
                <button
                    type="button"
                    onClick={() => router.back()}
                    className="px-6 py-2 bg-gray-200 text-gray-700 font-bold rounded hover:bg-gray-300 transition-colors"
                >
                    Cancel
                </button>
            </div>
        </form>
    );
}
