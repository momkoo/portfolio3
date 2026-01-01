import { prisma } from "@/lib/prisma";
import { WorkSection } from '@/components';

export const dynamic = 'force-dynamic';

export default async function WorkPage() {
    const projects = await prisma.project.findMany({
        orderBy: { order: 'asc' },
        include: { category: true }
    });

    return (
        <main className="pt-20">
            <WorkSection projects={projects} />
        </main>
    );
}
