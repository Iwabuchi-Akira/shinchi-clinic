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
    content: "新地クリニックのブログへようこそ。こちらでは医療に関する最新情報や健康に関するアドバイスを定期的にお届けします。皆様の健康維持にお役立ていただければ幸いです。",
    published_at: "2025-08-20T09:00:00Z",
    updated_at: "2025-08-20T09:00:00Z"
  },
  {
    id: 2,
    title: "健康的な生活習慣について",
    content: "健康的な生活習慣を維持することは、病気の予防と早期発見に重要な役割を果たします。定期的な運動、バランスの取れた食事、充分な睡眠を心がけましょう。",
    published_at: "2025-08-22T10:30:00Z",
    updated_at: "2025-08-22T10:30:00Z"
  },
  {
    id: 3,
    title: "季節の変わり目の体調管理",
    content: "季節の変わり目は体調を崩しやすい時期です。気温の変化に備えて、適切な衣服の調整や水分補給を心がけ、体調管理に注意しましょう。",
    published_at: "2025-08-24T14:15:00Z",
    updated_at: "2025-08-24T14:15:00Z"
  }
];

export async function GET() {
  try {
    return NextResponse.json(dummyBlogs);
  } catch (error) {
    console.error('Error fetching blogs:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
