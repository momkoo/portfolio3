'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

// Define type matching Prisma result (Project + Category + Images)
type ProjectData = {
    id: string;
    title: string;
    year: string;
    description: string | null;
    mainImage: string | null;
    client: string | null;
    service: string | null;
    images: { url: string }[];
    category: {
        name: string;
        nameKr: string;
    };
};

export default function WorkDetailClient({ project }: { project: ProjectData }) {
    // Service string to array if needed, or just display string
    const serviceList = project.service ? project.service.split(', ') : [];

    return (
        <div className="min-h-screen bg-white text-gray-900">
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6 }}
            >
                {/* Hero Image */}
                <div className="relative w-full h-[60vh] md:h-[80vh] bg-gray-100">
                    <Image
                        src={project.mainImage || '/images/placeholder.jpg'}
                        alt={project.title}
                        fill
                        className="object-cover"
                        priority
                    />
                </div>

                {/* Content */}
                <div className="max-w-5xl mx-auto px-6 md:px-12 py-20">
                    {/* Header Info */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-20 border-b border-gray-100 pb-20">
                        <div className="md:col-span-2">
                            <span className="text-amber-500 font-bold text-sm tracking-widest uppercase mb-4 block">
                                {project.year} • {project.category.name.toUpperCase()}
                            </span>
                            <h1 className="text-4xl md:text-6xl font-black leading-tight mb-8">
                                {project.title}
                            </h1>
                            <p className="text-xl md:text-2xl font-medium leading-relaxed text-gray-700">
                                {project.description}
                            </p>
                        </div>
                        <div className="space-y-8 text-sm">
                            {project.client && (
                                <div>
                                    <h3 className="font-bold text-gray-400 uppercase tracking-widest mb-2">Client</h3>
                                    <p className="font-medium text-lg">{project.client}</p>
                                </div>
                            )}
                            {serviceList.length > 0 && (
                                <div>
                                    <h3 className="font-bold text-gray-400 uppercase tracking-widest mb-2">Services</h3>
                                    <ul className="font-medium text-lg leading-relaxed">
                                        {serviceList.map(service => (
                                            <li key={service}>{service}</li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Additional Images */}
                    {project.images && project.images.length > 0 && (
                        <div className="space-y-8 md:space-y-16">
                            {project.images.map((img, idx) => (
                                <div key={idx} className="relative w-full aspect-[16/9] md:last:aspect-[21/9] bg-gray-50 rounded-sm overflow-hidden">
                                    <Image
                                        src={img.url}
                                        alt={`${project.title} detail ${idx + 1}`}
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Navigation Footer */}
                <div className="border-t border-gray-100 py-20 text-center">
                    <Link href="/work" className="inline-block text-lg font-bold hover:text-amber-500 transition-colors">
                        ← 목록으로 돌아가기
                    </Link>
                </div>

            </motion.div>
        </div>
    );
}
