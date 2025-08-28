export interface BicycleStation {
  id: string;
  name: string;
  lat: number;
  lng: number;
  type: 'electric' | 'city' | 'sport';
  available_bikes: number;
  total_capacity: number;
  distance_from_user?: string;
  status: 'available' | 'full' | 'maintenance';
  description: string;
  features: string[];
}

// 藩境のまち周辺の自転車ステーションデータ
export const bicycleStations: BicycleStation[] = [
  {
    id: 'hankyou-plaza-station',
    name: '藩境のまち広場ステーション',
    lat: 33.204409514126155,
    lng: 130.37314260488293,
    type: 'electric',
    available_bikes: 5,
    total_capacity: 8,
    status: 'available',
    description: '藩境のまち広場に隣接する主要ステーション。電動アシスト自転車を中心に配備。住所: 福岡県大川市小保237-1',
    features: ['電動アシスト', '24時間利用可', 'クレジットカード対応', 'アプリ予約可']
  },
  {
    id: 'kobo-hachiman-station',
    name: '小保八幡神社前ステーション',
    lat: 33.20468724474168,
    lng: 130.37173131322425,
    type: 'city',
    available_bikes: 3,
    total_capacity: 6,
    status: 'available',
    description: '小保八幡神社の参拝客向けステーション。シティサイクルが中心。住所: 福岡県大川市小保223',
    features: ['シティサイクル', '6:00-22:00', 'IC カード対応']
  },
  {
    id: 'enozu-station',
    name: '榎津駅前ステーション',
    lat: 33.20551288511446,
    lng: 130.37286158471335,
    type: 'electric',
    available_bikes: 0,
    total_capacity: 10,
    status: 'full',
    description: '榎津地区の交通拠点。大容量ステーションで電動アシスト自転車を多数配備。住所: 福岡県大川市榎津180-2',
    features: ['電動アシスト', '24時間利用可', 'クレジットカード対応', 'アプリ予約可', '大容量']
  },
  {
    id: 'yoshiwara-house-station',
    name: '旧吉原家住宅前ステーション',
    lat: 33.20676490535196,
    lng: 130.3699682708965,
    type: 'sport',
    available_bikes: 2,
    total_capacity: 4,
    status: 'available',
    description: '歴史建造物見学者向けの小規模ステーション。スポーツタイプも配備。住所: 福岡県大川市小保209',
    features: ['スポーツバイク', 'シティサイクル', '8:00-18:00']
  },
  {
    id: 'shobunsu-station',
    name: '庄分酢前ステーション',
    lat: 33.206570636634964,
    lng: 130.37155230555243,
    type: 'city',
    available_bikes: 4,
    total_capacity: 6,
    status: 'available',
    description: '老舗庄分酢の見学者向けステーション。観光客に人気。住所: 福岡県大川市榎津226-1',
    features: ['シティサイクル', '9:00-17:00', 'IC カード対応', '観光マップ配布']
  },
  {
    id: 'morita-urushi-station',
    name: '森田うるし店前ステーション',
    lat: 33.20638941365968,
    lng: 130.37020573610482,
    type: 'electric',
    available_bikes: 1,
    total_capacity: 3,
    status: 'available',
    description: '伝統工芸店周辺の小規模ステーション。職人街散策に便利。住所: 福岡県大川市小保194',
    features: ['電動アシスト', '10:00-16:00', 'アプリ予約推奨']
  },
  {
    id: 'maintenance-station',
    name: '九州建具木工所前ステーション',
    lat: 33.206349300855194,
    lng: 130.3707087280602,
    type: 'city',
    available_bikes: 0,
    total_capacity: 5,
    status: 'maintenance',
    description: '現在メンテナンス中のステーション。工場見学者向け。住所: 福岡県大川市小保201-3',
    features: ['メンテナンス中', 'シティサイクル', '通常 8:00-17:00']
  },
  {
    id: 'candidate-station-1',
    name: '大川市役所前候補地',
    lat: 33.207,
    lng: 130.374,
    type: 'electric',
    available_bikes: 0,
    total_capacity: 12,
    status: 'maintenance',
    description: '設置候補地：大川市役所前。市民利用を想定した大容量ステーション予定地。住所: 福岡県大川市酒見279-1',
    features: ['設置候補地', '電動アシスト予定', '大容量', '市役所連携']
  },
  {
    id: 'candidate-station-2',
    name: '大川コミュニティセンター候補地',
    lat: 33.203,
    lng: 130.375,
    type: 'city',
    available_bikes: 0,
    total_capacity: 8,
    status: 'maintenance',
    description: '設置候補地：大川コミュニティセンター前。地域住民向けステーション予定地。住所: 福岡県大川市向島1834-1',
    features: ['設置候補地', 'シティサイクル予定', 'コミュニティ連携']
  },
  {
    id: 'candidate-station-3',
    name: '大川駅前候補地',
    lat: 33.201,
    lng: 130.378,
    type: 'electric',
    available_bikes: 0,
    total_capacity: 15,
    status: 'maintenance',
    description: '設置候補地：大川駅前。交通結節点として最重要候補地。住所: 福岡県大川市向島2000',
    features: ['設置候補地', '電動アシスト予定', '超大容量', '駅前立地', '最優先候補']
  },
  {
    id: 'candidate-station-4',
    name: '大川市立図書館前候補地',
    lat: 33.205,
    lng: 130.372,
    type: 'city',
    available_bikes: 0,
    total_capacity: 6,
    status: 'maintenance',
    description: '設置候補地：大川市立図書館前。学習・文化施設利用者向け候補地。住所: 福岡県大川市大字酒見141-11',
    features: ['設置候補地', 'シティサイクル予定', '文化施設連携', '学生利用想定']
  }
];