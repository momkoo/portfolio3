'use client';

export default function ContactSection() {
    return (
        <section id="contact" className="py-24 px-6 md:px-12 lg:px-24 bg-white border-t border-gray-100">
            <div className="flex flex-col items-center text-center gap-12">
                <div className="flex flex-col items-center">
                    <span className="text-sm font-bold text-amber-500 mb-6 block">04</span>
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-black leading-[1.1] text-gray-900 mb-8">
                        <span className="block">함께</span>
                        <span className="block text-amber-500">특별한</span>
                        <span className="block">이야기를</span>
                        <span className="block text-amber-500">만들까요</span>
                    </h2>
                    <p className="text-gray-500 text-lg mb-10 max-w-xl mx-auto">작업 의뢰, 협업 제안, 또는 간단한 인사가 궁금하시다면<br className="hidden md:block" /> 언제든지 편하게 연락주세요.</p>
                    <a href="mailto:hello@vantage.kr" className="text-2xl md:text-4xl font-bold text-gray-900 hover:text-amber-500 transition-colors underline decoration-2 decoration-gray-300 hover:decoration-amber-500 underline-offset-8">
                        HELLO@VANTAGE.KR
                    </a>
                </div>

                <div className="flex flex-wrap justify-center gap-6 md:gap-8 mt-4">
                    <a href="https://instagram.com/vantage_studio" target="_blank" rel="noopener noreferrer" className="text-lg font-medium text-gray-600 hover:text-amber-500 transition-colors">인스타그램</a>
                    <a href="https://behance.net/vantage_studio" target="_blank" rel="noopener noreferrer" className="text-lg font-medium text-gray-600 hover:text-amber-500 transition-colors">비헨스</a>
                    <a href="https://artstation.com/vantage_studio" target="_blank" rel="noopener noreferrer" className="text-lg font-medium text-gray-600 hover:text-amber-500 transition-colors">아트스테이션</a>
                    <a href="https://linkedin.com/in/vantage-studio" target="_blank" rel="noopener noreferrer" className="text-lg font-medium text-gray-600 hover:text-amber-500 transition-colors">링크드인</a>
                </div>
            </div>
        </section>
    );
}
