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
    content: "この度、新地クリニックを開院いたしました。地域の皆様の健康をサポートするため、最新の医療設備と経験豊富なスタッフでお待ちしております。診療科目は内科、外科、小児科を取り扱っており、予防医学にも力を入れております。皆様のかかりつけ医として、安心して受診いただけるよう努めてまいります。",
    published_at: "2025-08-15T08:00:00Z",
    updated_at: "2025-08-15T08:00:00Z"
  },
  {
    id: 2,
    title: "夏季休診のお知らせ",
    content: "誠に勝手ながら、8月13日から8月16日まで夏季休診とさせていただきます。ご迷惑をおかけいたしますが、何卒ご理解のほどよろしくお願いいたします。休診期間中の緊急時は、近隣の救急病院をご利用ください。休診明けの8月17日から通常通り診療を再開いたします。",
    published_at: "2025-08-10T16:00:00Z",
    updated_at: "2025-08-10T16:00:00Z"
  },
  {
    id: 3,
    title: "インフルエンザ予防接種開始のお知らせ",
    content: "10月1日よりインフルエンザ予防接種を開始いたします。予約制となっておりますので、お早めにお電話またはウェブサイトからご予約ください。接種料金は一般の方3,500円、65歳以上の方は市の助成により1,500円となります。ワクチンの在庫には限りがございますので、接種をご希望の方はお早めにご相談ください。",
    published_at: "2025-08-25T12:00:00Z",
    updated_at: "2025-08-25T12:00:00Z"
  },
  {
    id: 4,
    title: "診療時間変更のお知らせ",
    content: "9月より土曜日の診療時間を午前のみとさせていただきます。平日の診療時間に変更はございません。ご不便をおかけいたしますが、よろしくお願いいたします。土曜日の午後は医師の研修や勉強会に充て、より質の高い医療サービスの提供に努めてまいります。",
    published_at: "2025-08-26T10:00:00Z",
    updated_at: "2025-08-26T10:00:00Z"
  }
];

// GET /api/news/[id] - 特定のニュースを取得
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const newsId = parseInt(id, 10);
    
    const news = dummyNews.find(n => n.id === newsId);
    
    if (!news) {
      return NextResponse.json(
        { error: 'News not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(news);
  } catch (error) {
    console.error('Error fetching news:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
