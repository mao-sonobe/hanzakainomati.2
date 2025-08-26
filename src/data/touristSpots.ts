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
  {
    id: 'yoshiwara-house',
    name: '旧吉原家住宅',
    lat: 33.20676490535196,
    lng: 130.3699682708965,
    type: 'viewpoint',
    stamps: 3,
    difficulty: '歴史建造物',
    description: '主屋および御成門は文政八年(1825年)の建築で国指定重要文化財。大川市指定有形文化財の土蔵3棟と、国登録有形文化財の通用門および煉瓦塀があります。複雑な屋根の構成と大壁造の重厚な外観、江戸後期の上質な大型民家の姿を伝える貴重な建造物です。',
    rating: 4.5,
    coupon: false
  }
];