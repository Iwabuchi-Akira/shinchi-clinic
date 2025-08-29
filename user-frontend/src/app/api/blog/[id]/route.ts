import { NextResponse } from 'next/server';

interface Blog {
  id: number;
  title: string;
  content: string;
  published_at: string;
  updated_at: string;
}

// ダミーのブログデータ
const dummyBlogs: Blog[] = [
  {
    id: 1,
    title: "新地クリニックのブログへようこそ",
    content: "新地クリニックのブログへようこそ。こちらでは医療に関する最新情報や健康に関するアドバイスを定期的にお届けします。皆様の健康維持にお役立ていただければ幸いです。当クリニックでは、患者様一人ひとりに寄り添った医療を提供することを心がけております。",
    published_at: "2025-08-20T09:00:00Z",
    updated_at: "2025-08-20T09:00:00Z"
  },
  {
    id: 2,
    title: "健康的な生活習慣について",
    content: "健康的な生活習慣を維持することは、病気の予防と早期発見に重要な役割を果たします。定期的な運動、バランスの取れた食事、充分な睡眠を心がけましょう。また、ストレス管理も健康維持には欠かせません。適度なリラクゼーションや趣味の時間を持つことで、心身ともに健康な状態を保つことができます。",
    published_at: "2025-08-22T10:30:00Z",
    updated_at: "2025-08-22T10:30:00Z"
  },
  {
    id: 3,
    title: "季節の変わり目の体調管理",
    content: "季節の変わり目は体調を崩しやすい時期です。気温の変化に備えて、適切な衣服の調整や水分補給を心がけ、体調管理に注意しましょう。特に、朝晩の気温差が大きい時期は、風邪を引きやすくなります。手洗いうがいを徹底し、免疫力を高める食事を心がけることが大切です。",
    published_at: "2025-08-24T14:15:00Z",
    updated_at: "2025-08-24T14:15:00Z"
  }
];

// GET /api/blog/[id] - 特定のブログを取得
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) 
  {
  try {
    const { id } = await params;
    const blogId = parseInt(id, 10);
    
    const blog = dummyBlogs.find(b => b.id === blogId);
    
    if (!blog) {
      return NextResponse.json(
        { error: 'Blog not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(blog);
  } catch (error) {
    console.error('Error fetching blog:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
