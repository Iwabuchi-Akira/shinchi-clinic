
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';

export default function LoginPage() {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState('');
	const { login } = useAuth();
	const router = useRouter();

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsLoading(true);
		setError('');

		try {
			const success = await login(username, password);
			if (success) {
				router.push('/');
			} else {
				setError('ログインに失敗しました。ユーザー名またはパスワードが間違っています。');
			}
		} catch {
			setError('ログイン処理中にエラーが発生しました。');
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className="flex min-h-screen items-center justify-center p-8">
			<div className="w-full max-w-sm space-y-6">
				<h1 className="text-2xl font-semibold text-center">Admin Login</h1>
				<form onSubmit={handleSubmit} className="space-y-4">
					{error && (
						<div className="p-3 text-sm text-red-600 bg-red-50 rounded-md">
							{error}
						</div>
					)}
					<div>
						<label htmlFor="username" className="block text-sm font-medium mb-1">
							ユーザー名
						</label>
						<input
							id="username"
							type="text"
							value={username}
							onChange={(e) => setUsername(e.target.value)}
							required
							className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
							disabled={isLoading}
						/>
					</div>
					<div>
						<label htmlFor="password" className="block text-sm font-medium mb-1">
							パスワード
						</label>
						<input
							id="password"
							type="password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							required
							className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
							disabled={isLoading}
						/>
					</div>
					<button
						type="submit"
						disabled={isLoading}
						className="w-full rounded bg-foreground text-background py-2 text-sm font-medium hover:opacity-90 transition disabled:opacity-50 disabled:cursor-not-allowed"
					>
						{isLoading ? 'ログイン中...' : 'ログイン'}
					</button>
				</form>
			</div>
		</div>
	);
}

