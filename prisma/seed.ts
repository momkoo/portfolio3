import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const projects = [
    {
        id: '1',
        title: '보그 코리아',
        titleKr: '보그 코리아',
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
        titleKr: '누아르 시리즈',
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
        titleKr: '럭스 브랜드 캠페인',
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
        titleKr: '인체 시리즈',
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
        titleKr: '매스퀴진',
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
        titleKr: '스트리트 패션',
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
        titleKr: '화장품 브랜드',
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
        titleKr: '추상적 상상',
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

const journals = [
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

const categoryData = [
    { name: 'editorial', nameKr: '에디토리얼' },
    { name: 'portrait', nameKr: '포트레이트' },
    { name: 'commercial', nameKr: '커머셜' },
    { name: 'art', nameKr: '아트' },
];

async function main() {
    console.log('🌱 Starting seed...');

    // 1. Categories
    for (const cat of categoryData) {
        await prisma.category.upsert({
            where: { name: cat.name },
            update: { nameKr: cat.nameKr },
            create: { name: cat.name, nameKr: cat.nameKr },
        });
    }
    console.log('✅ Categories seeded');

    // 2. Projects
    for (const project of projects) {
        // Find category ID
        const category = await prisma.category.findUnique({
            where: { name: project.category }
        });

        if (!category) {
            console.error(`Category ${project.category} not found for project ${project.title}`);
            continue;
        }

        await prisma.project.upsert({
            where: { id: project.id }, // Using manual string ID for simple migration (schema defines CUID but manual is OK for seeding if it doesn't conflict)
            // Actually, schema expects CUID default. Providing numeric string ID is fine as long as uniqueness holds.
            update: {
                title: project.title,
                titleKr: project.titleKr,
                year: project.year,
                client: project.client || '',
                service: project.services ? project.services.join(', ') : '',
                description: project.description || '',
                mainImage: project.image,
                categoryId: category.id,
                // Handle project images in nested create/update is complex with upsert on separate model,
                // but we can delete existing and re-create for simplicity or just create if create.
            },
            create: {
                // id: project.id, // Let Prisma generate CUID to avoid future collision mixing?
                // No, to keep links predictable for this migration, let's keep keys if possible OR map them.
                // But schema says @default(cuid()). If we force a value, it works.
                // Let's force value to match current static data for simplicity.
                title: project.title,
                titleKr: project.titleKr,
                year: project.year,
                client: project.client || '',
                service: project.services ? project.services.join(', ') : '',
                description: project.description || '',
                mainImage: project.image,
                categoryId: category.id,
                images: {
                    create: project.images ? project.images.map(url => ({ url })) : []
                }
            },
        });
    }
    console.log('✅ Projects seeded');

    // 3. Journals
    for (const journal of journals) {
        await prisma.journal.upsert({
            where: { id: journal.id },
            update: {
                title: journal.title,
                excerpt: journal.excerpt,
                content: journal.content ? journal.content.join('\n\n') : '',
                imageUrl: journal.image,
                date: journal.date,
                tags: journal.tags || [],
                published: true,
            },
            create: {
                title: journal.title,
                excerpt: journal.excerpt,
                content: journal.content ? journal.content.join('\n\n') : '',
                imageUrl: journal.image,
                date: journal.date,
                tags: journal.tags || [],
                published: true,
            },
        });
    }
    console.log('✅ Journals seeded');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
