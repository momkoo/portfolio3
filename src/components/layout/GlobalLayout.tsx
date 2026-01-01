'use client';

import { usePathname } from 'next/navigation';
import { Header, Footer } from '@/components';

export default function GlobalLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const isAdmin = pathname?.startsWith('/admin');

    if (isAdmin) {
        return <>{children}</>;
    }

    return (
        <>
            <Header />
            <main>{children}</main>
            <Footer />
        </>
    );
}
