import AdminLayout from '@/components/AdminLayout'
import Link from 'next/link'

export default function BlogListPage() {
	return (
		<AdminLayout>
			<div className="space-y-6">
				<div className="flex justify-between items-center">
					<h1 className="text-3xl font-bold text-gray-900">ブログ管理</h1>
					<Link
						href="/blog/new"
						className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
					>
						新規作成
					</Link>
				</div>
				<div className="bg-white rounded-lg shadow p-6">
					<p className="text-gray-600">ブログ一覧がここに表示されます。</p>
				</div>
			</div>
		</AdminLayout>
	);
}

