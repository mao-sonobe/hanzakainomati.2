import React, { useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { MapPin, Navigation } from 'lucide-react';
import TextToSpeech from './TextToSpeech';
import GoogleMapsButton from './GoogleMapsButton';

// Leafletのデフォルトアイコンの問題を修正
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

interface TouristSpot {
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
}

interface OpenStreetMapProps {
  spots: TouristSpot[];
  onSpotClick?: (spot: TouristSpot) => void;
  userLocation?: { lat: number; lng: number } | null;
}

// カスタムマーカーアイコンを作成
const createCustomIcon = (type: string) => {
  let color = '#2e4057';
  let symbol = '📍';

  switch (type) {
    case 'shrine':
      color = '#c73e1d';
      symbol = '⛩️';
      break;
    case 'cafe':
      color = '#daa520';
      symbol = '☕';
      break;
    case 'nature':
      color = '#4a5d23';
      symbol = '🌿';
      break;
    case 'viewpoint':
      color = '#2e4057';
      symbol = '🏔️';
      break;
    case 'convenience':
      color = '#0066cc';
      symbol = '🏪';
      break;
  }

  const svgIcon = `
    <svg width="32" height="40" viewBox="0 0 32 40" xmlns="http://www.w3.org/2000/svg">
      <path d="M16 0C7.2 0 0 7.2 0 16c0 16 16 24 16 24s16-8 16-24C32 7.2 24.8 0 16 0z" fill="${color}"/>
      <circle cx="16" cy="16" r="8" fill="white"/>
      <text x="16" y="20" text-anchor="middle" font-size="10" fill="black">${symbol}</text>
    </svg>
  `;

  return L.divIcon({
    html: svgIcon,
    className: 'custom-marker',
    iconSize: [32, 40],
    iconAnchor: [16, 40],
    popupAnchor: [0, -40]
  });
};

// 現在地取得コンポーネント
const LocationButton: React.FC<{ onLocationFound?: (lat: number, lng: number) => void }> = ({ onLocationFound }) => {
  const map = useMap();

  const handleLocationClick = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          map.setView([latitude, longitude], 16);
          onLocationFound?.(latitude, longitude);
          
          // 現在地マーカーを追加
          const currentLocationIcon = L.divIcon({
            html: '<div style="background: #4285f4; width: 16px; height: 16px; border-radius: 50%; border: 3px solid white; box-shadow: 0 0 8px rgba(66, 133, 244, 0.6); animation: pulse 2s infinite;"></div>',
            className: 'current-location-marker',
            iconSize: [22, 22],
            iconAnchor: [11, 11]
          });
          
          L.marker([latitude, longitude], { icon: currentLocationIcon })
            .addTo(map)
            .bindPopup('📍 現在地')
            .openPopup();
        },
        () => {
          console.warn('現在地を取得できませんでした:', error.message);
        }
      );
    } else {
      console.warn('このブラウザは位置情報をサポートしていません');
    }
  };

  return (
    <div className="leaflet-top leaflet-right" style={{ marginTop: '80px', marginRight: '10px' }}>
      <div className="leaflet-control leaflet-bar">
        <button
          onClick={handleLocationClick}
          className="bg-white border border-gray-300 w-10 h-10 flex items-center justify-center hover:bg-blue-50 rounded shadow-md transition-colors"
          title="現在地を表示"
        >
          <Navigation className="w-5 h-5 text-blue-600" />
        </button>
      </div>
    </div>
  );
};

