'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import ImageUpload from './ImageUpload';

export default function ProjectForm({ initialData }: { initialData?: any }) {
    const router = useRouter();
    const [saving, setSaving] = useState(false);
    const [formData, setFormData] = useState({
        title: initialData?.title || '',
        titleKr: initialData?.titleKr || '',
        categoryId: initialData?.categoryId || '', // category ID (needs to be fetched or hardcoded for now)
        year: initialData?.year || new Date().getFullYear().toString(),
        client: initialData?.client || '',
        service: initialData?.service || '',
        description: initialData?.description || '',
        mainImage: initialData?.mainImage || '', // URL input
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);

        try {
            const url = initialData?.id ? `/api/projects/${initialData.id}` : '/api/projects';
            const method = initialData?.id ? 'PUT' : 'POST';

            const res = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            if (!res.ok) throw new Error('Failed to save project');

            router.push('/admin/projects');
            router.refresh();
        } catch (error) {
            alert('Failed to save project. (Database connection might be missing)');
            console.error(error);
        } finally {
            setSaving(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6 max-w-3xl bg-white p-6 rounded-lg shadow-sm">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Title (ENG)</label>
                    <input
                        type="text"
                        name="title"
                        required
                        value={formData.title}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border rounded focus:ring-2 focus:ring-amber-500 outline-none"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Title (KOR)</label>
                    <input
                        type="text"
                        name="titleKr"
                        required
                        value={formData.titleKr}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border rounded focus:ring-2 focus:ring-amber-500 outline-none"
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Year</label>
                    <input
                        type="text"
                        name="year"
                        required
                        value={formData.year}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border rounded focus:ring-2 focus:ring-amber-500 outline-none"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Client</label>
                    <input
                        type="text"
                        name="client"
                        value={formData.client}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border rounded focus:ring-2 focus:ring-amber-500 outline-none"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Service</label>
                    <input
                        type="text"
                        name="service"
                        value={formData.service}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border rounded focus:ring-2 focus:ring-amber-500 outline-none"
                    />
                </div>
            </div>

            {/* Category Selection - Needs to be dynamic normally, simplified for now */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category Code</label>
                <select
                    name="categoryId"
                    value={formData.categoryId}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border rounded focus:ring-2 focus:ring-amber-500 outline-none"
                >
                    <option value="">Select Category...</option>
                    <option value="editorial">Editorial</option>
                    <option value="portrait">Portrait</option>
                    <option value="commercial">Commercial</option>
                    <option value="art">Art Work</option>
                </select>
                <p className="text-xs text-gray-500 mt-1">* Requires matching Category ID in DB</p>
            </div>

            <ImageUpload
                label="Main Image"
                value={formData.mainImage}
                onChange={(url) => setFormData(prev => ({ ...prev, mainImage: url }))}
            />

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                    name="description"
                    rows={5}
                    value={formData.description}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border rounded focus:ring-2 focus:ring-amber-500 outline-none"
                />
            </div>

            <div className="pt-4 flex gap-4">
                <button
                    type="submit"
                    disabled={saving}
                    className="px-6 py-2 bg-amber-500 text-white font-bold rounded hover:bg-amber-600 transition-colors disabled:opacity-50"
                >
                    {saving ? 'Saving...' : (initialData ? 'Update Project' : 'Create Project')}
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
