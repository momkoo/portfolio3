import { prisma } from "@/lib/prisma";
import WorkDetailClient from './WorkDetailClient';

export const dynamic = 'force-dynamic';

export default async function WorkDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;

    const project = await prisma.project.findUnique({
        where: { id },
        include: {
            category: true,
            images: {
                orderBy: { order: 'asc' }
            }
        }
    });

    if (!project) {
        return <div className="min-h-screen flex items-center justify-center">Project not found</div>;
    }

    return <WorkDetailClient project={project} />;
}
