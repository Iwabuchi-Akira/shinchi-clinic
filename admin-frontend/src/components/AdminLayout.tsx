'use client';

import Header from './header';
import { ProtectedRoute } from './ProtectedRoute';

interface AdminLayoutProps {
    children: React.ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
    return (
        <ProtectedRoute>
            <div className="min-h-screen bg-gray-50">
                <Header />
                <main className="ml-64 p-8">
                    {children}
                </main>
            </div>
        </ProtectedRoute>
    );
}
