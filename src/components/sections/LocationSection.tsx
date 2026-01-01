'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export default function LocationSection() {
    return (
        <section id="location" className="py-24 px-6 md:px-12 lg:px-24 bg-gray-50">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

                {/* Text Content */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <span className="text-amber-500 font-bold text-sm tracking-widest uppercase mb-4 block">
                        Location
                    </span>
                    <h2 className="text-4xl md:text-5xl font-black tracking-tighter text-gray-900 mb-8 leading-none">
                        VISIT OUR<br />STUDIO
                    </h2>
                    <p className="text-lg text-gray-600 mb-8 leading-relaxed max-w-md">
                        강남구 선릉로에 위치한 밴티지 스튜디오는<br />
                        당신의 방문을 언제나 환영합니다.
                    </p>

                    <div className="space-y-6 mb-10">
                        <div>
                            <h4 className="font-bold text-gray-900 mb-2">ADDRESS</h4>
                            <p className="text-gray-600">
                                서울특별시 강남구 선릉로 123<br />
                                밴티지 스튜디오 B1
                            </p>
                        </div>
                        <div>
                            <h4 className="font-bold text-gray-900 mb-2">SUBWAY</h4>
                            <p className="text-gray-600">
                                선정릉역 2번 출구 (도보 5분)
                            </p>
                        </div>
                    </div>

                    <Link
                        href="/location"
                        className="inline-flex items-center gap-2 border-b-2 border-gray-900 pb-1 text-sm font-bold tracking-widest hover:text-amber-500 hover:border-amber-500 transition-colors"
                    >
                        VIEW DETAIL MAP
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                    </Link>
                </motion.div>

                {/* Map Image / Visual */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="relative aspect-square md:aspect-[4/3] bg-gray-200 rounded-lg overflow-hidden group"
                >
                    {/* Use a static map image or stylized abstract map */}
                    <img
                        src="https://images.unsplash.com/photo-1524661135-423995f22d0b?w=800&q=80"
                        alt="Studio Map Location"
                        className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                    />
                    <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <span className="bg-white/90 text-gray-900 px-6 py-3 rounded-full font-bold text-sm tracking-widest backdrop-blur-sm">
                            OPEN MAP
                        </span>
                    </div>
                    <Link href="/location" className="absolute inset-0 z-10">
                        <span className="sr-only">View Map</span>
                    </Link>
                </motion.div>

            </div>
        </section>
    );
}
