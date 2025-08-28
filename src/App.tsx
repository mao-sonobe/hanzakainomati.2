import React, { useState } from 'react';
import { Map, MapPin, Recycle as Bicycle, Coffee, Star, Award, Navigation, Store, Users, CheckCircle } from 'lucide-react';
import OpenStreetMap from './components/OpenStreetMap';
import TextToSpeech from './components/TextToSpeech';
import GoogleMapsButton from './components/GoogleMapsButton';
import RoutePlanner from './components/RoutePlanner';
import { touristSpotsData, TouristSpot } from './data/touristSpots';
import { diningSpots } from './data/diningSpots';
import { bicycleStations } from './data/bicycleStations';
import { RoutePlan } from './utils/routePlanning';
import { calculateDistance, isWithinRadius, formatDistance } from './utils/distance';

function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [userStamps, setUserStamps] = useState(0);
  const [userCoupons] = useState(1);
  const [visitedSpots, setVisitedSpots] = useState<Set<string>>(new Set());
  const [collectedStamps, setCollectedStamps] = useState<{ [key: string]: { timestamp: Date; stamps: number } }>({});
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [selectedSpot, setSelectedSpot] = useState<TouristSpot | null>(null);
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [selectedRoute, setSelectedRoute] = useState<RoutePlan | null>(null);
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  React.useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // スクロール時のヘッダー表示/非表示制御
  React.useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY < lastScrollY || currentScrollY < 10) {
        // 上にスクロールまたは最上部付近の場合は表示
        setIsHeaderVisible(true);
      } else if (currentScrollY > lastScrollY && currentScrollY > 100) {
        // 下にスクロールかつ100px以上スクロールした場合は非表示
        setIsHeaderVisible(false);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  // GPS現在地取得
  React.useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
        },
        (error) => {
          console.warn('位置情報の取得に失敗しました:', error.message);
          // 位置情報が取得できない場合は旧吉原家住宅をデフォルトに設定
          setUserLocation({
            lat: 33.20676490535196,
            lng: 130.3699682708965
          });
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 300000 // 5分間キャッシュ
        }
      );
    } else {
      // Geolocationがサポートされていない場合も旧吉原家住宅を設定
      setUserLocation({
        lat: 33.20676490535196,
        lng: 130.3699682708965
      });
    }
  }, []);

  // スタンプ獲得機能
  const collectStamp = (spot: TouristSpot) => {
    if (!spot.stamps || visitedSpots.has(spot.id)) {
      if (visitedSpots.has(spot.id)) {
        alert('このスポットのスタンプは既に獲得済みです。');
      }
      return;
    }

    // 現在地が取得できない場合
    if (!userLocation) {
      console.warn('現在地を取得できません。位置情報を許可してください。');
      return;
    }

    // 50メートル以内にいるかチェック
    const distance = calculateDistance(userLocation, { lat: spot.lat, lng: spot.lng });
    const isNearby = isWithinRadius(userLocation, { lat: spot.lat, lng: spot.lng }, 50);

    if (!isNearby) {
      console.warn(`スタンプを獲得するには${spot.name}から50m以内に近づく必要があります。現在の距離: ${formatDistance(distance)}`);
      return;
    }

    const newVisitedSpots = new Set(visitedSpots);
    newVisitedSpots.add(spot.id);
    setVisitedSpots(newVisitedSpots);

    const stamps = spot.stamps ?? 0;
    const newCollectedStamps = {
      ...collectedStamps,
      [spot.id]: {
        timestamp: new Date(),
        stamps: stamps
      }
    };
    setCollectedStamps(newCollectedStamps);

    setUserStamps(prev => prev + stamps);

    // 成功メッセージ表示
    console.log(`🎉 ${spot.name}でスタンプを獲得しました！総獲得数: ${userStamps + stamps}個`);
  };

  // スポットが訪問済みかチェック
  const isSpotVisited = (spotId: string) => visitedSpots.has(spotId);

  const navigationItems = [
    { id: 'home', icon: Map, label: 'ホーム' },
    { id: 'map', icon: MapPin, label: 'マップ' },
    { id: 'route', icon: Navigation, label: 'ルート' },
    { id: 'stamps', icon: Award, label: 'スタンプ帳' },
    { id: 'bicycle', icon: Bicycle, label: '自転車' },
    { id: 'dining', icon: Coffee, label: '飲食' },
    { id: 'mypage', icon: Users, label: 'マイページ' },
  ];



  const renderHomeContent = () => (
    <div className="space-y-6">
      <div className="relative h-48 bg-gradient-to-r from-indigo-900 via-indigo-800 to-red-900 rounded-lg overflow-hidden washi-texture">
        <div className="absolute inset-0 bg-black bg-opacity-30"></div>
        <div className="relative p-4 text-white">
          <h1 className="text-2xl font-bold mb-2">藩境のまち</h1>
          <p className="text-sm opacity-90">伝統と自然が織りなす観光体験</p>
          <div className="absolute bottom-2 right-2 bg-white bg-opacity-20 backdrop-blur rounded-lg p-2">
            <p className="text-xs">獲得スタンプ: {userStamps}/12</p>
          </div>
        </div>
        {/* 桜の花びらエフェクト */}
        <div className="sakura-petal" style={{left: '10%', animationDelay: '0s'}}></div>
        <div className="sakura-petal" style={{left: '20%', animationDelay: '2s'}}></div>
        <div className="sakura-petal" style={{left: '80%', animationDelay: '4s'}}></div>
      </div>

      <div className="grid grid-cols-2 gap-2">
        <div className="japanese-card p-4">
          <div className="flex items-center mb-2">
            <Award className="w-5 h-5 text-red-600 mr-2" />
            <span className="font-semibold text-gray-800">スタンプ</span>
          </div>
          <p className="text-2xl font-bold text-red-600">{userStamps}</p>
          <p className="text-xs text-gray-600">個のスタンプを獲得</p>
        </div>

        <div className="japanese-card p-4">
          <div className="flex items-center mb-2">
            <Coffee className="w-5 h-5 text-indigo-600 mr-2" />
            <span className="font-semibold text-gray-800">クーポン</span>
          </div>
          <p className="text-2xl font-bold text-indigo-600">{userCoupons}</p>
          <p className="text-xs text-gray-600">枚のクーポン保有</p>
        </div>
      </div>

      <div className="japanese-card p-3">
        <h3 className="font-semibold mb-3 text-gray-800 bamboo-border pl-3">おすすめスポット</h3>
        <div className="space-y-2">
          {touristSpotsData.filter(spot => spot.type !== 'convenience').slice(0, 3).map((spot, index) => (
            <div key={index} className="flex justify-between items-center p-2 bg-gray-50 rounded">
              <div>
                <p className="font-medium text-sm">{spot.name}</p>
                <p className="text-xs text-gray-600">{spot.difficulty ? `${spot.difficulty}` : ''}</p>
              </div>
              {spot.stamps && (
                <div className="flex items-center">
                  <Star className="w-4 h-4 text-yellow-500 mr-1" />
                  <span className="text-sm">{spot.stamps}</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="japanese-card p-3">
        <h3 className="font-semibold mb-3 text-gray-800 bamboo-border pl-3">本日の特別体験</h3>
        <div className="bg-gradient-to-r from-red-50 to-yellow-50 p-3 rounded-lg border border-red-200">
          <div className="flex items-center mb-2">
            <Coffee className="w-4 h-4 text-red-600 mr-2" />
            <span className="font-medium text-sm">茶道体験</span>
          </div>
          <p className="text-xs text-gray-600 mb-2">伝統的な茶道の作法を学び、和の心を体験できます</p>
          <button className="hanko-button w-8 h-8 text-xs font-bold text-red-600">体験</button>
        </div>
      </div>
    </div>
  );

  const renderMapContent = () => (
    <div className="space-y-4">
      <div className="bg-gradient-to-r from-indigo-100 to-red-100 rounded-lg p-4 washi-texture">
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-lg font-bold text-gray-800">観光マップ</h2>
          <Navigation className="w-5 h-5 text-indigo-600" />
        </div>
        <OpenStreetMap 
          spots={touristSpotsData} 
          onSpotClick={(spot) => setSelectedSpot(spot)}
          userLocation={userLocation}
        />
      </div>

      {selectedSpot && (
        <div className="japanese-card p-4 border-l-4 border-indigo-600">
          <h3 className="font-semibold text-gray-800 mb-2">選択中のスポット</h3>
          <div className="flex justify-between items-start">
            <div className="flex-1">
              <h4 className="font-medium text-gray-800">{selectedSpot.name}</h4>
              <p className="text-sm text-gray-600 mt-1">{selectedSpot.description}</p>
              {selectedSpot.distance && (
                <p className="text-sm text-gray-500 mt-1">{selectedSpot.distance}</p>
              )}
              {selectedSpot.stamps && (
                <div className="flex items-center mt-2">
                  <Award className="w-4 h-4 text-red-600 mr-1" />
                  <span className="text-sm font-medium">+{selectedSpot.stamps} スタンプ</span>
                </div>
              )}
            </div>
            <button 
              onClick={() => setSelectedSpot(null)}
              className="text-gray-400 hover:text-gray-600"
            >
              ✕
            </button>
          </div>
        </div>
      )}

      <div className="space-y-3">
        <h3 className="font-semibold text-gray-800 bamboo-border pl-3 mb-2">観光スポット一覧</h3>
        {touristSpotsData.map((spot, index) => (
          <div key={index} className="japanese-card p-3">
            {/* 音声読み上げ機能 */}
            <div className="flex justify-between items-start mb-3">
              <h4 className="font-medium text-gray-800 flex-1">{spot.name}</h4>
              <TextToSpeech 
                text={spot.name}
                description={spot.description}
                language="ja"
                className="ml-2"
              />
            </div>
            
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <div className="flex items-center mb-2">
                  {spot.type === 'convenience' ? (
                    <Store className="w-4 h-4 text-blue-600 mr-2" />
                  ) : spot.type === 'cafe' ? (
                    <Coffee className="w-4 h-4 text-orange-600 mr-2" />
                  ) : spot.type === 'shrine' ? (
                    <span className="mr-2">⛩️</span>
                  ) : spot.type === 'nature' ? (
                    <span className="mr-2">🌿</span>
                  ) : spot.type === 'viewpoint' ? (
                    <span className="mr-2">🏔️</span>
                  ) : null}
                  <span className="text-sm text-gray-500">
                    {spot.type === 'viewpoint' ? '歴史的建造物' : 
                     spot.type === 'shrine' ? '神社・寺院' :
                     spot.type === 'cafe' ? 'カフェ・飲食' :
                     spot.type === 'nature' ? '自然スポット' :
                     spot.type === 'convenience' ? 'コンビニ' : '観光スポット'}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mt-2 leading-relaxed">{spot.description}</p>
                {spot.distance && (
                  <p className="text-xs text-gray-500 mt-1">{spot.distance}</p>
                )}
                {spot.difficulty && (
                  <p className="text-xs text-gray-500">{spot.difficulty}</p>
                )}
                {spot.stamps && (
                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center">
                      <Award className="w-4 h-4 text-red-600 mr-1" />
                      <span className="text-sm font-medium">+1 スタンプ</span>
                    </div>
                    {isSpotVisited(spot.id) ? (
                      <div className="flex items-center text-green-600">
                        <CheckCircle className="w-4 h-4 mr-1" />
                        <span className="text-sm">獲得済み</span>
                      </div>
                    ) : (
                      <button
                        onClick={() => {
                          if (!userLocation) {
                            console.warn('現在地を取得できません。位置情報を許可してください。');
                            return;
                          }
                          collectStamp(spot);
                        }}
                        className={`px-3 py-1 rounded text-sm transition-colors ${
                          userLocation && isWithinRadius(userLocation, { lat: spot.lat, lng: spot.lng }, 50)
                            ? 'bg-red-600 text-white hover:bg-red-700'
                            : 'bg-gray-400 text-white cursor-not-allowed'
                        }`}
                      >
                        {userLocation && isWithinRadius(userLocation, { lat: spot.lat, lng: spot.lng }, 50) 
                          ? 'スタンプ獲得' 
                          : `${formatDistance(calculateDistance(userLocation || { lat: 0, lng: 0 }, { lat: spot.lat, lng: spot.lng }))}`
                        }
                      </button>
                    )}
                  </div>
                )}
                {spot.coupon && (
                  <span className="inline-block bg-red-100 text-red-800 text-xs px-2 py-1 rounded mt-1">
                    クーポンあり
                  </span>
                )}
              </div>
            </div>
            
            {/* Google Mapsボタンとナビボタン */}
            <div className="flex justify-between items-center mt-4 pt-3 border-t border-gray-100">
              <GoogleMapsButton lat={spot.lat} lng={spot.lng} name={spot.name} />
              <button 
                onClick={() => setSelectedSpot(spot)}
                className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-indigo-700 transition-colors"
              >
                詳細表示
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderRouteContent = () => (
    <div className="space-y-4">
      <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-4 border-2 border-green-200 washi-texture">
        <h2 className="text-lg font-bold text-gray-800 mb-2">ルートプランナー</h2>
        <p className="text-sm text-gray-600">現在地から最適な観光ルートを提案します</p>
      </div>

      <RoutePlanner 
        spots={touristSpotsData}
        userLocation={userLocation}
        onRouteSelect={(route) => setSelectedRoute(route)}
      />

      {selectedRoute && (
        <div className="japanese-card p-4 border-l-4 border-green-600">
          <h3 className="font-semibold text-gray-800 mb-2">選択中のルート</h3>
          <div className="bg-green-50 p-3 rounded-lg">
            <h4 className="font-medium text-green-800 mb-2">{selectedRoute.description}</h4>
            <div className="grid grid-cols-3 gap-4 text-center mb-3">
              <div>
                <p className="text-lg font-bold text-green-600">{selectedRoute.spots.length}</p>
                <p className="text-xs text-gray-600">スポット</p>
              </div>
              <div>
                <p className="text-lg font-bold text-green-600">{Math.round(selectedRoute.totalDistance * 10) / 10}km</p>
                <p className="text-xs text-gray-600">総距離</p>
              </div>
              <div>
                <p className="text-lg font-bold text-green-600">{Math.round(selectedRoute.estimatedTime)}分</p>
                <p className="text-xs text-gray-600">所要時間</p>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <Award className="w-4 h-4 text-red-600 mr-1" />
                <span className="text-sm font-medium text-red-600">+{selectedRoute.totalStamps} スタンプ獲得</span>
              </div>
              <button 
                onClick={() => setActiveTab('map')}
                className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-green-700 transition-colors"
              >
                マップで確認
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  const renderStampsContent = () => (
    <div className="space-y-4">
      <div className="bg-gradient-to-r from-red-50 to-yellow-50 rounded-lg p-4 border-2 border-red-200 washi-texture">
        <h2 className="text-lg font-bold text-gray-800 mb-2">スタンプ帳</h2>
        <p className="text-sm text-gray-600 mb-3">獲得したスタンプのコレクション</p>
        
        <div className="grid grid-cols-3 gap-3">
          {Array.from({ length: 17 }, (_, i) => (
            <div 
              key={i} 
              className={`aspect-square rounded-lg border-2 border-dashed flex items-center justify-center ${
                i < Object.keys(collectedStamps).length
                  ? 'bg-red-100 border-red-300 stamp-effect' 
                  : 'bg-gray-50 border-gray-300'
              }`}
            >
              {i < Object.keys(collectedStamps).length ? (
                <div className="text-center">
                  <Award className="w-6 h-6 text-red-600 mx-auto mb-1" />
                  <p className="text-xs font-medium">#{i + 1}</p>
                </div>
              ) : (
                <p className="text-gray-400 text-xs">未獲得</p>
              )}
            </div>
          ))}
        </div>
        
        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600">
            進捗: {Object.keys(collectedStamps).length}/{touristSpotsData.filter(spot => spot.stamps).length}
            <span className="ml-2 text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded">
              {Math.round((Object.keys(collectedStamps).length / touristSpotsData.filter(spot => spot.stamps).length) * 100)}% 完了
            </span>
          </p>
        </div>
      </div>

      <div className="japanese-card p-4">
        <h3 className="font-semibold mb-3 text-gray-800 bamboo-border pl-3">獲得履歴</h3>
        <div className="space-y-2 max-h-48 overflow-y-auto">
          {Object.entries(collectedStamps)
            .sort(([,a], [,b]) => b.timestamp.getTime() - a.timestamp.getTime())
            .map(([spotId, data]) => {
              const spot = touristSpotsData.find(s => s.id === spotId);
              return (
                <div key={spotId} className="flex items-center justify-between p-2 bg-green-50 rounded">
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                    <div>
                      <p className="text-sm font-medium">{spot?.name}</p>
                      <p className="text-xs text-gray-600">
                        {data.timestamp.toLocaleDateString('ja-JP')} {data.timestamp.toLocaleTimeString('ja-JP', { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Award className="w-4 h-4 text-red-600 mr-1" />
                    <span className="text-sm font-bold text-red-600">+1</span>
                  </div>
                </div>
              );
            })}
          {Object.keys(collectedStamps).length === 0 && (
            <p className="text-center text-gray-500 py-4">まだスタンプを獲得していません</p>
          )}
        </div>
      </div>
      <div className="japanese-card p-4">
        <h3 className="font-semibold mb-3 text-gray-800 bamboo-border pl-3">特典・報酬</h3>
        <div className="space-y-2">
          <div className="flex justify-between items-center p-2 bg-green-50 rounded">
            <span className="text-sm">5個達成特典</span>
            <span className={`text-xs px-2 py-1 rounded ${
              Object.keys(collectedStamps).length >= 5 
                ? 'bg-green-100 text-green-800' 
                : 'bg-gray-100 text-gray-800'
            }`}>
              {Object.keys(collectedStamps).length >= 5 ? '獲得済み' : `${Object.keys(collectedStamps).length}/5`}
            </span>
          </div>
          <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
            <span className="text-sm">10個達成特典</span>
            <span className={`text-xs px-2 py-1 rounded ${
              Object.keys(collectedStamps).length >= 10 
                ? 'bg-green-100 text-green-800' 
                : 'bg-gray-100 text-gray-800'
            }`}>
              {Object.keys(collectedStamps).length >= 10 ? '獲得済み' : `${Object.keys(collectedStamps).length}/10`}
            </span>
          </div>
          <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
            <span className="text-sm">コンプリート特典</span>
            <span className={`text-xs px-2 py-1 rounded ${
              Object.keys(collectedStamps).length >= touristSpotsData.filter(spot => spot.stamps).length
                ? 'bg-green-100 text-green-800' 
                : 'bg-gray-100 text-gray-800'
            }`}>
              {Object.keys(collectedStamps).length >= touristSpotsData.filter(spot => spot.stamps).length ? '獲得済み' : `${Object.keys(collectedStamps).length}/${touristSpotsData.filter(spot => spot.stamps).length}`}
            </span>
          </div>
        </div>
      </div>

    </div>
  );

  const renderBicycleContent = () => (
    <div className="space-y-4">
      <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-4 border-2 border-green-200 washi-texture">
            <h2 className="text-lg font-bold text-gray-800 mb-2">自転車シェア</h2>
        <p className="text-sm text-gray-600 mb-3">エコな移動で藩境のまちを巡ろう</p>
        <OpenStreetMap 
          spots={bicycleStations.map(station => ({
            id: station.id,
            name: station.name,
            lat: station.lat,
            lng: station.lng,
            type: 'convenience' as const,
            stamps: 0,
            difficulty: `${station.type === 'electric' ? '電動アシスト' : station.type === 'city' ? 'シティサイクル' : 'スポーツバイク'} • ${station.available_bikes}/${station.total_capacity}台 • ${station.status === 'available' ? '利用可能' : station.status === 'full' ? '満車' : 'メンテナンス中'}`,
            description: station.description,
            rating: undefined,
            coupon: false
          }))}
          onSpotClick={(spot) => {
            const station = bicycleStations.find(s => s.id === spot.id);
            if (station) {
              setSelectedSpot({
                ...spot,
                description: station.description
              });
            }
          }}
          userLocation={userLocation}
        />
      </div>

      {selectedSpot && bicycleStations.find(s => s.id === selectedSpot.id) && (
        <div className="japanese-card p-4 border-l-4 border-green-600">
          <h3 className="font-semibold text-gray-800 mb-2">選択中のステーション</h3>
          <div className="flex justify-between items-start">
            <div className="flex-1">
              <h4 className="font-medium text-gray-800">{selectedSpot.name}</h4>
              <p className="text-sm text-gray-600 mt-1">{selectedSpot.description}</p>
              {(() => {
                const station = bicycleStations.find(s => s.id === selectedSpot.id);
                return station && (
                  <div className="mt-2">
                    <div className="flex items-center space-x-4 text-sm">
                      <span className={`px-2 py-1 rounded text-xs ${
                        station.status === 'available' ? 'bg-green-100 text-green-800' :
                        station.status === 'full' ? 'bg-red-100 text-red-800' :
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                        {station.status === 'available' ? '利用可能' :
                         station.status === 'full' ? '満車' : 'メンテナンス中'}
                      </span>
                      <span className="text-gray-600">
                        {station.available_bikes}/{station.total_capacity}台
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {station.features.map((feature: string, index: number) => (
                        <span key={index} className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>
                );
              })()}
            </div>
            <button 
              onClick={() => setSelectedSpot(null)}
              className="text-gray-400 hover:text-gray-600"
            >
              ✕
            </button>
          </div>
        </div>
      )}

      <div className="japanese-card p-4">
        <h3 className="font-semibold mb-3 text-gray-800 bamboo-border pl-3">利用可能ステーション</h3>
        <div className="space-y-3">
          {bicycleStations.map((station) => {
            // 候補地の場合は利用可能として表示
            const displayStatus = station.id.includes('candidate') ? 'available' : station.status;
            const displayAvailable = station.id.includes('candidate') ? Math.floor(Math.random() * 5) + 3 : station.available_bikes;
            const displayCapacity = station.id.includes('candidate') ? station.total_capacity : station.total_capacity;
            
            return (
            <div key={station.id} className={`flex justify-between items-center p-3 rounded-lg ${
              displayStatus === 'available' ? 'bg-blue-50' :
              displayStatus === 'full' ? 'bg-gray-100' :
              'bg-yellow-50'
            }`}>
              <div className="flex-1">
                <div className="flex items-center mb-1">
                  <p className="font-medium">
                    {station.name}
                    {station.id.includes('candidate') && (
                      <span className="ml-2 text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded">
                        新設
                      </span>
                    )}
                  </p>
                  <Bicycle className={`w-4 h-4 ml-2 ${
                    displayStatus === 'available' ? 'text-green-600' :
                    displayStatus === 'full' ? 'text-gray-400' :
                    'text-yellow-600'
                  }`} />
                </div>
                <p className="text-sm text-gray-600">
                  {station.type === 'electric' ? '電動アシスト' :
                   station.type === 'city' ? 'シティサイクル' :
                   'スポーツバイク'} • 徒歩{Math.floor(Math.random() * 8) + 2}分
                  {station.id.includes('candidate') && ' • 新規オープン'}
                </p>
                <p className="text-xs text-gray-500">
                  利用可能: {displayAvailable}/{displayCapacity}台
                  {displayStatus === 'full' && '（満車）'}
                  {station.id.includes('candidate') && '（新設記念キャンペーン中）'}
                </p>
              </div>
              <button 
                className={`px-4 py-2 rounded transition-colors ${
                  displayStatus === 'available' 
                    ? 'bg-blue-600 text-white hover:bg-blue-700' 
                    : 'bg-gray-400 text-white cursor-not-allowed'
                }`}
                disabled={displayStatus !== 'available'}
                onClick={() => {
                  if (station.id.includes('candidate')) {
                    alert(`🎉 ${station.name}で自転車を予約しました！\n新設記念で初回30分無料です。`);
                  } else {
                    alert(`${station.name}で自転車を予約しました！`);
                  }
                }}
              >
                {displayStatus === 'available' ? (station.id.includes('candidate') ? '予約（無料）' : '予約') :
                 displayStatus === 'full' ? '満車' :
                 'メンテナンス中'}
              </button>
            </div>
          );
          })}
        </div>
      </div>

      <div className="japanese-card p-4">
        <h3 className="font-semibold mb-3 text-gray-800 bamboo-border pl-3">利用履歴</h3>
        <div className="space-y-2">
          <div className="flex justify-between items-center p-2 bg-green-50 rounded">
            <div>
              <p className="text-sm font-medium">藩境のまち広場 → 旧吉原家住宅</p>
              <p className="text-xs text-gray-600">1.2km走行 • 8分 • 今日 14:30</p>
              <div className="flex items-center mt-1">
                <span className="text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded mr-2">電動アシスト</span>
                <span className="text-xs text-green-600">CO2削減: 0.3kg</span>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm font-medium text-green-600">¥150</p>
              <Bicycle className="w-4 h-4 text-green-600 ml-auto" />
            </div>
          </div>
          <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
            <div>
              <p className="text-sm font-medium">小保八幡神社 → 光楽寺 → 法泉寺</p>
              <p className="text-xs text-gray-600">2.8km走行 • 22分 • 昨日 10:15</p>
              <div className="flex items-center mt-1">
                <span className="text-xs bg-gray-100 text-gray-800 px-2 py-0.5 rounded mr-2">シティサイクル</span>
                <span className="text-xs text-green-600">CO2削減: 0.7kg</span>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm font-medium text-green-600">¥200</p>
              <Bicycle className="w-4 h-4 text-green-600 ml-auto" />
            </div>
          </div>
          <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
            <div>
              <p className="text-sm font-medium">庄分酢・高橋家住宅 → 森田うるし店</p>
              <p className="text-xs text-gray-600">0.8km走行 • 5分 • 1/20 16:45</p>
              <div className="flex items-center mt-1">
                <span className="text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded mr-2">電動アシスト</span>
                <span className="text-xs text-green-600">CO2削減: 0.2kg</span>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm font-medium text-green-600">¥100</p>
              <Bicycle className="w-4 h-4 text-green-600 ml-auto" />
            </div>
          </div>
          <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
            <div>
              <p className="text-sm font-medium">願蓮寺 → 中村家住宅 → 木下家蔵</p>
              <p className="text-xs text-gray-600">1.5km走行 • 12分 • 1/18 13:20</p>
              <div className="flex items-center mt-1">
                <span className="text-xs bg-gray-100 text-gray-800 px-2 py-0.5 rounded mr-2">シティサイクル</span>
                <span className="text-xs text-green-600">CO2削減: 0.4kg</span>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm font-medium text-green-600">¥150</p>
              <Bicycle className="w-4 h-4 text-green-600 ml-auto" />
            </div>
          </div>
          <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
            <div>
              <p className="text-sm font-medium">旧緒方家住宅 → 御堺江湖 → 藩境の石列</p>
              <p className="text-xs text-gray-600">1.8km走行 • 15分 • 1/15 11:30</p>
              <div className="flex items-center mt-1">
                <span className="text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded mr-2">電動アシスト</span>
                <span className="text-xs text-green-600">CO2削減: 0.5kg</span>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm font-medium text-green-600">¥180</p>
              <Bicycle className="w-4 h-4 text-green-600 ml-auto" />
            </div>
          </div>
        </div>
        
        <div className="mt-4 p-3 bg-green-50 rounded-lg border border-green-200">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">今月の利用実績</span>
            <span className="text-lg font-bold text-green-600">8.1km</span>
          </div>
          <div className="grid grid-cols-3 gap-2 mt-2 text-center">
            <div>
              <p className="text-sm font-bold text-green-600">5回</p>
              <p className="text-xs text-gray-600">利用回数</p>
            </div>
            <div>
              <p className="text-sm font-bold text-green-600">¥780</p>
              <p className="text-xs text-gray-600">利用料金</p>
            </div>
            <div>
              <p className="text-sm font-bold text-green-600">2.1kg</p>
              <p className="text-xs text-gray-600">CO2削減</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderDiningContent = () => (
    <div className="space-y-4">
      <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-lg p-4 border-2 border-orange-200 washi-texture">
        <h2 className="text-lg font-bold text-gray-800 mb-2">飲食店・グルメ</h2>
        <p className="text-sm text-gray-600 mb-3">地元の美味しいお店を発見しよう</p>
        <OpenStreetMap 
          spots={diningSpots.map(spot => ({
            ...spot,
            type: spot.type === 'restaurant' ? 'cafe' as const : 
                  spot.type === 'cafe' ? 'cafe' as const :
                  spot.type === 'sweets' ? 'cafe' as const :
                  'cafe' as const,
            stamps: 0,
            difficulty: spot.cuisine
          }))}
          onSpotClick={(spot) => {
            const diningSpot = diningSpots.find(d => d.id === spot.id);
            if (diningSpot) {
              setSelectedSpot({
                ...spot,
                description: diningSpot.description,
                rating: diningSpot.rating
              });
            }
          }}
          userLocation={userLocation}
        />
      </div>

      {selectedSpot && diningSpots.find(d => d.id === selectedSpot.id) && (
        <div className="japanese-card p-4 border-l-4 border-orange-600">
          <h3 className="font-semibold text-gray-800 mb-2">選択中の飲食店</h3>
          <div className="flex justify-between items-start">
            <div className="flex-1">
              <h4 className="font-medium text-gray-800">{selectedSpot.name}</h4>
              <p className="text-sm text-gray-600 mt-1">{selectedSpot.description}</p>
              {selectedSpot.rating && (
                <div className="flex items-center mt-2">
                  <Star className="w-4 h-4 text-yellow-500 mr-1" />
                  <span className="text-sm font-medium">{selectedSpot.rating}</span>
                </div>
              )}
            </div>
            <button 
              onClick={() => setSelectedSpot(null)}
              className="text-gray-400 hover:text-gray-600"
            >
              ✕
            </button>
          </div>
        </div>
      )}

      <div className="japanese-card p-4">
        <h3 className="font-semibold mb-3 text-gray-800 bamboo-border pl-3">獲得クーポン</h3>
        <div className="space-y-2">
          <div className="flex justify-between items-center p-3 bg-yellow-50 rounded-lg border border-yellow-200">
            <div>
              <p className="text-sm font-medium">庄分酢レストラン</p>
              <p className="text-xs text-gray-600">お食事代 15%OFF</p>
              <p className="text-xs text-gray-500">有効期限: 2024/03/31</p>
            </div>
            <button className="hanko-button w-12 h-12 text-xs font-bold text-yellow-600">使用</button>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        <h3 className="font-semibold text-gray-800 bamboo-border pl-3 mb-2">飲食店一覧</h3>
  {diningSpots.map((restaurant) => (
          <div key={restaurant.id} className="japanese-card p-4">
            <div className="flex justify-between items-start mb-2">
              <div className="flex-1">
                <h4 className="font-medium text-gray-800">{restaurant.name}</h4>
                <p className="text-sm text-gray-600 mt-1">{restaurant.cuisine}</p>
                <p className="text-sm text-gray-600 mt-2 leading-relaxed">{restaurant.description}</p>
                {restaurant.price_range && (
                  <p className="text-xs text-gray-500 mt-1">価格帯: {restaurant.price_range}</p>
                )}
                {restaurant.opening_hours && (
                  <p className="text-xs text-gray-500">営業時間: {restaurant.opening_hours}</p>
                )}
                <div className="flex items-center mt-2">
                  <Star className="w-4 h-4 text-yellow-500 mr-1" />
                  <span className="text-sm font-medium">{restaurant.rating || 4.0}</span>
                  {restaurant.coupon && (
                    <span className="ml-2 bg-red-100 text-red-800 text-xs px-2 py-1 rounded stamp-effect">
                      クーポンあり
                    </span>
                  )}
                </div>
              </div>
              <Coffee className="w-5 h-5 text-orange-600" />
            </div>
            
            {/* Google Mapsボタンとナビボタン */}
            <div className="flex justify-between items-center mt-4 pt-3 border-t border-gray-100">
              <GoogleMapsButton lat={restaurant.lat} lng={restaurant.lng} name={restaurant.name} />
              <button className="flex-1 bg-orange-600 text-white py-2 px-3 rounded text-sm hover:bg-orange-700 transition-colors">
                口コミ投稿
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderMyPageContent = () => (
    <div className="space-y-4">
      <div className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-lg p-4 border-2 border-purple-200 washi-texture">
        <h2 className="text-lg font-bold text-gray-800 mb-2">マイページ</h2>
        <p className="text-sm text-gray-600">あなたの観光記録</p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="japanese-card p-4 text-center">
          <Award className="w-8 h-8 text-red-600 mx-auto mb-2" />
          <p className="text-2xl font-bold text-red-600">{userStamps}</p>
          <p className="text-xs text-gray-600">獲得スタンプ</p>
        </div>
        <div className="japanese-card p-4 text-center">
          <Coffee className="w-8 h-8 text-orange-600 mx-auto mb-2" />
          <p className="text-2xl font-bold text-orange-600">{userCoupons}</p>
          <p className="text-xs text-gray-600">保有クーポン</p>
        </div>
      </div>

      <div className="japanese-card p-4">
        <h3 className="font-semibold mb-3 text-gray-800 bamboo-border pl-3">最近の活動</h3>
        <div className="space-y-3">
          <div className="flex items-center p-2 bg-red-50 rounded">
            <Award className="w-4 h-4 text-red-600 mr-3" />
            <div className="flex-1">
              <p className="text-sm font-medium">スタンプを獲得しました</p>
              <p className="text-xs text-gray-600">観光スポットを訪問してスタンプを集めよう</p>
            </div>
          </div>
        </div>
      </div>

      <div className="japanese-card p-4">
        <h3 className="font-semibold mb-3 text-gray-800 bamboo-border pl-3">統計情報</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center p-3 bg-blue-50 rounded">
            <p className="text-lg font-bold text-blue-600">13.9km</p>
            <p className="text-xs text-gray-600">総走行距離</p>
          </div>
          <div className="text-center p-3 bg-green-50 rounded">
            <p className="text-lg font-bold text-green-600">7</p>
            <p className="text-xs text-gray-600">口コミ投稿数</p>
          </div>
          <div className="text-center p-3 bg-purple-50 rounded">
            <p className="text-lg font-bold text-purple-600">2</p>
            <p className="text-xs text-gray-600">茶道体験</p>
          </div>
          <div className="text-center p-3 bg-yellow-50 rounded">
            <p className="text-lg font-bold text-yellow-600">15</p>
            <p className="text-xs text-gray-600">訪問スポット</p>
          </div>
        </div>
      </div>

      <div className="japanese-card p-4">
        <h3 className="font-semibold mb-3 text-gray-800 bamboo-border pl-3">設定</h3>
        <div className="space-y-2">
          <button className="w-full text-left p-2 hover:bg-gray-50 rounded">
            <p className="text-sm">プロフィール編集</p>
          </button>
          <button className="w-full text-left p-2 hover:bg-gray-50 rounded">
            <p className="text-sm">通知設定</p>
          </button>
          <button className="w-full text-left p-2 hover:bg-gray-50 rounded">
            <p className="text-sm">言語設定</p>
          </button>
          <button className="w-full text-left p-2 hover:bg-gray-50 rounded">
            <p className="text-sm">プライバシー設定</p>
          </button>
        </div>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'home': return renderHomeContent();
      case 'map': return renderMapContent();
      case 'route': return renderRouteContent();
      case 'stamps': return renderStampsContent();
      case 'bicycle': return renderBicycleContent();
      case 'dining': return renderDiningContent();
      case 'mypage': return renderMyPageContent();
      default: return renderHomeContent();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-red-50 to-indigo-50">
      <div className={`${isMobile ? 'max-w-md' : 'max-w-6xl'} mx-auto bg-white shadow-lg min-h-screen`}>
        {/* Header */}
        <div className={`relative overflow-hidden ${isMobile ? 'p-4' : 'p-6'} fixed top-0 left-1/2 transform -translate-x-1/2 w-full ${isMobile ? 'max-w-md' : 'max-w-6xl'} z-[9999] transition-transform duration-300 ${
          isHeaderVisible ? 'translate-y-0' : '-translate-y-full'
        }`} style={{
          background: 'linear-gradient(135deg, #2e4057 0%, #c73e1d 50%, #daa520 100%)',
          boxShadow: '0 4px 20px rgba(0,0,0,0.15)'
        }}>
          {/* 和紙テクスチャー背景 */}
          <div className="absolute inset-0 opacity-10" style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.3) 1px, transparent 0)`,
            backgroundSize: '20px 20px'
          }}></div>
          
          {/* 装飾的な円形パターン */}
          <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full border-2 border-white opacity-10"></div>
          <div className="absolute -bottom-8 -left-8 w-24 h-24 rounded-full border border-white opacity-10"></div>
          
          <div className="relative flex items-center justify-between">
            <div className="flex items-center space-x-3">
              {/* 印章風アイコン */}
              <div className="w-10 h-10 bg-white bg-opacity-20 rounded-full flex items-center justify-center backdrop-blur-sm border border-white border-opacity-30">
                <span className="text-white font-bold text-lg">藩</span>
              </div>
              <div>
                <h1 className={`${isMobile ? 'text-xl' : 'text-3xl'} font-bold text-white tracking-wider`} style={{
                  fontFamily: "'Noto Serif JP', serif",
                  textShadow: '2px 2px 4px rgba(0,0,0,0.3)'
                }}>
                  藩境のまち
                </h1>
                <p className={`${isMobile ? 'text-xs' : 'text-sm'} text-white opacity-90 tracking-wide`} style={{
                  fontFamily: "'Noto Serif JP', serif"
                }}>
                  歴史と文化の散策路
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              {/* スタンプ数表示 */}
              <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-lg px-3 py-2 border border-white border-opacity-30">
                <div className="flex items-center space-x-2">
                  <Award className="w-4 h-4 text-yellow-300" />
                  <span className={`${isMobile ? 'text-sm' : 'text-base'} text-white font-bold`}>
                    {userStamps}
                  </span>
                </div>
                <p className="text-xs text-white opacity-80">スタンプ</p>
              </div>
              
              {/* 時刻表示 */}
              <div className="hidden sm:flex items-center space-x-2 bg-white bg-opacity-10 rounded-lg px-3 py-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-white text-sm opacity-90">
                  {new Date().toLocaleTimeString('ja-JP', { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className={`${isMobile ? 'p-4 pb-20 pt-20' : 'p-8 pb-8 pt-24'}`}>
          {isMobile ? (
            renderContent()
          ) : (
            <div className="grid grid-cols-12 gap-4">
              {/* Desktop Sidebar Navigation */}
              <div className="col-span-3">
                <div className={`japanese-card p-6 sticky transition-all duration-300 ${
                  isHeaderVisible ? 'top-6' : 'top-2'
                }`}>
                  <h2 className="text-xl font-bold text-gray-800 mb-6 bamboo-border pl-3">メニュー</h2>
                  <nav className="space-y-2">
                    {navigationItems.map((item) => {
                      const Icon = item.icon;
                      const isActive = activeTab === item.id;
                      return (
                        <button
                          key={item.id}
                          onClick={() => setActiveTab(item.id)}
                          className={`w-full flex items-center p-3 rounded-lg transition-colors text-left ${
                            isActive 
                              ? 'bg-indigo-100 text-indigo-700 border-l-4 border-indigo-700' 
                              : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'
                          }`}
                        >
                          <Icon className={`w-5 h-5 mr-3 ${isActive ? 'text-indigo-700' : 'text-gray-600'}`} />
                          <span className="font-medium">{item.label}</span>
                        </button>
                      );
                    })}
                  </nav>
                </div>
              </div>
              
              {/* Desktop Main Content */}
              <div className="col-span-9">
                {renderContent()}
              </div>
            </div>
          )}
        </div>

        {/* Bottom Navigation */}
        {isMobile && (
          <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-md">
            <div className="bg-white border-t border-gray-200 px-2 py-2">
              <div className="grid grid-cols-7 gap-0.5">
                {navigationItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeTab === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => setActiveTab(item.id)}
                      className={`flex flex-col items-center py-1.5 px-0.5 rounded transition-colors ${
                        isActive 
                          ? 'bg-indigo-100 text-indigo-700' 
                          : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'
                      }`}
                    >
                      <Icon className={`w-4 h-4 mb-0.5 ${isActive ? 'text-indigo-700' : 'text-gray-600'}`} />
                      <span className="text-xs font-medium leading-tight">{item.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;