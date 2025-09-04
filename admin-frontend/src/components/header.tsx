'use client';

import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import { usePathname } from 'next/navigation';

export default function Header() {
    const { user, logout } = useAuth();
    const pathname = usePathname();

    const handleLogout = () => {
        logout();
    };

    const menuItems = [
        { href: '/blog', label: 'ブログ' },
        { href: '/news', label: 'お知らせ'},
        { href: '/settings', label: '設定' },
    ];

    const isActive = (href: string) => pathname.startsWith(href);

    return (
        <aside className="fixed left-0 top-0 h-full w-64 bg-slate-800 text-white shadow-lg">
            <div className="p-6">
                <h1 className="text-xl font-bold mb-8">
                    <Link href="/" className="hover:text-blue-300">
                        Admin Dashboard
                    </Link>
                </h1>
                
                <nav className="space-y-2">
                    {menuItems.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                                isActive(item.href)
                                    ? 'bg-blue-600 text-white'
                                    : 'hover:bg-slate-700'
                            }`}
                        >
                            <span>{item.label}</span>
                        </Link>
                    ))}
                </nav>
            </div>

            <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-slate-700">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                            <span className="text-sm font-semibold">
                                {user?.username?.charAt(0).toUpperCase()}
                            </span>
                        </div>
                        <span className="text-sm text-slate-300">{user?.username}</span>
                    </div>
                </div>
                <button
                    onClick={handleLogout}
                    className="mt-3 px-3 py-2 bg-red-600 hover:bg-red-700 text-white text-sm rounded transition-colors"
                    title="Logout"
                >
                    ログアウト
                </button>
            </div>
        </aside>
    );
}