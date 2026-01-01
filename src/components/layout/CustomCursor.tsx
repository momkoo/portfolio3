'use client';

import { useEffect, useState } from 'react';

export default function CustomCursor() {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
    const [followerPosition, setFollowerPosition] = useState({ x: 0, y: 0 });
    const [isActive, setIsActive] = useState(false);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Only show on desktop
        if (window.innerWidth <= 768) return;

        setIsVisible(true);

        const handleMouseMove = (e: MouseEvent) => {
            setMousePosition({ x: e.clientX, y: e.clientY });
        };

        const handleMouseEnter = () => setIsActive(true);
        const handleMouseLeave = () => setIsActive(false);

        document.addEventListener('mousemove', handleMouseMove);

        // Add hover effects to interactive elements
        const interactiveElements = document.querySelectorAll(
            'a, button, [role="button"], .project-card, .journal-card'
        );

        interactiveElements.forEach((el) => {
            el.addEventListener('mouseenter', handleMouseEnter);
            el.addEventListener('mouseleave', handleMouseLeave);
        });

        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            interactiveElements.forEach((el) => {
                el.removeEventListener('mouseenter', handleMouseEnter);
                el.removeEventListener('mouseleave', handleMouseLeave);
            });
        };
    }, []);

    // Smooth cursor animation
    useEffect(() => {
        const animateCursor = () => {
            setCursorPosition((prev) => ({
                x: prev.x + (mousePosition.x - prev.x) * 0.15,
                y: prev.y + (mousePosition.y - prev.y) * 0.15,
            }));
            setFollowerPosition((prev) => ({
                x: prev.x + (mousePosition.x - prev.x) * 0.08,
                y: prev.y + (mousePosition.y - prev.y) * 0.08,
            }));
        };

        const animationId = requestAnimationFrame(function animate() {
            animateCursor();
            requestAnimationFrame(animate);
        });

        return () => cancelAnimationFrame(animationId);
    }, [mousePosition]);

    if (!isVisible) return null;

    return (
        <>
            <div
                className={`cursor ${isActive ? 'active' : ''}`}
                style={{
                    left: `${cursorPosition.x}px`,
                    top: `${cursorPosition.y}px`,
                }}
            />
            <div
                className={`cursor-follower ${isActive ? 'active' : ''}`}
                style={{
                    left: `${followerPosition.x}px`,
                    top: `${followerPosition.y}px`,
                }}
            />
        </>
    );
}
