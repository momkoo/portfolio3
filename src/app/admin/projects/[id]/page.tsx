import ProjectForm from '@/components/admin/ProjectForm';
import { PrismaClient, Project } from '@prisma/client';

const prisma = new PrismaClient();

export const dynamic = 'force-dynamic';

export default async function EditProjectPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    let project: Project | null = null;
    let error: string | null = null;

    try {
        project = await prisma.project.findUnique({
            where: { id },
        });

        if (!project) {
            return <div>Project not found</div>;
        }
    } catch (e) {
        console.error("Failed to fetch project:", e);
        error = "Database connection failed.";
    }

    if (error) {
        return (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md">
                <p className="font-bold">Error</p>
                <p>{error}</p>
            </div>
        );
    }

    return (
        <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-6">Edit Project</h1>
            <ProjectForm initialData={project} />
        </div>
    );
}
