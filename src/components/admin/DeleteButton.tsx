'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface DeleteButtonProps {
    id: string;
    type: 'project' | 'journal';
    title?: string;
}

export default function DeleteButton({ id, type, title }: DeleteButtonProps) {
    const router = useRouter();
    const [deleting, setDeleting] = useState(false);

    const handleDelete = async () => {
        const confirmMessage = title
            ? `"${title}"을(를) 삭제하시겠습니까?`
            : '정말 삭제하시겠습니까?';

        if (!confirm(confirmMessage)) {
            return;
        }

        setDeleting(true);

        try {
            const endpoint = type === 'project'
                ? `/api/projects/${id}`
                : `/api/journals/${id}`;

            const res = await fetch(endpoint, {
                method: 'DELETE',
            });

            if (!res.ok) {
                throw new Error('Failed to delete');
            }

            router.refresh();
        } catch (error) {
            alert('삭제에 실패했습니다.');
            console.error(error);
        } finally {
            setDeleting(false);
        }
    };

    return (
        <button
            onClick={handleDelete}
            disabled={deleting}
            className="text-red-600 hover:text-red-900 disabled:opacity-50"
        >
            {deleting ? 'Deleting...' : 'Delete'}
        </button>
    );
}
