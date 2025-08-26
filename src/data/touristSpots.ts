export interface TouristSpot {
  id: string;
  name: string;
  lat: number;
  lng: number;
  type: 'shrine' | 'cafe' | 'nature' | 'viewpoint' | 'convenience';
  stamps?: number;
  difficulty?: string;
  description: string;
  rating?: number;
  coupon?: boolean;
  distance?: string;
}

// 藩境のまち観光スポットデータ
export const touristSpotsData: TouristSpot[] = [
  // 神社・寺院
  {
    id: 'hanzakai-shrine',
    name: '藩境神社',
    lat: 33.6064,
    lng: 130.4178,
    type: 'shrine',
    stamps: 3,
    difficulty: '初級',
    description: '藩境のまちのシンボル的な神社。歴史ある建造物と美しい境内が魅力。',
    rating: 4.5,
    coupon: true
  },
  {
    id: 'old-temple',
    name: '古刹寺院',
    lat: 33.6089,
    lng: 130.4156,
    type: 'shrine',
    stamps: 2,
    difficulty: '初級',
    description: '静寂に包まれた古い寺院。心を落ち着かせる空間。',
    rating: 4.2
  },
  
  // 自然・景観スポット
  {
    id: 'bamboo-forest',
    name: '竹林の小径',
    lat: 33.6045,
    lng: 130.4201,
    type: 'nature',
    stamps: 2,
    difficulty: '初級',
    description: '美しい竹林が続く散策路。四季折々の自然を楽しめる。',
    rating: 4.3,
    coupon: false
  },
  {
    id: 'mountain-viewpoint',
    name: '展望台',
    lat: 33.6112,
    lng: 130.4134,
    type: 'viewpoint',
    stamps: 4,
    difficulty: '中級',
    description: '藩境のまち全体を見渡せる絶景スポット。夕日が美しい。',
    rating: 4.7
  },
  {
    id: 'historic-garden',
    name: '歴史庭園',
    lat: 33.6078,
    lng: 130.4189,
    type: 'nature',
    stamps: 3,
    difficulty: '初級',
    description: '江戸時代から続く美しい日本庭園。季節の花々が楽しめる。',
    rating: 4.4,
    coupon: true
  },
  
  // カフェ・飲食店
  {
    id: 'traditional-cafe-ume',
    name: '和風カフェ 梅',
    lat: 33.6067,
    lng: 130.4167,
    type: 'cafe',
    stamps: 1,
    difficulty: '初級',
    description: '伝統的な和風建築のカフェ。抹茶と和菓子が絶品。',
    rating: 4.6,
    coupon: true
  },
  {
    id: 'tea-house-fuga',
    name: '茶房 風雅',
    lat: 33.6052,
    lng: 130.4145,
    type: 'cafe',
    stamps: 1,
    difficulty: '初級',
    description: '落ち着いた雰囲気の茶房。地元の食材を使った和スイーツが人気。',
    rating: 4.4,
    coupon: true
  },
  {
    id: 'local-restaurant',
    name: '郷土料理 藩境',
    lat: 33.6071,
    lng: 130.4172,
    type: 'cafe',
    stamps: 2,
    difficulty: '初級',
    description: '地元の食材を活かした郷土料理が味わえる老舗レストラン。',
    rating: 4.5,
    coupon: false
  },
  
  // コンビニエンスストア
  {
    id: 'convenience-store-1',
    name: 'ファミリーマート 藩境店',
    lat: 33.6061,
    lng: 130.4163,
    type: 'convenience',
    description: '観光の合間の休憩や買い物に便利。ATMも利用可能。',
    rating: 3.8
  },
  {
    id: 'convenience-store-2',
    name: 'セブンイレブン 藩境中央店',
    lat: 33.6075,
    lng: 130.4181,
    type: 'convenience',
    description: '24時間営業で観光客にも便利。お土産コーナーもあり。',
    rating: 3.9
  }
];