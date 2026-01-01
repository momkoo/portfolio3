'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function AdminSettings() {
    const { data: session, status } = useSession();
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState('');

    const [formData, setFormData] = useState({
        instagram: '',
        behance: '',
        artstation: '',
        linkedin: '',
    });

    useEffect(() => {
        if (status === 'unauthenticated') {
            router.push('/admin/login');
            return;
        }

        const fetchSettings = async () => {
            try {
                const res = await fetch('/api/settings');
                const data = await res.json();
                if (res.ok) {
                    setFormData({
                        instagram: data.instagram || '',
                        behance: data.behance || '',
                        artstation: data.artstation || '',
                        linkedin: data.linkedin || '',
                    });
                }
            } catch (error) {
                console.error('Failed to load settings', error);
            } finally {
                setLoading(false);
            }
        };

        if (status === 'authenticated') {
            fetchSettings();
        }
    }, [status, router]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);
        setMessage('');

        try {
            const res = await fetch('/api/settings', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            if (res.ok) {
                setMessage('Settings saved successfully!');
            } else {
                setMessage('Failed to save settings.');
            }
        } catch (error) {
            setMessage('An error occurred.');
        } finally {
            setSaving(false);
        }
    };

    if (loading) return <div className="p-8">Loading...</div>;

    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-8">
                <h1 className="text-2xl font-bold mb-6 text-gray-900">Site Settings</h1>

                {message && (
                    <div className={`p-4 mb-6 rounded ${message.includes('success') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                        {message}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    <h2 className="text-lg font-semibold text-gray-700 border-b pb-2">Social Media Links</h2>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Instagram</label>
                        <input
                            type="url"
                            value={formData.instagram}
                            onChange={(e) => setFormData({ ...formData, instagram: e.target.value })}
                            className="w-full px-4 py-2 border rounded focus:ring-2 focus:ring-amber-500 outline-none"
                            placeholder="https://instagram.com/..."
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Behance</label>
                        <input
                            type="url"
                            value={formData.behance}
                            onChange={(e) => setFormData({ ...formData, behance: e.target.value })}
                            className="w-full px-4 py-2 border rounded focus:ring-2 focus:ring-amber-500 outline-none"
                            placeholder="https://behance.net/..."
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">ArtStation</label>
                        <input
                            type="url"
                            value={formData.artstation}
                            onChange={(e) => setFormData({ ...formData, artstation: e.target.value })}
                            className="w-full px-4 py-2 border rounded focus:ring-2 focus:ring-amber-500 outline-none"
                            placeholder="https://artstation.com/..."
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">LinkedIn</label>
                        <input
                            type="url"
                            value={formData.linkedin}
                            onChange={(e) => setFormData({ ...formData, linkedin: e.target.value })}
                            className="w-full px-4 py-2 border rounded focus:ring-2 focus:ring-amber-500 outline-none"
                            placeholder="https://linkedin.com/in/..."
                        />
                    </div>

                    <div className="pt-4">
                        <button
                            type="submit"
                            disabled={saving}
                            className="w-full bg-amber-500 text-white font-bold py-3 px-4 rounded hover:bg-amber-600 transition-colors disabled:opacity-50"
                        >
                            {saving ? 'Saving...' : 'Save Settings'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
