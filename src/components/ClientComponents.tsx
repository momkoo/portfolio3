'use client';

import dynamic from 'next/dynamic';

// 클라이언트에서만 렌더링되는 컴포넌트
const Loader = dynamic(() => import('@/components/shared/Loader'), { ssr: false });
const CustomCursor = dynamic(() => import('@/components/layout/CustomCursor'), { ssr: false });

export default function ClientComponents() {
    return (
        <>
            <Loader />
            <CustomCursor />
        </>
    );
}
