import Link from 'next/link';

export default function Footer() {
    return (
        <footer className="py-12 px-6 md:px-12 lg:px-12 bg-gray-800">
            <div className="flex flex-col md:flex-row justify-between items-center max-w-7xl mx-auto gap-6">
                <div className="flex flex-col gap-2 text-center md:text-left">
                    <span className="text-xl font-extrabold tracking-widest text-white">
                        VANTAGE
                    </span>
                    <span className="text-sm text-white/60 tracking-wide">
                        감성을 담는 비주얼 아티스트
                    </span>
                </div>

                <nav className="flex flex-wrap justify-center gap-6 text-sm font-medium text-white/70">
                    <Link href="/work" className="hover:text-white transition-colors">WORK</Link>
                    <Link href="/about" className="hover:text-white transition-colors">ABOUT</Link>
                    <Link href="/journal" className="hover:text-white transition-colors">JOURNAL</Link>
                    <Link href="/location" className="hover:text-white transition-colors">LOCATION</Link>
                    <Link href="/contact" className="hover:text-white transition-colors">CONTACT</Link>
                </nav>

                <div className="flex gap-8 text-xs tracking-widest text-white/50">
                    <span>© 2024 VANTAGE STUDIO</span>
                    <span>ALL RIGHTS RESERVED</span>
                </div>
            </div>
        </footer>
    );
}
