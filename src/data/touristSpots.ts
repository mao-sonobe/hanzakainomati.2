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

// 藩境のまちの観光スポットデータ（福岡県周辺の座標例）
export const touristSpotsData: TouristSpot[] = [
  {
    id: 'hankyou-shrine',
    name: '藩境神社',
    lat: 33.5904,
    lng: 130.4017,
    type: 'shrine',
    stamps: 1,
    difficulty: '初級',
    description: '歴史ある神社でAR体験が楽しめます。藩境の守り神として親しまれています。',
    distance: '0.3km'
  },
  {
    id: 'kominka-cafe',
    name: '古民家カフェ',
    lat: 33.5914,
    lng: 130.4027,
    type: 'cafe',
    stamps: 1,
    difficulty: '初級',
    description: '築100年の古民家を改装したカフェ。和風スイーツが人気です。',
    rating: 4.8,
    coupon: true,
    distance: '0.8km'
  },
  {
    id: 'bamboo-path',
    name: '竹林の小径',
    lat: 33.5924,
    lng: 130.4037,
    type: 'nature',
    stamps: 2,
    difficulty: '中級',
    description: '美しい竹林の中を歩く散策路。四季折々の自然が楽しめます。',
    distance: '1.2km'
  },
  {
    id: 'observation-deck',
    name: '展望台',
    lat: 33.5934,
    lng: 130.4047,
    type: 'viewpoint',
    stamps: 3,
    difficulty: '上級',
    description: '藩境のまち全体を見渡せる絶景スポット。夕日が特に美しいです。',
    distance: '2.1km'
  },
  {
    id: 'seven-eleven',
    name: 'セブンイレブン藩境店',
    lat: 33.5894,
    lng: 130.4007,
    type: 'convenience',
    description: '24時間営業のコンビニエンスストア。観光の休憩にご利用ください。',
    distance: '0.5km'
  },
  {
    id: 'family-mart',
    name: 'ファミリーマート中央店',
    lat: 33.5884,
    lng: 130.3997,
    type: 'convenience',
    description: '中央通りにあるコンビニエンスストア。お土産も取り扱っています。',
    distance: '0.7km'
  },
  {
    id: 'wafuu-cafe-ume',
    name: '和風カフェ 梅',
    lat: 33.5909,
    lng: 130.4022,
    type: 'cafe',
    description: '抹茶と和菓子の専門店。庭園を眺めながらゆっくりできます。',
    rating: 4.8,
    coupon: true,
    distance: '0.4km'
  },
  {
    id: 'soba-takean',
    name: '蕎麦処 竹の庵',
    lat: 33.5919,
    lng: 130.4032,
    type: 'cafe',
    description: '手打ち蕎麦の名店。地元産の蕎麦粉を使用した絶品蕎麦が味わえます。',
    rating: 4.6,
    distance: '0.9km'
  },
  {
    id: 'housenji-temple',
    name: '法泉寺',
    lat: 33.20541304916532,
    lng: 130.37116642460438,
    type: 'shrine',
    stamps: 2,
    difficulty: '中級',
    description: '歴史ある古刹。静寂な境内で心を落ち着かせることができます。',
    distance: '1.5km'
  }
];