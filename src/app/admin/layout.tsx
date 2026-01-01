'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { signOut } from 'next-auth/react';

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();

    const navigation = [
        { name: 'Dashboard', href: '/admin' },
        { name: 'Projects', href: '/admin/projects' },
        { name: 'Journals', href: '/admin/journals' },
        { name: 'Settings', href: '/admin/settings' },
    ];

    // Login page should not use this layout's UI elements (optional, but handled by Next.js layout nesting usually. 
    // If login is under /admin/login, it inherits this. We might want to exclude sidebar for login.)
    const isLoginPage = pathname === '/admin/login';

    if (isLoginPage) {
        return <>{children}</>;
    }

    return (
        <div className="min-h-screen bg-gray-100 flex">
            {/* Sidebar */}
            <aside className="w-64 bg-white shadow-md flex-shrink-0 hidden md:flex md:flex-col">
                <div className="p-6 border-b">
                    <h1 className="text-2xl font-bold text-gray-900 font-[family-name:var(--font-archivo-black)]">
                        VANTAGE
                    </h1>
                    <span className="text-xs text-gray-500 uppercase tracking-wider">Admin Portal</span>
                </div>
                <nav className="flex-1 p-4 space-y-1">
                    {navigation.map((item) => {
                        const isActive = pathname === item.href;
                        return (
                            <Link
                                key={item.name}
                                href={item.href}
                                className={`flex items-center px-4 py-3 text-sm font-medium rounded-md transition-colors ${isActive
                                        ? 'bg-amber-50 text-amber-600'
                                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                                    }`}
                            >
                                {item.name}
                            </Link>
                        );
                    })}
                </nav>
                <div className="p-4 border-t">
                    <button
                        onClick={() => signOut({ callbackUrl: '/' })}
                        className="w-full flex items-center justify-center px-4 py-2 text-sm font-medium text-red-600 bg-red-50 rounded-md hover:bg-red-100 transition-colors"
                    >
                        Sign Out
                    </button>
                </div>
            </aside>

            {/* Mobile Header (visible only on small screens) */}
            <div className="md:hidden fixed top-0 w-full bg-white z-10 border-b px-4 py-3 flex justify-between items-center">
                <span className="font-bold">VANTAGE Admin</span>
                {/* Mobile menu toggle could go here, for now simple layout */}
            </div>

            {/* Main Content */}
            <main className="flex-1 overflow-auto p-4 md:p-8 pt-16 md:pt-8">
                {children}
            </main>
        </div>
    );
}
