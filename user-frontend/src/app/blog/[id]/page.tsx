// src/app/blog/[id]/page.tsx
import { notFound } from "next/navigation";

interface Blog {
  id: number;
  title: string;
  content: string;
  published_at: string;
  updated_at: string;
}

async function fetchBlog(id: string): Promise<Blog> {
  // const res = await fetch(`/api/blog/${id}`, { cache: "no-store" });
  const res = await fetch(`http://localhost:3000/api/blog/${id}`, { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to fetch blog");
  return res.json();
}

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  let blog: Blog;
  try {
    blog = await fetchBlog(id);
  } catch {
    return notFound();
  }

  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold">{blog.title}</h1>
      <p className="mt-4">{blog.content}</p>
      <p className="mt-2 text-gray-500">更新: {blog.updated_at}</p>
    </main>
  );
}
