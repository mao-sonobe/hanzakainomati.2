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
    description: '藩境のまち広場に隣接する主要ステーション。電動アシスト自転車を中心に配備。',
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
    description: '小保八幡神社の参拝客向けステーション。シティサイクルが中心。',
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
    description: '榎津地区の交通拠点。大容量ステーションで電動アシスト自転車を多数配備。',
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
    description: '歴史建造物見学者向けの小規模ステーション。スポーツタイプも配備。',
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
    description: '老舗庄分酢の見学者向けステーション。観光客に人気。',
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
    description: '伝統工芸店周辺の小規模ステーション。職人街散策に便利。',
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
    description: '現在メンテナンス中のステーション。工場見学者向け。',
    features: ['メンテナンス中', 'シティサイクル', '通常 8:00-17:00']
  }
];