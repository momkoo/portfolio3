'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Loader() {
    const [isLoading, setIsLoading] = useState(true);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        // Simulate loading progress
        const timer1 = setTimeout(() => setProgress(100), 600);
        const timer2 = setTimeout(() => setIsLoading(false), 1800);

        return () => {
            clearTimeout(timer1);
            clearTimeout(timer2);
        };
    }, []);

    return (
        <AnimatePresence>
            {isLoading && (
                <motion.div
                    className="loader"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <div className="loader-line">
                        <motion.div
                            className="loader-progress"
                            initial={{ width: '0%' }}
                            animate={{ width: `${progress}%` }}
                            transition={{ duration: 1, ease: [0.4, 0, 0.2, 1] }}
                        />
                    </div>
                    <motion.span
                        className="loader-text"
                        animate={{ opacity: [1, 0.5, 1] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                    >
                        VANTAGE
                    </motion.span>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
