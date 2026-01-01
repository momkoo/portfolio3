export interface Journal {
    id: string;
    title: string;
    excerpt: string;
    image: string;
    date: string;
    content?: string[];
    tags?: string[];
}

export const journals: Journal[] = [
    {
        id: '1',
        title: '포토그래피 조명의 예술',
        excerpt: '평범한 장면을 특별하게 만드는 조명 기법의 모든 것. 자연광부터 스튜디오 조명까지 상세히 다루어봅니다.',
        image: 'https://images.unsplash.com/photo-1552168324-d612d77725e3?w=600',
        date: '2024. 12. 15',
        content: [
            '빛은 사진의 언어입니다. 우리가 대상을 어떻게 바라보고 느끼는지 결정하는 핵심 요소이죠.',
            '이번 글에서는 자연광을 최대한 활용하는 방법과 스튜디오 조명을 통해 드라마틱한 분위기를 연출하는 테크닉을 소개합니다.',
            '특히 흐린 날의 부드러운 확산광을 활용한 인물 촬영 팁과, 강한 대비를 이용한 흑백 사진 조명법에 대해 깊이 있게 다뤄보겠습니다.'
        ],
        tags: ['Lighting', 'Tutorial', 'Tips']
    },
    {
        id: '2',
        title: '감성 사진의 비밀',
        excerpt: '사진에 감정을 담는 방법. 톤, 구도, 그리고 이야기와 연결되는 연출의 기술에 대해 탐구합니다.',
        image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=600',
        date: '2024. 11. 28',
        content: [
            '기술적으로 완벽한 사진이 반드시 감동을 주는 것은 아닙니다. 감동은 이야기에서 나옵니다.',
            '사진 한 장에 서사를 담기 위해서는 구도와 색감, 그리고 피사체와의 교감이 필수적입니다.',
            '제가 평소 영감을 얻는 영화나 음악, 그리고 일상의 순간들에서 어떻게 감성을 포착하여 이미지로 시각화하는지 저만의 프로세스를 공유합니다.'
        ],
        tags: ['Inspiration', 'Process', 'Emotion']
    },
    {
        id: '3',
        title: '나의 필수 장비',
        excerpt: '10년간 사용하며 검증한 카메라, 렌즈, 악세서리 추천. 작가의 시선을 완성하는 도구들을 소개합니다.',
        image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=600',
        date: '2024. 11. 10',
        content: [
            '도구는 작가의 손과 발이 되어줍니다. 믿음직한 장비는 현장에서의 집중력을 높여주죠.',
            '지난 10년간 다양한 카메라와 렌즈를 거치며 최종적으로 제 가방에 남은 "Must-Have" 아이템들을 소개합니다.',
            '상업 촬영을 위한 고화소 바디부터, 일상 기록을 위한 컴팩트 카메라, 그리고 분위기를 결정짓는 필터까지 상세한 리뷰를 담았습니다.'
        ],
        tags: ['Gear', 'Review', 'Camera']
    },
];
