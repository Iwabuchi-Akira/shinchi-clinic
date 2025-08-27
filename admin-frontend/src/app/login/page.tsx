export default function LoginPage() {
	return (
		<div className="flex min-h-screen items-center justify-center p-8">
			<div className="w-full max-w-sm space-y-6">
				<h1 className="text-2xl font-semibold text-center">Admin Login</h1>
				<form className="space-y-4">
					<div className="space-y-1">
						<label htmlFor="email" className="block text-sm font-medium">Email</label>
						<input
							id="email"
							type="email"
							className="w-full rounded border px-3 py-2 text-sm bg-background"
							placeholder="admin@example.com"
						/>
					</div>
					<div className="space-y-1">
						<label htmlFor="password" className="block text-sm font-medium">Password</label>
						<input
							id="password"
							type="password"
							className="w-full rounded border px-3 py-2 text-sm bg-background"
							placeholder="••••••••"
						/>
					</div>
					<button
						type="submit"
						className="w-full rounded bg-foreground text-background py-2 text-sm font-medium hover:opacity-90 transition"
					>
						Sign in
					</button>
				</form>
			</div>
		</div>
	);
}

