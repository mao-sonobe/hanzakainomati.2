import React, { useState } from 'react';
import { Map, MapPin, Camera, Recycle as Bicycle, Coffee, Star, Award, Navigation, Store, Clock, Users } from 'lucide-react';
import OpenStreetMap from './components/OpenStreetMap';
import { touristSpotsData, TouristSpot } from './data/touristSpots';

function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [userStamps, setUserStamps] = useState(3);
  const [userCoupons, setUserCoupons] = useState(2);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [selectedSpot, setSelectedSpot] = useState<TouristSpot | null>(null);
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);

  React.useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

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
          console.log('位置情報の取得に失敗しました:', error.message);
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 300000 // 5分間キャッシュ
        }
      );
    }
  }, []);

  const navigationItems = [
    { id: 'home', icon: Map, label: 'ホーム' },
    { id: 'map', icon: MapPin, label: 'マップ' },
    { id: 'stamps', icon: Award, label: 'スタンプ帳' },
    { id: 'bicycle', icon: Bicycle, label: '自転車' },
    { id: 'dining', icon: Coffee, label: '飲食' },
    { id: 'mypage', icon: Users, label: 'マイページ' },
  ];

  const touristSpots = [
    // 現在地周辺のスポットが動的に追加される
  ];

  const diningSpots = [
    // 現在地周辺の飲食店が動的に追加される
  ];

  const bicycleStations = [
    // 現在地周辺の自転車ステーションが動的に追加される
  ];

  const renderHomeContent = () => (
    <div className="space-y-6">
      <div className="relative h-48 bg-gradient-to-r from-indigo-900 via-indigo-800 to-red-900 rounded-lg overflow-hidden washi-texture">
        <div className="absolute inset-0 bg-black bg-opacity-30"></div>
        <div className="relative p-6 text-white">
          <h1 className="text-2xl font-bold mb-2">藩境のまち</h1>
          <p className="text-sm opacity-90">伝統と自然が織りなす観光体験</p>
          <div className="absolute bottom-4 right-4 bg-white bg-opacity-20 backdrop-blur rounded-lg p-2">
            <p className="text-xs">獲得スタンプ: {userStamps}/12</p>
          </div>
        </div>
        {/* 桜の花びらエフェクト */}
        <div className="sakura-petal" style={{left: '10%', animationDelay: '0s'}}></div>
        <div className="sakura-petal" style={{left: '20%', animationDelay: '2s'}}></div>
        <div className="sakura-petal" style={{left: '80%', animationDelay: '4s'}}></div>
      </div>

      <div className="grid grid-cols-2 gap-4">
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

      <div className="japanese-card p-4">
        <h3 className="font-semibold mb-3 text-gray-800 bamboo-border pl-3">おすすめスポット</h3>
        <div className="space-y-2">
          {touristSpotsData.length > 0 ? touristSpotsData.filter(spot => spot.type !== 'convenience').slice(0, 3).map((spot, index) => (
            <div key={index} className="flex justify-between items-center p-2 bg-gray-50 rounded">
              <div>
                <p className="font-medium text-sm">{spot.name}</p>
                <p className="text-xs text-gray-600">{spot.distance}{spot.difficulty ? ` • ${spot.difficulty}` : ''}</p>
              </div>
              {spot.stamps && (
                <div className="flex items-center">
                  <Star className="w-4 h-4 text-yellow-500 mr-1" />
                  <span className="text-sm">{spot.stamps}</span>
                </div>
              )}
            </div>
          )) : (
            <div className="text-center py-4 text-gray-500">
              <p className="text-sm">現在地を取得中...</p>
              <p className="text-xs mt-1">位置情報を許可してください</p>
            </div>
          )}
        </div>
      </div>

      <div className="japanese-card p-4">
        <h3 className="font-semibold mb-3 text-gray-800 bamboo-border pl-3">本日の特別体験</h3>
        <div className="bg-gradient-to-r from-red-50 to-yellow-50 p-3 rounded-lg border border-red-200">
          <div className="flex items-center mb-2">
            <Camera className="w-4 h-4 text-red-600 mr-2" />
            <span className="font-medium text-sm">AR神社体験</span>
          </div>
          <p className="text-xs text-gray-600 mb-2">藩境神社でAR技術による歴史解説を体験できます</p>
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
        <h3 className="font-semibold text-gray-800 bamboo-border pl-3">観光スポット一覧</h3>
        {touristSpotsData.map((spot, index) => (
          <div key={index} className="japanese-card p-4">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <div className="flex items-center mb-1">
                  <h4 className="font-medium text-gray-800">{spot.name}</h4>
                  {spot.type === 'convenience' ? (
                    <Store className="w-4 h-4 text-blue-600 ml-2" />
                  ) : spot.type === 'cafe' ? (
                    <Coffee className="w-4 h-4 text-orange-600 ml-2" />
                  ) : spot.type === 'shrine' ? (
                    <span className="ml-2">⛩️</span>
                  ) : spot.type === 'nature' ? (
                    <span className="ml-2">🌿</span>
                  ) : spot.type === 'viewpoint' ? (
                    <span className="ml-2">🏔️</span>
                  ) : null}
                </div>
                <p className="text-sm text-gray-600 mt-1">{spot.description}</p>
                {spot.distance && (
                  <p className="text-xs text-gray-500 mt-1">{spot.distance}</p>
                )}
                {spot.difficulty && (
                  <p className="text-xs text-gray-500">{spot.difficulty}</p>
                )}
                {spot.stamps && (
                  <div className="flex items-center mt-2">
                    <Award className="w-4 h-4 text-red-600 mr-1" />
                    <span className="text-sm font-medium">+{spot.stamps} スタンプ</span>
                  </div>
                )}
                {spot.rating && (
                  <div className="flex items-center mt-1">
                    <Star className="w-4 h-4 text-yellow-500 mr-1" />
                    <span className="text-sm">{spot.rating}</span>
                  </div>
                )}
                {spot.coupon && (
                  <span className="inline-block bg-red-100 text-red-800 text-xs px-2 py-1 rounded mt-1">
                    クーポンあり
                  </span>
                )}
              </div>
              <button 
                onClick={() => setSelectedSpot(spot)}
                className="bg-indigo-600 text-white px-3 py-1 rounded text-sm hover:bg-indigo-700 transition-colors"
              >
                ナビ開始
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderStampsContent = () => (
    <div className="space-y-4">
      <div className="bg-gradient-to-r from-red-50 to-yellow-50 rounded-lg p-4 border-2 border-red-200 washi-texture">
        <h2 className="text-lg font-bold text-gray-800 mb-2">スタンプ帳</h2>
        <p className="text-sm text-gray-600 mb-3">獲得したスタンプのコレクション</p>
        
        <div className="grid grid-cols-3 gap-3">
          {Array.from({ length: 12 }, (_, i) => (
            <div 
              key={i} 
              className={`aspect-square rounded-lg border-2 border-dashed flex items-center justify-center ${
                i < userStamps 
                  ? 'bg-red-100 border-red-300 stamp-effect' 
                  : 'bg-gray-50 border-gray-300'
              }`}
            >
              {i < userStamps ? (
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
            進捗: {userStamps}/12 
            <span className="ml-2 text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded">
              {Math.round((userStamps / 12) * 100)}% 完了
            </span>
          </p>
        </div>
      </div>

      <div className="japanese-card p-4">
        <h3 className="font-semibold mb-3 text-gray-800 bamboo-border pl-3">特典・報酬</h3>
        <div className="space-y-2">
          <div className="flex justify-between items-center p-2 bg-green-50 rounded">
            <span className="text-sm">5個達成特典</span>
            <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">獲得済み</span>
          </div>
          <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
            <span className="text-sm">10個達成特典</span>
            <span className="text-xs bg-gray-100 text-gray-800 px-2 py-1 rounded">7/10</span>
          </div>
          <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
            <span className="text-sm">コンプリート特典</span>
            <span className="text-xs bg-gray-100 text-gray-800 px-2 py-1 rounded">3/12</span>
          </div>
        </div>
      </div>

      <div className="japanese-card p-4">
        <h3 className="font-semibold mb-3 text-gray-800 bamboo-border pl-3">AR/VR体験履歴</h3>
        <div className="space-y-2">
          <div className="flex items-center p-2 bg-blue-50 rounded">
            <Camera className="w-4 h-4 text-blue-600 mr-2" />
            <div className="flex-1">
              <p className="text-sm font-medium">神社AR体験</p>
              <p className="text-xs text-gray-600">2024/01/15 完了</p>
            </div>
          </div>
          <div className="flex items-center p-2 bg-purple-50 rounded">
            <Camera className="w-4 h-4 text-purple-600 mr-2" />
            <div className="flex-1">
              <p className="text-sm font-medium">竹林VR散策</p>
              <p className="text-xs text-gray-600">2024/01/10 完了</p>
            </div>
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
      </div>

      <div className="japanese-card p-4">
        <h3 className="font-semibold mb-3 text-gray-800 bamboo-border pl-3">利用可能ステーション</h3>
        <div className="space-y-3">
          {bicycleStations.map((station, index) => (
            <div key={index} className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
              <div className="flex-1">
                <div className="flex items-center mb-1">
                  <p className="font-medium">{station.name}</p>
                  <Bicycle className="w-4 h-4 text-green-600 ml-2" />
                </div>
                <p className="text-sm text-gray-600">
                  {station.type === 'electric' ? '電動アシスト' : 'シティサイクル'} • {station.distance}
                </p>
                <p className="text-xs text-gray-500">
                  利用可能: {station.available}/{station.total}台
                </p>
              </div>
              <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors">
                予約
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="japanese-card p-4">
        <h3 className="font-semibold mb-3 text-gray-800 bamboo-border pl-3">利用履歴</h3>
        <div className="space-y-2">
          <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
            <div>
              <p className="text-sm font-medium">神社→竹林コース</p>
              <p className="text-xs text-gray-600">5.2km走行 • 45分 • 2024/01/15</p>
            </div>
            <div className="text-right">
              <p className="text-sm font-medium text-green-600">¥200</p>
              <Bicycle className="w-4 h-4 text-green-600 ml-auto" />
            </div>
          </div>
          <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
            <div>
              <p className="text-sm font-medium">展望台往復コース</p>
              <p className="text-xs text-gray-600">8.7km走行 • 1時間20分 • 2024/01/10</p>
            </div>
            <div className="text-right">
              <p className="text-sm font-medium text-green-600">¥350</p>
              <Bicycle className="w-4 h-4 text-green-600 ml-auto" />
            </div>
          </div>
        </div>
        
        <div className="mt-4 p-3 bg-green-50 rounded-lg border border-green-200">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">今月の利用実績</span>
            <span className="text-lg font-bold text-green-600">13.9km</span>
          </div>
          <p className="text-xs text-gray-600 mt-1">CO2削減量: 約3.2kg</p>
        </div>
      </div>
    </div>
  );

  const renderDiningContent = () => (
    <div className="space-y-4">
      <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-lg p-4 border-2 border-orange-200 washi-texture">
        <h2 className="text-lg font-bold text-gray-800 mb-2">飲食店・グルメ</h2>
        <p className="text-sm text-gray-600">口コミでクーポンを獲得しよう</p>
      </div>

      <div className="space-y-3">
        {diningSpots.map((restaurant, index) => (
          <div key={index} className="japanese-card p-4">
            <div className="flex justify-between items-start mb-2">
              <div className="flex-1">
                <h4 className="font-medium text-gray-800">{restaurant.name}</h4>
                <p className="text-sm text-gray-600 mt-1">{restaurant.cuisine}</p>
                <p className="text-xs text-gray-500 mt-1">{restaurant.distance}</p>
                <div className="flex items-center mt-2">
                  <Star className="w-4 h-4 text-yellow-500 mr-1" />
                  <span className="text-sm font-medium">{restaurant.rating}</span>
                  {restaurant.coupon && (
                    <span className="ml-2 bg-red-100 text-red-800 text-xs px-2 py-1 rounded stamp-effect">
                      クーポンあり
                    </span>
                  )}
                </div>
              </div>
              <Coffee className="w-5 h-5 text-orange-600" />
            </div>
            <div className="flex space-x-2">
              <button className="flex-1 bg-orange-600 text-white py-2 px-3 rounded text-sm hover:bg-orange-700 transition-colors">
                口コミ投稿
              </button>
              <button className="flex-1 border border-orange-600 text-orange-600 py-2 px-3 rounded text-sm hover:bg-orange-50 transition-colors">
                詳細を見る
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="japanese-card p-4">
        <h3 className="font-semibold mb-3 text-gray-800 bamboo-border pl-3">獲得クーポン</h3>
        <div className="space-y-2">
          <div className="flex justify-between items-center p-3 bg-red-50 rounded-lg border border-red-200">
            <div>
              <p className="text-sm font-medium">和風カフェ 梅</p>
              <p className="text-xs text-gray-600">抹茶セット 20%OFF</p>
              <p className="text-xs text-gray-500">有効期限: 2024/02/15</p>
            </div>
            <button className="hanko-button w-12 h-12 text-xs font-bold text-red-600">使用</button>
          </div>
          <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg border border-blue-200">
            <div>
              <p className="text-sm font-medium">茶房 風雅</p>
              <p className="text-xs text-gray-600">和スイーツ 15%OFF</p>
              <p className="text-xs text-gray-500">有効期限: 2024/02/20</p>
            </div>
            <button className="hanko-button w-12 h-12 text-xs font-bold text-blue-600">使用</button>
          </div>
        </div>
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
              <p className="text-sm font-medium">藩境神社でスタンプ獲得</p>
              <p className="text-xs text-gray-600">2024/01/15 14:30</p>
            </div>
          </div>
          <div className="flex items-center p-2 bg-orange-50 rounded">
            <Coffee className="w-4 h-4 text-orange-600 mr-3" />
            <div className="flex-1">
              <p className="text-sm font-medium">和風カフェ 梅で口コミ投稿</p>
              <p className="text-xs text-gray-600">2024/01/14 16:45</p>
            </div>
          </div>
          <div className="flex items-center p-2 bg-green-50 rounded">
            <Bicycle className="w-4 h-4 text-green-600 mr-3" />
            <div className="flex-1">
              <p className="text-sm font-medium">自転車で竹林コース走行</p>
              <p className="text-xs text-gray-600">2024/01/13 10:20</p>
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
            <p className="text-lg font-bold text-purple-600">3</p>
            <p className="text-xs text-gray-600">AR/VR体験</p>
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
        <div className={`japanese-gradient text-white ${isMobile ? 'p-4' : 'p-6'} sticky top-0 z-10`}>
          <div className="flex items-center justify-between">
            <h1 className={`${isMobile ? 'text-lg' : 'text-2xl'} font-bold`}>Tourism Mobility App</h1>
            <div className="flex items-center space-x-2">
              <Clock className="w-4 h-4" />
              <span className={`${isMobile ? 'text-sm' : 'text-base'}`}>藩境のまち</span>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className={`${isMobile ? 'p-4 pb-20' : 'p-8 pb-8'}`}>
          {isMobile ? (
            renderContent()
          ) : (
            <div className="grid grid-cols-12 gap-8">
              {/* Desktop Sidebar Navigation */}
              <div className="col-span-3">
                <div className="japanese-card p-6 sticky top-24">
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
              <div className="grid grid-cols-6 gap-1">
                {navigationItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeTab === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => setActiveTab(item.id)}
                      className={`flex flex-col items-center py-2 px-1 rounded-lg transition-colors ${
                        isActive 
                          ? 'bg-indigo-100 text-indigo-700' 
                          : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'
                      }`}
                    >
                      <Icon className={`w-5 h-5 mb-1 ${isActive ? 'text-indigo-700' : 'text-gray-600'}`} />
                      <span className="text-xs font-medium">{item.label}</span>
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