'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';

export default function AboutSection() {
    return (
        <section id="about" className="py-20 md:py-28 lg:py-32 px-6 md:px-12 lg:px-12 bg-[#F8F6F3]">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-center max-w-7xl mx-auto">
                {/* Image */}
                <motion.div
                    className="relative"
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                >
                    <div className="relative overflow-hidden rounded-2xl shadow-xl max-w-md mx-auto lg:max-w-none">
                        <Image
                            src="https://images.unsplash.com/photo-1542038784456-1ea8e935640e?w=600"
                            alt="포토그래퍼 프로필"
                            width={600}
                            height={800}
                            className="w-full aspect-[3/4] object-cover hover:scale-[1.03] transition-transform duration-600"
                        />
                        <div className="absolute inset-0 bg-gradient-to-br from-amber-500/15 to-transparent pointer-events-none rounded-2xl" />
                    </div>
                    {/* Experience Badge */}
                    <div className="absolute -bottom-5 -right-5 lg:right-0 bg-amber-500 py-6 px-8 rounded-xl shadow-lg text-center">
                        <span className="block text-4xl font-extrabold text-white leading-none">10+</span>
                        <span className="block text-sm font-medium text-white/90 mt-1.5 tracking-wide">Years</span>
                    </div>
                </motion.div>

                {/* Content */}
                <motion.div
                    className="py-5"
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    viewport={{ once: true }}
                >
                    <span className="text-sm font-bold text-amber-500">02</span>
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight text-gray-800 mt-4 mb-3">
                        Philosophy<br />& Vision
                    </h2>
                    <p className="text-lg text-gray-500 mb-8">철학과 시선</p>

                    <p className="text-xl font-semibold leading-relaxed text-gray-800 mb-6">
                        피사체의 본질을 탐구하고,<br />
                        찰나의 순간에서 영원을 발견합니다.
                    </p>

                    <p className="text-base leading-relaxed text-gray-500 mb-5">
                        10년의 시간 동안 패션, 커머셜, 파인 아트를 넘나들며 '이미지가 품은 이야기'를
                        탐구해 왔습니다. 렌즈 앞에 선 사람과 공간이 지닌 고유한 결, 그리고 빛이
                        만들어내는 미묘한 감정의 층위를 프레임 안에 담습니다.
                    </p>

                    <p className="text-base leading-relaxed text-gray-500">
                        단순한 기록을 넘어, 보는 이의 마음에 오래 머무는 시각적 서사를
                        만들어가는 것이 저의 작업 철학입니다.
                    </p>

                    {/* Stats */}
                    <div className="flex gap-12 mt-12 pt-10 border-t border-gray-200">
                        {[
                            { number: '150+', label: 'Projects' },
                            { number: '50+', label: 'Brands' },
                            { number: '12', label: 'Awards' },
                        ].map((stat) => (
                            <div key={stat.label} className="flex flex-col">
                                <span className="text-4xl font-extrabold text-amber-500 leading-none">
                                    {stat.number}
                                </span>
                                <span className="text-xs font-medium tracking-wide text-gray-500 mt-2.5">
                                    {stat.label}
                                </span>
                            </div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
