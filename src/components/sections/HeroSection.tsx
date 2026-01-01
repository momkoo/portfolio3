'use client';

import { motion } from 'framer-motion';

export default function HeroSection() {
    return (
        <section className="h-screen w-full relative flex items-center justify-center overflow-hidden bg-[#0a0a0a] text-white">
            {/* Background Video/Image */}
            <div className="absolute inset-0 z-0">
                <video
                    className="w-full h-full object-cover opacity-60"
                    autoPlay
                    muted
                    loop
                    playsInline
                    poster="https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=1920"
                >
                    <source
                        src="https://assets.mixkit.co/videos/preview/mixkit-stars-in-space-background-1610-large.mp4"
                        type="video/mp4"
                    />
                </video>
                {/* Foggy Overlay matching reference */}
                <div className="absolute inset-0 bg-white/20 mix-blend-overlay" />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/10 to-white/30" />
            </div>

            {/* Main Content Container - Flex Col Center */}
            <div className="relative z-10 flex flex-col items-center justify-center text-center px-4">

                {/* Subtitle */}
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="text-[#E6A745] text-sm md:text-base font-semibold tracking-[0.3em] uppercase mb-6"
                >
                    Visual Artist & Photographer
                </motion.p>

                {/* Main Title Group */}
                <div className="flex flex-col items-center gap-0">
                    {/* Outline Text */}
                    <motion.h1
                        initial={{ y: 30, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        className="text-[10vw] md:text-[7vw] font-black leading-none tracking-tighter stroke-text text-transparent"
                        style={{ WebkitTextStroke: '1px rgba(255,255,255,0.9)' }}
                    >
                        감성을
                    </motion.h1>

                    {/* Outline Text */}
                    <motion.h1
                        initial={{ y: 30, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
                        className="text-[10vw] md:text-[7vw] font-black leading-none tracking-tighter stroke-text text-transparent -mt-[1vw]"
                        style={{ WebkitTextStroke: '1px rgba(255,255,255,0.9)' }}
                    >
                        담는
                    </motion.h1>

                    {/* Solid Accent Text */}
                    <motion.h1
                        initial={{ y: 30, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
                        className="text-[10vw] md:text-[7vw] font-black leading-none tracking-tighter text-[#E6A745] -mt-[1vw] italic"
                    >
                        순간들
                    </motion.h1>
                </div>

                {/* Info Line */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1, duration: 1 }}
                    className="mt-10 flex items-center gap-3 text-sm md:text-base font-light text-gray-300"
                >
                    <span>서울 기반</span>
                    <span className="w-1 h-1 bg-[#E6A745] rounded-full"></span>
                    <span>포트폴리오 2024</span>
                </motion.div>

            </div>

            {/* Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5, duration: 1 }}
                className="absolute bottom-10 left-10 hidden md:flex items-center gap-3"
            >
                <span className="text-xs tracking-[0.2em] text-white/50 vertical-rl rotate-180" style={{ writingMode: 'vertical-rl' }}>SCROLL</span>
                <div className="h-10 w-[1px] bg-white/20 relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-[50%] bg-[#E6A745] animate-scroll-line"></div>
                </div>
            </motion.div>

            <style jsx>{`
        @keyframes scroll-line {
            0% { transform: translateY(-100%); }
            100% { transform: translateY(200%); }
        }
        .animate-scroll-line {
            animation: scroll-line 2s cubic-bezier(0.77, 0, 0.175, 1) infinite;
        }
      `}</style>
        </section>
    );
}
