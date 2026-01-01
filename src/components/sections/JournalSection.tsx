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
    tags: string[];
};

interface JournalSectionProps {
    journals: JournalData[];
}

export default function JournalSection({ journals }: JournalSectionProps) {
    return (
        <section id="journal" className="py-24 px-6 md:px-12 lg:px-24 bg-gray-50">
            <div className="flex flex-col mb-16">
                <span className="text-sm font-bold text-amber-500 mb-4 block">03</span>
                <h2 className="text-4xl md:text-5xl font-bold leading-tight text-gray-900">
                    저널
                </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {journals.map((journal) => (
                    <Link href={`/journal/${journal.id}`} key={journal.id} className="block">
                        <article className="bg-white group cursor-pointer hover:-translate-y-2 transition-transform duration-300 rounded-lg overflow-hidden shadow-sm hover:shadow-lg h-full">
                            {/* Image container setup for proper filling */}
                            <div className="relative aspect-[4/3] overflow-hidden bg-gray-200">
                                <Image
                                    src={journal.imageUrl || '/images/placeholder.jpg'}
                                    alt={journal.title}
                                    fill
                                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                />
                            </div>
                            <div className="p-8 border-t-0">
                                <span className="text-xs text-amber-500 font-medium mb-2 block">{journal.date}</span>
                                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-amber-500 transition-colors">
                                    {journal.title}
                                </h3>
                                <p className="text-sm text-gray-600 leading-relaxed mb-6 line-clamp-2">
                                    {journal.excerpt}
                                </p>
                                <div className="inline-flex items-center text-sm font-bold text-gray-900 group-hover:text-amber-500 transition-colors">
                                    더 보기 <span className="ml-1 group-hover:translate-x-1 transition-transform">→</span>
                                </div>
                            </div>
                        </article>
                    </Link>
                ))}
            </div>
        </section>
    );
}
