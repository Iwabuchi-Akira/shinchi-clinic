// app/page.tsx
const API_BASE_URL = process.env.API_BASE_URL;
async function getNews() {
  const res = await fetch(`${API_BASE_URL}/news`, { cache: "no-store" });
  return res.json();
}

type NewsItem = {
  id: string | number;
  title: string;
  content: string;
}

export default async function HomePage() {
  const news = await getNews();

  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold">新地クリニック</h1>
      <h2 className="mt-6 text-xl font-semibold">お知らせ</h2>
      <ul className="mt-4 space-y-2">
        {news.map((item: NewsItem) => (
          <li key={item.id} className="border-b pb-2">
            <h3 className="font-bold">{item.title}</h3>
            <p className="text-gray-600">{item.content}</p>
          </li>
        ))}
      </ul>
    </main>
  );
}
