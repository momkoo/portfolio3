'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';

interface Media {
    id: string;
    url: string;
    displayUrl: string | null;
    thumbnailUrl: string | null;
    filename: string | null;
    createdAt: string;
}

interface ImageUploadProps {
    value: string;
    onChange: (url: string) => void;
    label?: string;
}

export default function ImageUpload({ value, onChange, label = 'Image' }: ImageUploadProps) {
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [dragOver, setDragOver] = useState(false);
    const [showGallery, setShowGallery] = useState(false);
    const [media, setMedia] = useState<Media[]>([]);
    const [loadingMedia, setLoadingMedia] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);

    // Fetch media library
    const fetchMedia = async () => {
        setLoadingMedia(true);
        try {
            const response = await fetch('/api/media');
            if (response.ok) {
                const data = await response.json();
                setMedia(data);
            }
        } catch (err) {
            console.error('Failed to fetch media:', err);
        } finally {
            setLoadingMedia(false);
        }
    };

    useEffect(() => {
        if (showGallery) {
            fetchMedia();
        }
    }, [showGallery]);

    const handleUpload = async (file: File) => {
        if (!file.type.startsWith('image/')) {
            setError('Please select an image file');
            return;
        }

        // Max 10MB
        if (file.size > 10 * 1024 * 1024) {
            setError('Image must be less than 10MB');
            return;
        }

        setUploading(true);
        setError(null);

        try {
            const formData = new FormData();
            formData.append('image', file);

            const response = await fetch('/api/upload', {
                method: 'POST',
                body: formData,
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Upload failed');
            }

            onChange(data.url);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Upload failed');
        } finally {
            setUploading(false);
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            handleUpload(file);
        }
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setDragOver(false);
        const file = e.dataTransfer.files?.[0];
        if (file) {
            handleUpload(file);
        }
    };

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        setDragOver(true);
    };

    const handleDragLeave = () => {
        setDragOver(false);
    };

    const selectFromGallery = (url: string) => {
        onChange(url);
        setShowGallery(false);
    };

    return (
        <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">{label}</label>

            {/* Action Buttons */}
            <div className="flex gap-2 mb-2">
                <button
                    type="button"
                    onClick={() => inputRef.current?.click()}
                    className="px-3 py-1.5 text-sm bg-amber-500 text-white rounded-md hover:bg-amber-600 transition-colors"
                >
                    Upload New
                </button>
                <button
                    type="button"
                    onClick={() => setShowGallery(true)}
                    className="px-3 py-1.5 text-sm bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors"
                >
                    Choose from Library
                </button>
            </div>

            {/* Upload Area */}
            <div
                onClick={() => inputRef.current?.click()}
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                className={`
                    relative border-2 border-dashed rounded-lg p-6 cursor-pointer
                    transition-colors duration-200
                    ${dragOver ? 'border-amber-500 bg-amber-50' : 'border-gray-300 hover:border-gray-400'}
                    ${uploading ? 'pointer-events-none opacity-50' : ''}
                `}
            >
                <input
                    ref={inputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                />

                <div className="text-center">
                    {uploading ? (
                        <div className="flex flex-col items-center">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-amber-500 mb-2"></div>
                            <p className="text-sm text-gray-500">Uploading...</p>
                        </div>
                    ) : (
                        <>
                            <svg
                                className="mx-auto h-12 w-12 text-gray-400"
                                stroke="currentColor"
                                fill="none"
                                viewBox="0 0 48 48"
                            >
                                <path
                                    d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                                    strokeWidth={2}
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                            <p className="mt-2 text-sm text-gray-600">
                                <span className="font-medium text-amber-600">Click to upload</span> or drag and drop
                            </p>
                            <p className="mt-1 text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                        </>
                    )}
                </div>
            </div>

            {/* Error Message */}
            {error && (
                <p className="text-sm text-red-600">{error}</p>
            )}

            {/* Preview */}
            {value && (
                <div className="relative">
                    <div className="relative w-full h-48 rounded-lg overflow-hidden bg-gray-100">
                        <Image
                            src={value}
                            alt="Preview"
                            fill
                            className="object-cover"
                            unoptimized
                        />
                    </div>
                    <button
                        type="button"
                        onClick={(e) => {
                            e.stopPropagation();
                            onChange('');
                        }}
                        className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                    <p className="mt-1 text-xs text-gray-500 truncate">{value}</p>
                </div>
            )}

            {/* Manual URL Input */}
            <div className="flex gap-2">
                <input
                    type="url"
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    placeholder="Or paste image URL directly"
                    className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-amber-500 focus:border-amber-500"
                />
            </div>

            {/* Gallery Modal */}
            {showGallery && (
                <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-lg max-w-4xl w-full max-h-[80vh] overflow-hidden flex flex-col">
                        {/* Header */}
                        <div className="flex justify-between items-center p-4 border-b">
                            <h3 className="text-lg font-bold text-gray-900">Media Library</h3>
                            <button
                                type="button"
                                onClick={() => setShowGallery(false)}
                                className="text-gray-500 hover:text-gray-700"
                            >
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        {/* Content */}
                        <div className="flex-1 overflow-y-auto p-4">
                            {loadingMedia ? (
                                <div className="flex items-center justify-center h-40">
                                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-amber-500"></div>
                                </div>
                            ) : media.length === 0 ? (
                                <div className="text-center py-12 text-gray-500">
                                    <p>No images uploaded yet.</p>
                                    <p className="text-sm mt-1">Upload your first image to see it here.</p>
                                </div>
                            ) : (
                                <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                                    {media.map((item) => (
                                        <button
                                            key={item.id}
                                            type="button"
                                            onClick={() => selectFromGallery(item.url)}
                                            className={`
                                                relative aspect-square rounded-lg overflow-hidden bg-gray-100
                                                ring-2 transition-all hover:ring-amber-500
                                                ${value === item.url ? 'ring-amber-500' : 'ring-transparent'}
                                            `}
                                        >
                                            <Image
                                                src={item.thumbnailUrl || item.url}
                                                alt={item.filename || 'Image'}
                                                fill
                                                className="object-cover"
                                                unoptimized
                                            />
                                            {value === item.url && (
                                                <div className="absolute inset-0 bg-amber-500/20 flex items-center justify-center">
                                                    <svg className="w-8 h-8 text-amber-600" fill="currentColor" viewBox="0 0 20 20">
                                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                    </svg>
                                                </div>
                                            )}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Footer */}
                        <div className="p-4 border-t bg-gray-50">
                            <p className="text-sm text-gray-500">{media.length} images in library</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