const OpenStreetMap: React.FC<OpenStreetMapProps> = ({ spots, onSpotClick, userLocation }) => {
  // デフォルト中心座標（現在地が取得できない場合は旧吉原家住宅周辺）
  const defaultCenter: [number, number] = [33.20676490535196, 130.3699682708965];
  const center: [number, number] = userLocation ? [userLocation.lat, userLocation.lng] : defaultCenter;

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

  return (
    <div className="relative">
      <MapContainer
        center={center}
        zoom={userLocation ? 16 : 13}
        style={{ height: '320px', width: '100%' }}
        className="rounded-lg border-2 border-gray-200"
      >
        {/* OpenStreetMapタイル */}
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        {/* 観光スポットマーカー */}
        {spots.map((spot) => (
          <Marker
            key={spot.id}
            position={[spot.lat, spot.lng]}
            icon={createCustomIcon(spot.type)}
            eventHandlers={{
              click: () => {
                onSpotClick?.(spot);
              }
            }}
          >
            <Popup>
              <div style={{ padding: '12px', minWidth: '280px', fontFamily: "'Noto Serif JP', serif" }}>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
                  <span style={{ fontSize: '20px', marginRight: '8px' }}>{getTypeIcon(spot.type)}</span>
                  <h3 style={{ margin: '0', color: '#2e4057', fontSize: '16px' }}>{spot.name}</h3>
                </div>
                
                {/* 音声読み上げ機能 */}
                <div style={{ marginBottom: '8px' }}>
                  <TextToSpeech 
                    text={spot.name}
                    description={spot.description}
                    language="ja"
                  />
                </div>
                
                <p style={{ margin: '8px 0', color: '#666', fontSize: '14px', lineHeight: '1.4' }}>
                  {spot.description}
                </p>
                
                {spot.stamps && (
                  <div style={{ display: 'flex', alignItems: 'center', margin: '4px 0' }}>
                    <span style={{ color: '#c73e1d', marginRight: '4px' }}>🏆</span>
                    <span style={{ fontSize: '12px', color: '#c73e1d' }}>+{spot.stamps} スタンプ</span>
                  </div>
                )}
                {spot.difficulty && (
                  <div style={{ fontSize: '12px', color: '#4a5d23', margin: '4px 0' }}>
                    難易度: {spot.difficulty}
                  </div>
                )}
                {spot.coupon && (
                  <div style={{ background: '#ffb7c5', padding: '4px 8px', borderRadius: '4px', marginTop: '8px' }}>
                    <span style={{ fontSize: '12px', color: '#c73e1d' }}>🎫 クーポンあり</span>
                  </div>
                )}
                
                {/* Google Mapsボタン */}
                <div style={{ marginTop: '12px', paddingTop: '8px', borderTop: '1px solid #eee' }}>
                  <GoogleMapsButton lat={spot.lat} lng={spot.lng} name={spot.name} />
                </div>
              </div>
            </Popup>
          </Marker>
        ))}
        
        {/* 現在地ボタン */}
        <LocationButton onLocationFound={(lat, lng) => console.log('現在地:', lat, lng)} />
        
        {/* ユーザーの現在地マーカー */}
        {userLocation && (
          <Marker
            position={[userLocation.lat, userLocation.lng]}
            icon={L.divIcon({
              html: '<div style="background: #4285f4; width: 16px; height: 16px; border-radius: 50%; border: 3px solid white; box-shadow: 0 0 8px rgba(66, 133, 244, 0.6);"></div>',
              className: 'current-location-marker',
              iconSize: [22, 22],
              iconAnchor: [11, 11]
            })}
          >
            <Popup>
              <div style={{ padding: '8px', fontFamily: "'Noto Serif JP', serif" }}>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '4px' }}>
                  <span style={{ fontSize: '16px', marginRight: '8px' }}>📍</span>
                  <h3 style={{ margin: '0', color: '#4285f4', fontSize: '14px' }}>現在地</h3>
                </div>
                <p style={{ margin: '0', color: '#666', fontSize: '12px' }}>
                  緯度: {userLocation.lat.toFixed(6)}<br/>
                  経度: {userLocation.lng.toFixed(6)}
                </p>
              </div>
            </Popup>
          </Marker>
        )}
      </MapContainer>
      
      {/* マップ情報 */}
      <div className="absolute bottom-2 left-2 bg-white bg-opacity-90 rounded px-2 py-1 text-xs text-gray-600">
        OpenStreetMap
      </div>
    </div>
  );
};

export default OpenStreetMap;