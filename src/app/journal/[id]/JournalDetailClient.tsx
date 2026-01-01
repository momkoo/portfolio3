'use client';

import Image from 'next/image';
import Link from 'next/link';

// Define type matching Prisma result
type JournalData = {
    id: string;
    title: string;
    excerpt: string;
    imageUrl: string;
    date: string | null;
    content: string;
    tags: string[];
};

export default function JournalDetailClient({ journal }: { journal: JournalData }) {
    // Split content by \n\n if simple storage, or just render as is if formatted?
    // Seed script joined with \n\n. So split it back.
    const paragraphs = journal.content ? journal.content.split('\n\n') : [];

    return (
        <div className="min-h-screen bg-[#fafafa] text-gray-900">
            <article className="max-w-3xl mx-auto px-6 md:px-12 py-32 md:py-40">

                {/* Header */}
                <header className="mb-12 text-center md:text-left">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                        <span className="inline-block px-3 py-1 bg-amber-500 text-white text-xs font-bold uppercase tracking-wider rounded-full self-start">
                            Journal
                        </span>
                        <time className="text-gray-400 font-medium text-sm">{journal.date}</time>
                    </div>
                    <h1 className="text-3xl md:text-5xl font-bold leading-tight mb-8">
                        {journal.title}
                    </h1>
                    <p className="text-xl md:text-2xl text-gray-600 font-medium leading-relaxed">
                        {journal.excerpt}
                    </p>
                </header>

                {/* Featured Image */}
                <div className="relative w-full aspect-[16/9] mb-16 rounded-xl overflow-hidden shadow-sm">
                    <Image
                        src={journal.imageUrl || '/images/placeholder.jpg'}
                        alt={journal.title}
                        fill
                        className="object-cover"
                        priority
                    />
                </div>

                {/* Content Body */}
                <div className="prose prose-lg prose-gray max-w-none">
                    {paragraphs.map((paragraph, index) => (
                        <p key={index} className="mb-6 leading-8 text-gray-700">
                            {paragraph}
                        </p>
                    ))}
                </div>

                {/* Tags */}
                {journal.tags && journal.tags.length > 0 && (
                    <div className="mt-16 pt-8 border-t border-gray-200">
                        <div className="flex flex-wrap gap-2">
                            {journal.tags.map(tag => (
                                <span key={tag} className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-md">
                                    #{tag}
                                </span>
                            ))}
                        </div>
                    </div>
                )}

                {/* Navigation Footer */}
                <div className="mt-20 pt-10 border-t border-gray-200">
                    <Link href="/journal" className="inline-flex items-center text-amber-500 font-bold hover:opacity-80 transition-opacity">
                        ← 저널 목록으로
                    </Link>
                </div>
            </article>
        </div>
    );
}
