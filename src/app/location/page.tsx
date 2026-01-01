'use client';

import { Header, FullscreenMenu, Footer } from '@/components';
import { motion } from 'framer-motion';

export default function LocationPage() {
    return (
        <div className="min-h-screen bg-white text-gray-900">
            {/* Header is global via layout if set, but if this replaces GlobalLayout logic or is standalone... 
                Actually GlobalLayout handles Header. But wait, GlobalLayout renders Header/Main/Footer.
                If I make a new page, it shares layout.tsx which uses GlobalLayout.
                So I don't need to manually import Header/Footer unless I used "use client" and bypassed layout?
                Wait, src/app/layout.tsx wraps everything. So I just need Main content.
                Ah, previous pages like WorkPage were server components returning <main> with <WorkSection>.
                Let's stick to that pattern if possible, or use a simple client component here if animations needed.
                Let's make this page.tsx return standard main content.
            */}

            <main className="pt-32 pb-20 px-6 md:px-12 max-w-7xl mx-auto">
                {/* Hero / Title */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="mb-20 md:mb-32"
                >
                    <span className="text-amber-500 font-bold text-sm tracking-widest uppercase mb-4 block">
                        Visit Us
                    </span>
                    <h1 className="text-5xl md:text-8xl font-black tracking-tighter mb-8 leading-none">
                        LOCATION
                    </h1>
                    <p className="text-xl md:text-2xl font-medium text-gray-600 max-w-2xl leading-relaxed">
                        서울의 중심에서 당신의 이야기를 기다립니다.<br />
                        언제든 편하게 방문해주세요.
                    </p>
                </motion.div>

                {/* Content Grid */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-20">

                    {/* Info Column */}
                    <div className="md:col-span-4 space-y-12">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2, duration: 0.6 }}
                        >
                            <h3 className="font-bold text-gray-900 uppercase tracking-widest mb-4 text-sm">Address</h3>
                            <p className="text-lg md:text-xl font-medium text-gray-600 leading-relaxed">
                                서울특별시 강남구 선릉로 123<br />
                                밴티지 스튜디오 B1
                            </p>
                            <p className="text-sm text-gray-400 mt-2">
                                B1, 123 Seolleung-ro, Gangnam-gu, Seoul
                            </p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.3, duration: 0.6 }}
                        >
                            <h3 className="font-bold text-gray-900 uppercase tracking-widest mb-4 text-sm">Contact</h3>
                            <p className="text-lg font-medium text-gray-600">
                                <a href="mailto:hello@vantage.kr" className="hover:text-amber-500 transition-colors">hello@vantage.kr</a><br />
                                <a href="tel:02-1234-5678" className="hover:text-amber-500 transition-colors">02-1234-5678</a>
                            </p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.4, duration: 0.6 }}
                        >
                            <h3 className="font-bold text-gray-900 uppercase tracking-widest mb-4 text-sm">Transport</h3>
                            <ul className="space-y-4 text-gray-600 font-medium">
                                <li className="flex items-start gap-3">
                                    <span className="shrink-0 bg-green-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded">2호선</span>
                                    <span>삼성역 5번 출구 도보 10분</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="shrink-0 bg-amber-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded">9호선</span>
                                    <span>선정릉역 2번 출구 도보 15분</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="shrink-0 bg-gray-800 text-white text-[10px] font-bold px-1.5 py-0.5 rounded">주차</span>
                                    <span>건물 내 발렛파킹 가능</span>
                                </li>
                            </ul>
                        </motion.div>
                    </div>

                    {/* Map Column */}
                    <motion.div
                        className="md:col-span-8 h-[400px] md:h-[600px] bg-gray-100 rounded-lg overflow-hidden relative"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.4, duration: 0.8 }}
                    >
                        {/* Placeholder for actual map or iframe */}
                        <div className="absolute inset-0 flex items-center justify-center bg-gray-200">
                            {/* Typically verify URL or use generic iframe if possible, e.g. Google Maps Embed */}
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3164.847253874369!2d127.0427903153102!3d37.51082997980845!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x357ca40bf4a641d9%3A0x66f64360e224e757!2sGangnam-gu%2C%20Seoul!5e0!3m2!1sen!2skr!4v1625641234567!5m2!1sen!2skr"
                                width="100%"
                                height="100%"
                                style={{ border: 0 }}
                                allowFullScreen
                                loading="lazy"
                                className="grayscale contrast-125 opacity-80 hover:grayscale-0 hover:opacity-100 transition-all duration-500"
                            ></iframe>
                        </div>
                    </motion.div>
                </div>
            </main>
        </div>
    );
}
