export interface DiningSpot {
  id: string;
  name: string;
  lat: number;
  lng: number;
  type: 'restaurant' | 'cafe' | 'sweets' | 'local_food';
  cuisine: string;
  description: string;
  rating?: number;
  coupon?: boolean;
  price_range?: string;
  opening_hours?: string;
  phone?: string;
}

// 藩境のまち周辺の飲食店データ
export const diningSpots: DiningSpot[] = [
  {
    id: 'hankyou-cafe',
    name: '藩境カフェ',
    lat: 33.20441,
    lng: 130.37314,
    type: 'cafe',
    cuisine: '和風カフェ・甘味',
    description: '藩境のまち広場に隣接する和風カフェ。地元の食材を使った和スイーツと抹茶が人気。観光の休憩にぴったりです。',
    rating: 4.3,
    coupon: false,
    price_range: '¥800-1,500',
    opening_hours: '9:00-17:00',
    phone: '0944-XX-XXXX'
  },
  {
    id: 'shobunsu-restaurant',
    name: '庄分酢レストラン',
    lat: 33.20657,
    lng: 130.37155,
    type: 'restaurant',
    cuisine: '郷土料理・酢料理',
    description: '老舗の庄分酢を使った創作料理が味わえるレストラン。酢を使ったヘルシーな料理と地元の新鮮な食材が自慢です。',
    rating: 4.5,
    coupon: true,
    price_range: '¥1,200-2,500',
    opening_hours: '11:00-15:00, 17:00-21:00',
    phone: '0944-XX-XXXX'
  },
  {
    id: 'enozu-soba',
    name: '榎津そば処',
    lat: 33.20551,
    lng: 130.37286,
    type: 'restaurant',
    cuisine: '蕎麦・うどん',
    description: '手打ち蕎麦が自慢の老舗そば店。地元産の蕎麦粉を使用し、つゆは昆布と鰹の上品な味わい。天ぷらも絶品です。',
    rating: 4.2,
    coupon: false,
    price_range: '¥600-1,200',
    opening_hours: '11:00-15:00',
    phone: '0944-XX-XXXX'
  },
  {
    id: 'kobo-sweets',
    name: '小保和菓子店',
    lat: 33.20469,
    lng: 130.37173,
    type: 'sweets',
    cuisine: '和菓子・茶菓子',
    description: '創業100年の老舗和菓子店。季節の和菓子と抹茶のセットが人気。お土産用の和菓子も豊富に取り揃えています。',
    rating: 4.4,
    coupon: false,
    price_range: '¥300-800',
    opening_hours: '8:00-18:00',
    phone: '0944-XX-XXXX'
  },
  {
    id: 'okawa-ramen',
    name: '大川ラーメン',
    lat: 33.20623,
    lng: 130.37035,
    type: 'restaurant',
    cuisine: 'ラーメン・中華',
    description: '地元で愛される老舗ラーメン店。豚骨ベースの優しい味のスープと自家製麺が自慢。チャーシューも絶品です。',
    rating: 4.1,
    coupon: false,
    price_range: '¥500-1,000',
    opening_hours: '11:00-15:00, 18:00-22:00',
    phone: '0944-XX-XXXX'
  },
  {
    id: 'hankyou-teahouse',
    name: '藩境茶屋',
    lat: 33.20503,
    lng: 130.37221,
    type: 'cafe',
    cuisine: '茶道体験・和カフェ',
    description: '本格的な茶道体験ができる茶屋。茶道の作法を学びながら、美味しい和菓子と抹茶を楽しめます。予約制です。',
    rating: 4.6,
    coupon: false,
    price_range: '¥1,500-3,000',
    opening_hours: '10:00-16:00（要予約）',
    phone: '0944-XX-XXXX'
  }
];