// 観光ルートプランニングユーティリティ
import { TouristSpot } from '../data/touristSpots';

export interface RoutePoint {
  lat: number;
  lng: number;
}

export interface RoutePlan {
  spots: TouristSpot[];
  totalDistance: number;
  estimatedTime: number;
  totalStamps: number;
  difficulty: 'easy' | 'medium' | 'hard';
  description: string;
}

export interface RouteOptions {
  maxDistance?: number; // km
  maxTime?: number; // minutes
  preferredTypes?: string[];
  includeStamps?: boolean;
  transportMode?: 'walking' | 'bicycle';
}

// 2点間の距離を計算（ハヴァーサイン公式）
export const calculateDistance = (point1: RoutePoint, point2: RoutePoint): number => {
  const R = 6371; // 地球の半径（km）
  const dLat = (point2.lat - point1.lat) * Math.PI / 180;
  const dLng = (point2.lng - point1.lng) * Math.PI / 180;
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(point1.lat * Math.PI / 180) * Math.cos(point2.lat * Math.PI / 180) * 
    Math.sin(dLng/2) * Math.sin(dLng/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c;
};

// 各スポットに現在地からの距離を追加
export const addDistancesToSpots = (spots: TouristSpot[], userLocation: RoutePoint): (TouristSpot & { distanceFromUser: number })[] => {
  return spots.map(spot => ({
    ...spot,
    distanceFromUser: calculateDistance(userLocation, { lat: spot.lat, lng: spot.lng })
  }));
};

// 最短経路問題の簡易解法（最近傍法）
export const optimizeRoute = (spots: (TouristSpot & { distanceFromUser: number })[], startPoint: RoutePoint): TouristSpot[] => {
  if (spots.length === 0) return [];
  
  const unvisited = [...spots];
  const route: TouristSpot[] = [];
  let currentPoint = startPoint;
  
  while (unvisited.length > 0) {
    // 現在地から最も近いスポットを見つける
    let nearestIndex = 0;
    let nearestDistance = calculateDistance(currentPoint, { lat: unvisited[0].lat, lng: unvisited[0].lng });
    
    for (let i = 1; i < unvisited.length; i++) {
      const distance = calculateDistance(currentPoint, { lat: unvisited[i].lat, lng: unvisited[i].lng });
      if (distance < nearestDistance) {
        nearestDistance = distance;
        nearestIndex = i;
      }
    }
    
    const nearestSpot = unvisited.splice(nearestIndex, 1)[0];
    route.push(nearestSpot);
    currentPoint = { lat: nearestSpot.lat, lng: nearestSpot.lng };
  }
  
  return route;
};

// ルート全体の距離を計算
export const calculateTotalDistance = (route: TouristSpot[], startPoint: RoutePoint): number => {
  if (route.length === 0) return 0;
  
  let totalDistance = calculateDistance(startPoint, { lat: route[0].lat, lng: route[0].lng });
  
  for (let i = 1; i < route.length; i++) {
    totalDistance += calculateDistance(
      { lat: route[i-1].lat, lng: route[i-1].lng },
      { lat: route[i].lat, lng: route[i].lng }
    );
  }
  
  return totalDistance;
};

// 所要時間を推定
export const estimateTime = (distance: number, spots: TouristSpot[], transportMode: 'walking' | 'bicycle' = 'walking'): number => {
  const speed = transportMode === 'walking' ? 4 : 15; // km/h
  const travelTime = (distance / speed) * 60; // 分
  const visitTime = spots.length * 15; // 各スポット15分
  return Math.round(travelTime + visitTime);
};

// 難易度を判定
export const getDifficulty = (distance: number, time: number): 'easy' | 'medium' | 'hard' => {
  if (distance <= 2 && time <= 90) return 'easy';
  if (distance <= 5 && time <= 180) return 'medium';
  return 'hard';
};

// おすすめルートプランを生成
export const generateRoutePlans = (
  allSpots: TouristSpot[], 
  userLocation: RoutePoint, 
  options: RouteOptions = {}
): RoutePlan[] => {
  const {
    maxDistance = 10,
    maxTime = 240,
    preferredTypes = [],
    includeStamps = true,
    transportMode = 'walking'
  } = options;

  const spotsWithDistance = addDistancesToSpots(allSpots, userLocation);
  
  // フィルタリング
  let filteredSpots = spotsWithDistance.filter(spot => spot.distanceFromUser <= maxDistance);
  
  if (preferredTypes.length > 0) {
    filteredSpots = filteredSpots.filter(spot => preferredTypes.includes(spot.type));
  }

  const plans: RoutePlan[] = [];

  // プラン1: 近場散策コース（2km以内、90分以内）
  const nearbySpots = filteredSpots
    .filter(spot => spot.distanceFromUser <= 2)
    .slice(0, 4);
  
  if (nearbySpots.length > 0) {
    const optimizedRoute = optimizeRoute(nearbySpots, userLocation);
    const totalDistance = calculateTotalDistance(optimizedRoute, userLocation);
    const estimatedTime = estimateTime(totalDistance, optimizedRoute, transportMode);
    
    if (estimatedTime <= maxTime) {
      plans.push({
        spots: optimizedRoute,
        totalDistance,
        estimatedTime,
        totalStamps: optimizedRoute.reduce((sum, spot) => sum + (spot.stamps || 0), 0),
        difficulty: getDifficulty(totalDistance, estimatedTime),
        description: '現在地周辺の見どころを効率よく巡る短時間コース'
      });
    }
  }

  // プラン2: 歴史建造物重点コース
  const historicalSpots = filteredSpots
    .filter(spot => spot.type === 'viewpoint')
    .sort((a, b) => (b.stamps || 0) - (a.stamps || 0))
    .slice(0, 6);
  
  if (historicalSpots.length > 0) {
    const optimizedRoute = optimizeRoute(historicalSpots, userLocation);
    const totalDistance = calculateTotalDistance(optimizedRoute, userLocation);
    const estimatedTime = estimateTime(totalDistance, optimizedRoute, transportMode);
    
    if (estimatedTime <= maxTime) {
      plans.push({
        spots: optimizedRoute,
        totalDistance,
        estimatedTime,
        totalStamps: optimizedRoute.reduce((sum, spot) => sum + (spot.stamps || 0), 0),
        difficulty: getDifficulty(totalDistance, estimatedTime),
        description: '歴史的建造物を中心とした文化体験コース'
      });
    }
  }

  // プラン3: 神社仏閣巡りコース
  const shrineSpots = filteredSpots
    .filter(spot => spot.type === 'shrine')
    .slice(0, 5);
  
  if (shrineSpots.length > 0) {
    const optimizedRoute = optimizeRoute(shrineSpots, userLocation);
    const totalDistance = calculateTotalDistance(optimizedRoute, userLocation);
    const estimatedTime = estimateTime(totalDistance, optimizedRoute, transportMode);
    
    if (estimatedTime <= maxTime) {
      plans.push({
        spots: optimizedRoute,
        totalDistance,
        estimatedTime,
        totalStamps: optimizedRoute.reduce((sum, spot) => sum + (spot.stamps || 0), 0),
        difficulty: getDifficulty(totalDistance, estimatedTime),
        description: '神社仏閣を巡る心の癒しコース'
      });
    }
  }

  // プラン4: スタンプ最大獲得コース
  if (includeStamps) {
    const stampSpots = filteredSpots
      .filter(spot => spot.stamps && spot.stamps > 0)
      .sort((a, b) => (b.stamps || 0) - (a.stamps || 0))
      .slice(0, 8);
    
    if (stampSpots.length > 0) {
      const optimizedRoute = optimizeRoute(stampSpots, userLocation);
      const totalDistance = calculateTotalDistance(optimizedRoute, userLocation);
      const estimatedTime = estimateTime(totalDistance, optimizedRoute, transportMode);
      
      if (estimatedTime <= maxTime) {
        plans.push({
          spots: optimizedRoute,
          totalDistance,
          estimatedTime,
          totalStamps: optimizedRoute.reduce((sum, spot) => sum + (spot.stamps || 0), 0),
          difficulty: getDifficulty(totalDistance, estimatedTime),
          description: 'スタンプを効率よく集める達成感コース'
        });
      }
    }
  }

  // プラン5: 完全制覇コース
  if (filteredSpots.length > 0) {
    const allFilteredSpots = filteredSpots.slice(0, 12); // 最大12スポット
    const optimizedRoute = optimizeRoute(allFilteredSpots, userLocation);
    const totalDistance = calculateTotalDistance(optimizedRoute, userLocation);
    const estimatedTime = estimateTime(totalDistance, optimizedRoute, transportMode);
    
    plans.push({
      spots: optimizedRoute,
      totalDistance,
      estimatedTime,
      totalStamps: optimizedRoute.reduce((sum, spot) => sum + (spot.stamps || 0), 0),
      difficulty: getDifficulty(totalDistance, estimatedTime),
      description: '藩境のまちを隅々まで楽しむ完全制覇コース'
    });
  }

  return plans.sort((a, b) => a.estimatedTime - b.estimatedTime);
};

// 時間を表示用にフォーマット
export const formatTime = (minutes: number): string => {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  if (hours > 0) {
    return `${hours}時間${mins}分`;
  }
  return `${mins}分`;
};

// 距離を表示用にフォーマット
export const formatDistance = (km: number): string => {
  if (km < 1) {
    return `${Math.round(km * 1000)}m`;
  }
  return `${km.toFixed(1)}km`;
};

// 難易度を日本語で表示
export const getDifficultyLabel = (difficulty: 'easy' | 'medium' | 'hard'): string => {
  switch (difficulty) {
    case 'easy': return '初級';
    case 'medium': return '中級';
    case 'hard': return '上級';
  }
};

// 難易度の色を取得
export const getDifficultyColor = (difficulty: 'easy' | 'medium' | 'hard'): string => {
  switch (difficulty) {
    case 'easy': return 'text-green-600 bg-green-100';
    case 'medium': return 'text-yellow-600 bg-yellow-100';
    case 'hard': return 'text-red-600 bg-red-100';
  }
};