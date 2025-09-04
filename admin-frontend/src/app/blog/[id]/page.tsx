import AdminLayout from '@/components/AdminLayout'
import Link from 'next/link'

export default async function BlogDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
	return (
		<AdminLayout>
			<div className="space-y-6">
				<div className="flex items-center gap-4">
					<Link
						href="/blog"
						className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
					>
						← 戻る
					</Link>
					<h1 className="text-3xl font-bold text-gray-900">ブログ詳細 (ID: {id})</h1>
				</div>
				<div className="bg-white rounded-lg shadow p-6">
					<p className="text-gray-600">ブログの詳細情報がここに表示されます。</p>
				</div>
			</div>
		</AdminLayout>
	);
}

