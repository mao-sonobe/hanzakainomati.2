// 距離計算ユーティリティ

export interface Location {
  lat: number;
  lng: number;
}

// 2点間の距離を計算（ハヴァーサイン公式）
export const calculateDistance = (point1: Location, point2: Location): number => {
  const R = 6371000; // 地球の半径（メートル）
  const dLat = (point2.lat - point1.lat) * Math.PI / 180;
  const dLng = (point2.lng - point1.lng) * Math.PI / 180;
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(point1.lat * Math.PI / 180) * Math.cos(point2.lat * Math.PI / 180) * 
    Math.sin(dLng/2) * Math.sin(dLng/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c; // メートル単位で返す
};

// 指定した半径内にいるかチェック
export const isWithinRadius = (userLocation: Location, targetLocation: Location, radiusMeters: number): boolean => {
  const distance = calculateDistance(userLocation, targetLocation);
  return distance <= radiusMeters;
};

// 距離を表示用にフォーマット
export const formatDistance = (meters: number): string => {
  if (meters < 1000) {
    return `${Math.round(meters)}m`;
  }
  return `${(meters / 1000).toFixed(1)}km`;
};