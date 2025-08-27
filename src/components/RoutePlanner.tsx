import React, { useState, useEffect } from 'react';
import { Route, Clock, MapPin, Award, Navigation, Bicycle, Users, Filter } from 'lucide-react';
import { TouristSpot } from '../data/touristSpots';
import { 
  generateRoutePlans, 
  RoutePlan, 
  RouteOptions,
  formatTime,
  formatDistance,
  getDifficultyLabel,
  getDifficultyColor
} from '../utils/routePlanning';

interface RoutePlannerProps {
  spots: TouristSpot[];
  userLocation: { lat: number; lng: number } | null;
  onRouteSelect?: (route: RoutePlan) => void;
  className?: string;
}

const RoutePlanner: React.FC<RoutePlannerProps> = ({ 
  spots, 
  userLocation, 
  onRouteSelect,
  className = '' 
}) => {
  const [routePlans, setRoutePlans] = useState<RoutePlan[]>([]);
  const [selectedPlan, setSelectedPlan] = useState<RoutePlan | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [options, setOptions] = useState<RouteOptions>({
    maxDistance: 10,
    maxTime: 240,
    preferredTypes: [],
    includeStamps: true,
    transportMode: 'walking'
  });
  const [showFilters, setShowFilters] = useState(false);

  // ルートプランを生成
  useEffect(() => {
    if (!userLocation || spots.length === 0) return;

    setIsLoading(true);
    try {
      const plans = generateRoutePlans(spots, userLocation, options);
      setRoutePlans(plans);
    } catch (error) {
      console.error('ルートプラン生成エラー:', error);
    } finally {
      setIsLoading(false);
    }
  }, [spots, userLocation, options]);

  const handlePlanSelect = (plan: RoutePlan) => {
    setSelectedPlan(plan);
    onRouteSelect?.(plan);
  };

  const handleOptionsChange = (newOptions: Partial<RouteOptions>) => {
    setOptions(prev => ({ ...prev, ...newOptions }));
  };

  const getTransportIcon = (mode: 'walking' | 'bicycle') => {
    return mode === 'walking' ? <Users className="w-4 h-4" /> : <Bicycle className="w-4 h-4" />;
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'shrine': return '⛩️';
      case 'cafe': return '☕';
      case 'nature': return '🌿';
      case 'viewpoint': return '🏔️';
      case 'convenience': return '🏪';
      default: return '📍';
    }
  };

  if (!userLocation) {
    return (
      <div className={`japanese-card p-4 text-center ${className}`}>
        <Navigation className="w-8 h-8 text-gray-400 mx-auto mb-2" />
        <p className="text-gray-500">現在地を取得してルートプランを表示します</p>
        <p className="text-sm text-gray-400 mt-1">位置情報を許可してください</p>
      </div>
    );
  }

  return (
    <div className={`space-y-4 ${className}`}>
      {/* ヘッダー */}
      <div className="japanese-card p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center">
            <Route className="w-5 h-5 text-indigo-600 mr-2" />
            <h3 className="font-semibold text-gray-800">おすすめルートプラン</h3>
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`p-2 rounded-lg transition-colors ${
              showFilters ? 'bg-indigo-100 text-indigo-600' : 'bg-gray-100 text-gray-600'
            }`}
          >
            <Filter className="w-4 h-4" />
          </button>
        </div>

        {/* フィルター */}
        {showFilters && (
          <div className="space-y-3 p-3 bg-gray-50 rounded-lg">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  移動手段
                </label>
                <select
                  value={options.transportMode}
                  onChange={(e) => handleOptionsChange({ transportMode: e.target.value as 'walking' | 'bicycle' })}
                  className="w-full p-2 border border-gray-300 rounded text-sm"
                >
                  <option value="walking">徒歩</option>
                  <option value="bicycle">自転車</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  最大時間
                </label>
                <select
                  value={options.maxTime}
                  onChange={(e) => handleOptionsChange({ maxTime: parseInt(e.target.value) })}
                  className="w-full p-2 border border-gray-300 rounded text-sm"
                >
                  <option value={90}>90分</option>
                  <option value={120}>2時間</option>
                  <option value={180}>3時間</option>
                  <option value={240}>4時間</option>
                  <option value={360}>6時間</option>
                </select>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                スポットタイプ（複数選択可）
              </label>
              <div className="flex flex-wrap gap-2">
                {[
                  { value: 'viewpoint', label: '歴史建造物', icon: '🏔️' },
                  { value: 'shrine', label: '神社仏閣', icon: '⛩️' },
                  { value: 'cafe', label: 'カフェ', icon: '☕' },
                  { value: 'nature', label: '自然', icon: '🌿' }
                ].map((type) => (
                  <button
                    key={type.value}
                    onClick={() => {
                      const currentTypes = options.preferredTypes || [];
                      const newTypes = currentTypes.includes(type.value)
                        ? currentTypes.filter(t => t !== type.value)
                        : [...currentTypes, type.value];
                      handleOptionsChange({ preferredTypes: newTypes });
                    }}
                    className={`px-3 py-1 rounded-full text-sm transition-colors ${
                      (options.preferredTypes || []).includes(type.value)
                        ? 'bg-indigo-100 text-indigo-700 border border-indigo-300'
                        : 'bg-white text-gray-600 border border-gray-300'
                    }`}
                  >
                    {type.icon} {type.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ローディング */}
      {isLoading && (
        <div className="japanese-card p-4 text-center">
          <div className="animate-spin w-6 h-6 border-2 border-indigo-600 border-t-transparent rounded-full mx-auto mb-2"></div>
          <p className="text-gray-600">最適なルートを計算中...</p>
        </div>
      )}

      {/* ルートプラン一覧 */}
      {!isLoading && routePlans.length > 0 && (
        <div className="space-y-3">
          {routePlans.map((plan, index) => (
            <div
              key={index}
              className={`japanese-card p-4 cursor-pointer transition-all ${
                selectedPlan === plan 
                  ? 'ring-2 ring-indigo-500 bg-indigo-50' 
                  : 'hover:bg-gray-50'
              }`}
              onClick={() => handlePlanSelect(plan)}
            >
              <div className="flex justify-between items-start mb-3">
                <div className="flex-1">
                  <h4 className="font-medium text-gray-800 mb-1">
                    {plan.description}
                  </h4>
                  <div className="flex items-center space-x-4 text-sm text-gray-600">
                    <div className="flex items-center">
                      <MapPin className="w-4 h-4 mr-1" />
                      <span>{plan.spots.length}スポット</span>
                    </div>
                    <div className="flex items-center">
                      <Navigation className="w-4 h-4 mr-1" />
                      <span>{formatDistance(plan.totalDistance)}</span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      <span>{formatTime(plan.estimatedTime)}</span>
                    </div>
                    {plan.totalStamps > 0 && (
                      <div className="flex items-center">
                        <Award className="w-4 h-4 mr-1 text-red-600" />
                        <span className="text-red-600">+{plan.totalStamps}</span>
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex flex-col items-end space-y-1">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(plan.difficulty)}`}>
                    {getDifficultyLabel(plan.difficulty)}
                  </span>
                  {getTransportIcon(options.transportMode || 'walking')}
                </div>
              </div>

              {/* スポット一覧（選択時のみ表示） */}
              {selectedPlan === plan && (
                <div className="mt-3 pt-3 border-t border-gray-200">
                  <h5 className="font-medium text-gray-700 mb-2">ルート詳細</h5>
                  <div className="space-y-2">
                    {plan.spots.map((spot, spotIndex) => (
                      <div key={spot.id} className="flex items-center p-2 bg-white rounded border">
                        <div className="flex items-center justify-center w-6 h-6 bg-indigo-100 text-indigo-600 rounded-full text-xs font-bold mr-3">
                          {spotIndex + 1}
                        </div>
                        <div className="flex items-center flex-1">
                          <span className="mr-2">{getTypeIcon(spot.type)}</span>
                          <div>
                            <p className="font-medium text-sm">{spot.name}</p>
                            {spot.stamps && (
                              <div className="flex items-center mt-1">
                                <Award className="w-3 h-3 text-red-600 mr-1" />
                                <span className="text-xs text-red-600">+{spot.stamps}</span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-3 p-3 bg-indigo-50 rounded-lg">
                    <div className="grid grid-cols-3 gap-4 text-center">
                      <div>
                        <p className="text-lg font-bold text-indigo-600">{formatDistance(plan.totalDistance)}</p>
                        <p className="text-xs text-gray-600">総距離</p>
                      </div>
                      <div>
                        <p className="text-lg font-bold text-indigo-600">{formatTime(plan.estimatedTime)}</p>
                        <p className="text-xs text-gray-600">所要時間</p>
                      </div>
                      <div>
                        <p className="text-lg font-bold text-red-600">+{plan.totalStamps}</p>
                        <p className="text-xs text-gray-600">獲得スタンプ</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* ルートプランなし */}
      {!isLoading && routePlans.length === 0 && (
        <div className="japanese-card p-4 text-center">
          <Route className="w-8 h-8 text-gray-400 mx-auto mb-2" />
          <p className="text-gray-500">条件に合うルートプランが見つかりませんでした</p>
          <p className="text-sm text-gray-400 mt-1">フィルター条件を調整してみてください</p>
        </div>
      )}
    </div>
  );
};

export default RoutePlanner;