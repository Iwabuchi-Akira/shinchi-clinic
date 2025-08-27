import { notFound } from "next/navigation";

interface News {
  id: number;
  title: string;
  content: string;
  published_at: string;
  updated_at: string;
}

async function getNews(id: string): Promise<News> {
  const res = await fetch(`http://localhost:3000/api/news/${id}`, { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to fetch news");
  return res.json();
}

export default async function NewsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  let news: News;
  try {
    news = await getNews(id);
  } catch {
    notFound();
  }

  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold">{news.title}</h1>
      <p className="mt-4">{news.content}</p>
      <p className="mt-2 text-gray-500">更新: {news.updated_at}</p>
    </main>
  );
}
