'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

// Define a type that matches the Prisma query result including relations
type ProjectWithCategory = {
    id: string;
    title: string;
    year: string;
    mainImage: string | null;
    category: {
        name: string;
        nameKr: string;
    } | null;
    order: number;
};

interface WorkSectionProps {
    projects: ProjectWithCategory[];
}

const categories = [
    { id: 'all', name: '전체' },
    { id: 'editorial', name: '에디토리얼' },
    { id: 'portrait', name: '포트레이트' },
    { id: 'commercial', name: '커머셜' },
    { id: 'art', name: '아트' },
];

export default function WorkSection({ projects }: WorkSectionProps) {
    const [activeFilter, setActiveFilter] = useState('all');

    const filteredProjects = activeFilter === 'all'
        ? projects
        : projects.filter((p) => p.category?.name === activeFilter);

    return (
        <section id="work" className="py-24 px-6 md:px-12 lg:px-24 bg-white">
            {/* Header matching index.html layout */}
            <div className="flex flex-col mb-16">
                <span className="text-sm font-bold text-amber-500 mb-4 block">01</span>
                <h2 className="text-4xl md:text-5xl font-bold leading-tight text-gray-900">
                    선택된<br />작업물
                </h2>
            </div>

            {/* Filter Buttons */}
            <div className="flex flex-wrap gap-4 mb-16">
                {categories.map((cat) => (
                    <button
                        key={cat.id}
                        onClick={() => setActiveFilter(cat.id)}
                        className={`px-6 py-2 rounded-full text-sm font-medium transition-colors duration-300
                            ${activeFilter === cat.id
                                ? 'bg-amber-500 text-white'
                                : 'bg-transparent border border-gray-300 text-gray-600 hover:border-amber-500 hover:text-amber-500'
                            }`}
                    >
                        {cat.name}
                    </button>
                ))}
            </div>

            {/* Gallery Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-16">
                <AnimatePresence mode="popLayout">
                    {filteredProjects.map((project) => (
                        <motion.article
                            key={project.id}
                            layout
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.4 }}
                            className="group"
                        >
                            <Link href={`/work/${project.id}`} className="block">
                                <div className="relative overflow-hidden aspect-[4/3] bg-gray-100 mb-6 rounded-lg">
                                    <Image
                                        src={project.mainImage || '/images/placeholder.jpg'}
                                        alt={project.title}
                                        fill
                                        sizes="(max-width: 768px) 100vw, 50vw"
                                        className="object-cover transition-transform duration-700 group-hover:scale-105 group-hover:brightness-110"
                                    />
                                    {/* View Project Button Effect - Matched to styles.css .view-project and .project-overlay */}
                                    <div className="absolute inset-0 bg-amber-500/0 flex items-center justify-center transition-colors duration-400 group-hover:bg-amber-500/15">
                                        <div className="view-project px-8 py-3 bg-amber-500 text-white text-sm font-bold tracking-widest rounded-full opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-400 shadow-xl hover:bg-[#C9922E]">
                                            작업물 보기
                                        </div>
                                    </div>
                                </div>
                                <div className="flex justify-between items-end border-b border-gray-200 pb-4 group-hover:border-amber-500 transition-colors duration-300">
                                    <div>
                                        <span className="text-amber-500 text-sm font-medium mb-1 block">{project.year}</span>
                                        <h3 className="text-xl font-bold text-gray-900 group-hover:text-amber-500 transition-colors">{project.title}</h3>
                                    </div>
                                    <span className="text-sm text-gray-500 group-hover:text-gray-900 transition-colors">
                                        {project.category?.nameKr || 'Uncategorized'}
                                    </span>
                                </div>
                            </Link>
                        </motion.article>
                    ))}
                </AnimatePresence>
            </div>

            <div className="mt-20 text-center">
                <Link href="/work" className="inline-flex items-center gap-2 text-sm font-bold text-gray-900 hover:text-amber-500 transition-colors group">
                    모든 작업물 보기 <span className="group-hover:translate-x-1 transition-transform">→</span>
                </Link>
            </div>
        </section>
    );
}
