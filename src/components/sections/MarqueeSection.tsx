'use client';

export default function MarqueeSection() {
    const items = ['포토그래피', '비주얼', '아트디렉션', '컨셉', '감성'];

    return (
        <section className="py-8 bg-[#F8F6F3] border-t border-b border-gray-100 overflow-hidden">
            <div className="flex animate-[marquee_40s_linear_infinite]">
                {[0, 1].map((setIndex) => (
                    <div key={setIndex} className="flex items-center gap-12 flex-shrink-0 pr-12">
                        {items.map((item, index) => (
                            <span key={`${setIndex}-${index}`} className="flex items-center gap-12">
                                <span className="text-2xl md:text-3xl font-bold tracking-wide whitespace-nowrap text-gray-800">
                                    {item}
                                </span>
                                <span className="text-2xl md:text-3xl font-bold tracking-wide text-amber-500">
                                    ✦
                                </span>
                            </span>
                        ))}
                    </div>
                ))}
            </div>
        </section>
    );
}
