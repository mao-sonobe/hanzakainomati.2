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
  },
  {
    id: 'shobunsu-takahashi-house',
    name: '庄分酢・高橋家住宅',
    lat: 33.206570636634964,
    lng: 130.37155230555243,
    type: 'viewpoint',
    stamps: 2,
    difficulty: '国登録有形文化財',
    description: '江戸時代初期、高橋家の初代清右衛門が榎津に移り住んだことをきっかけに、二代目四郎兵衛が造り酒屋を開始。その後、四代目清右衛門が酢造商いを始めたのが「庄分酢」の始まり。庄分酢本社の建物は18世紀半ば頃の建築（築約250年）で榎津地区に現存する最古の住宅であり、母屋は大川市有形文化財に指定されています。母屋は本瓦葺きの入母屋妻入造りで、別棟の作業場の小屋組みは貫(ぬき)を多用。座敷と次の間にある欄間や下から三段目まで取り外しができる箱階段など居住空間にもいろいろな工夫と当時をしのばせる材料が使用されています。4月の藩境まつり(酢蔵びらき)の時に高橋家住宅の一部を公開して、茶席などを開催。',
    rating: 4.3,
    coupon: false
  }
];