import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function AdminDashboard() {
    const session = await getServerSession(authOptions);

    if (!session) {
        redirect('/api/auth/signin');
    }

    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <div className="max-w-7xl mx-auto">
                <header className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
                    <div className="flex items-center gap-4">
                        <span className="text-gray-600">Welcome, {session.user?.email}</span>
                        <Link href="/api/auth/signout" className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition">
                            Sign Out
                        </Link>
                    </div>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <Link href="/admin/projects" className="block p-6 bg-white rounded-lg shadow hover:shadow-md transition">
                        <h2 className="text-xl font-bold mb-2">Projects</h2>
                        <p className="text-gray-600">Manage portfolio projects</p>
                    </Link>

                    <Link href="/admin/journals" className="block p-6 bg-white rounded-lg shadow hover:shadow-md transition">
                        <h2 className="text-xl font-bold mb-2">Journals</h2>
                        <p className="text-gray-600">Manage journal entries</p>
                    </Link>

                    <div className="p-6 bg-white rounded-lg shadow">
                        <h2 className="text-xl font-bold mb-2">Settings</h2>
                        <p className="text-gray-600">Site configuration (Coming Soon)</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
