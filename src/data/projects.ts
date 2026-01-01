export interface Project {
    id: string;
    title: string;
    category: string;
    year: string;
    image: string;
    client?: string;
    description?: string;
    services?: string[];
    images?: string[];
}

export const projects: Project[] = [
    {
        id: '1',
        title: '보그 코리아',
        category: 'editorial',
        year: '2024',
        image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800',
        client: 'Vogue Korea',
        description: '강렬한 색감과 조명을 활용하여 현대적인 패션 감각을 재해석한 에디토리얼 촬영입니다.',
        services: ['Photography', 'Art Direction', 'Retouching'],
        images: [
            'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=1200',
            'https://images.unsplash.com/photo-1502163140606-888448ae8cfe?w=1200',
            'https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=1200'
        ]
    },
    {
        id: '2',
        title: '누아르 시리즈',
        category: 'portrait',
        year: '2024',
        image: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=800',
        client: 'Personal Work',
        description: '깊은 그림자와 인물의 내면을 탐구하는 흑백/컬러 누아르 컨셉의 포트레이트 시리즈입니다.',
        services: ['Photography', 'Lighting Design'],
        images: [
            'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=1200',
            'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=1200'
        ]
    },
    {
        id: '3',
        title: '럭스 브랜드 캠페인',
        category: 'commercial',
        year: '2023',
        image: 'https://images.unsplash.com/photo-1500917293891-ef795e70e1f6?w=800',
        client: 'Luxe Brand',
        description: '하이엔드 라이프스타일을 제안하는 브랜드 캠페인 화보입니다.',
        services: ['Commercial Photography', 'Set Styling'],
        images: [
            'https://images.unsplash.com/photo-1500917293891-ef795e70e1f6?w=1200',
            'https://images.unsplash.com/photo-1617922001439-4a2e6562f328?w=1200'
        ]
    },
    {
        id: '4',
        title: '인체 시리즈',
        category: 'art',
        year: '2023',
        image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=800',
        client: 'Exhibition',
        description: '인체의 곡선과 움직임을 추상적으로 표현한 예술 사진 프로젝트입니다.',
        services: ['Fine Art Photography'],
        images: [
            'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=1200',
            'https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=1200'
        ]
    },
    {
        id: '5',
        title: '매스퀴진',
        category: 'portrait',
        year: '2023',
        image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800',
        client: 'Mass Cuisine',
        description: '셰프의 열정과 요리의 생동감을 담아낸 퀴진 포트레이트입니다.',
        services: ['Portrait Photography'],
        images: [
            'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1200'
        ]
    },
    {
        id: '6',
        title: '스트리트 패션',
        category: 'editorial',
        year: '2023',
        image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800',
        client: 'Street Mag',
        description: '도시의 활기와 패션을 결합한 스트리트 스타일 에디토리얼입니다.',
        services: ['Fashion Photography'],
        images: [
            'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1200'
        ]
    },
    {
        id: '7',
        title: '화장품 브랜드',
        category: 'commercial',
        year: '2023',
        image: 'https://images.unsplash.com/photo-1617922001439-4a2e6562f328?w=800',
        client: 'Cosmetic Co.',
        description: '제품의 텍스처와 컬러감을 강조한 뷰티 커머셜 촬영입니다.',
        services: ['Product Photography', 'Retouching'],
        images: [
            'https://images.unsplash.com/photo-1617922001439-4a2e6562f328?w=1200'
        ]
    },
    {
        id: '8',
        title: '추상적 상상',
        category: 'art',
        year: '2022',
        image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800',
        client: 'Gallery Exhibition',
        description: '일상의 사물을 낯선 시각으로 포착한 추상 사진 시리즈입니다.',
        services: ['Fine Art Photography'],
        images: [
            'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200'
        ]
    },
];

export const categoryLabels: Record<string, string> = {
    editorial: '에디토리얼',
    portrait: '포트레이트',
    commercial: '커머셜',
    art: '아트',
};
