import AdminLayout from '@/components/AdminLayout'

export default function SettingsPage() {
	return (
		<AdminLayout>
			<div className="space-y-6">
				<h1 className="text-3xl font-bold text-gray-900">設定</h1>
				<div className="bg-white rounded-lg shadow p-6">
					<h2 className="text-xl font-semibold mb-4">管理者設定</h2>
					<p className="text-gray-600">管理者設定をここで変更できます。</p>
				</div>
			</div>
		</AdminLayout>
	);
}

