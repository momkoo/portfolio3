'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import FullscreenMenu from './FullscreenMenu';

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <>
            <header
                className={`fixed top-0 left-0 w-full flex justify-between items-center z-[100] px-8 md:px-12 py-8 transition-all duration-300 ${isScrolled ? 'mix-blend-difference text-white' : ''}`}
            >
                <Link
                    href="/"
                    onClick={(e) => {
                        if (window.location.pathname === '/') {
                            e.preventDefault();
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                        }
                    }}
                    className="font-[family-name:var(--font-archivo-black)] text-2xl tracking-tighter z-[100] cursor-pointer"
                >
                    VANTAGE
                </Link>

                <button
                    onClick={() => setIsMenuOpen(true)}
                    className="group flex flex-col justify-center gap-1.5 w-8 h-8 z-[100] cursor-pointer"
                >
                    <span className="w-full h-[2px] bg-current transform transition-transform group-hover:scale-x-75 origin-right duration-300" />
                    <span className="w-full h-[2px] bg-current transform transition-transform group-hover:scale-x-100 duration-300" />
                    <span className="w-full h-[2px] bg-current transform transition-transform group-hover:scale-x-50 origin-right duration-300" />
                </button>
            </header>

            <AnimatePresence>
                {isMenuOpen && <FullscreenMenu onClose={() => setIsMenuOpen(false)} />}
            </AnimatePresence>
        </>
    );
}
