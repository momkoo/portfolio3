'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

interface FullscreenMenuProps {
    onClose: () => void;
}

const menuItems = [
    { label: 'WORK', href: '/work' },
    { label: 'ABOUT', href: '/about' },
    { label: 'JOURNAL', href: '/journal' },
    { label: 'LOCATION', href: '/location' },
    { label: 'CONTACT', href: '/contact' },
];

const socialLinks = [
    { label: 'INSTAGRAM', href: '#' },
    { label: 'BEHANCE', href: '#' },
    { label: 'ARTSTATION', href: '#' },
];

export default function FullscreenMenu({ onClose }: FullscreenMenuProps) {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-[2000] bg-black text-white flex flex-col"
        >
            {/* Header in Menu */}
            <div className="relative z-10 flex justify-between items-center px-8 md:px-12 py-8">
                <Link
                    href="/"
                    onClick={onClose}
                    className="relative z-50 block font-[family-name:var(--font-archivo-black)] text-2xl tracking-tighter hover:opacity-70 transition-opacity cursor-pointer"
                >
                    VANTAGE
                </Link>
                <button
                    onClick={onClose}
                    className="relative z-50 text-sm font-[family-name:var(--font-space-mono)] tracking-wider hover:opacity-50 transition-opacity cursor-pointer p-2 -mr-2"
                >
                    CLOSE [X]
                </button>
            </div>

            {/* Main Menu */}
            <div className="flex-1 flex flex-col justify-center px-8 md:px-12">
                <nav className="flex flex-col gap-4">
                    {menuItems.map((item, index) => (
                        <motion.div
                            key={item.label}
                            initial={{ x: -50, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: 0.1 + index * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                            className="group flex items-baseline gap-6 cursor-pointer"
                        >
                            <span className="font-[family-name:var(--font-space-mono)] text-sm md:text-base text-gray-500 group-hover:text-white transition-colors duration-300">
                                0{index + 1}
                            </span>
                            <Link
                                href={item.href}
                                onClick={onClose}
                                className="font-[family-name:var(--font-archivo-black)] text-5xl md:text-7xl lg:text-9xl tracking-tighter text-transparent stroke-text hover:text-white/10 transition-colors duration-300"
                                style={{ WebkitTextStroke: '2px white' }}
                            >
                                <span className="group-hover:text-white transition-colors duration-300">
                                    {item.label}
                                </span>
                            </Link>
                        </motion.div>
                    ))}
                </nav>
            </div>

            {/* Footer in Menu */}
            <div className="px-8 md:px-12 py-8 flex justify-between items-end">
                <div className="flex flex-col gap-1">
                    <span className="font-[family-name:var(--font-space-mono)] text-xs text-gray-500">
                        SEOUL, SOUTH KOREA
                    </span>
                    <span className="font-[family-name:var(--font-space-mono)] text-xs text-gray-500">
                        EST. 2014
                    </span>
                </div>
                <div className="flex gap-6">
                    {socialLinks.map((link) => (
                        <a
                            key={link.label}
                            href={link.href}
                            className="font-[family-name:var(--font-space-mono)] text-sm tracking-wide hover:text-gray-400 transition-colors"
                        >
                            {link.label}
                        </a>
                    ))}
                </div>
            </div>
        </motion.div>
    );
}
