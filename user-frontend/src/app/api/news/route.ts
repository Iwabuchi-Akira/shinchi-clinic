import { NextResponse } from 'next/server';

interface News {
  id: number;
  title: string;
  content: string;
  published_at: string;
  updated_at: string;
}

// ダミーのニュースデータ
const dummyNews: News[] = [
  {
    id: 1,
    title: "新地クリニック開院のお知らせ",
    content: "この度、新地クリニックを開院いたしました。地域の皆様の健康をサポートするため、最新の医療設備と経験豊富なスタッフでお待ちしております。",
    published_at: "2025-08-15T08:00:00Z",
    updated_at: "2025-08-15T08:00:00Z"
  },
  {
    id: 2,
    title: "夏季休診のお知らせ",
    content: "誠に勝手ながら、8月13日から8月16日まで夏季休診とさせていただきます。ご迷惑をおかけいたしますが、何卒ご理解のほどよろしくお願いいたします。",
    published_at: "2025-08-10T16:00:00Z",
    updated_at: "2025-08-10T16:00:00Z"
  },
  {
    id: 3,
    title: "インフルエンザ予防接種開始のお知らせ",
    content: "10月1日よりインフルエンザ予防接種を開始いたします。予約制となっておりますので、お早めにお電話またはウェブサイトからご予約ください。",
    published_at: "2025-08-25T12:00:00Z",
    updated_at: "2025-08-25T12:00:00Z"
  },
  {
    id: 4,
    title: "診療時間変更のお知らせ",
    content: "9月より土曜日の診療時間を午前のみとさせていただきます。平日の診療時間に変更はございません。ご不便をおかけいたしますが、よろしくお願いいたします。",
    published_at: "2025-08-26T10:00:00Z",
    updated_at: "2025-08-26T10:00:00Z"
  }
];

export async function GET() {
  const useDummyApi = process.env.USE_DUMMY_API ?? 'true';
  
  if (useDummyApi !== 'true') {
    return NextResponse.json(
      { error: 'API endpoint not available in production mode' },
      { status: 404 }
    );
  }

  try {
    return NextResponse.json(dummyNews);
  } catch (error) {
    console.error('Error fetching news:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
