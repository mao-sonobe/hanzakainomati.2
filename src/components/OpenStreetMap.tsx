import React, { useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { MapPin } from 'lucide-react';

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
const LocationButton: React.FC = () => {
  const map = useMap();

  const handleLocationClick = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          map.setView([latitude, longitude], 16);
          
          // 現在地マーカーを追加
          const currentLocationIcon = L.divIcon({
            html: '<div style="background: #4285f4; width: 12px; height: 12px; border-radius: 50%; border: 3px solid white; box-shadow: 0 0 6px rgba(0,0,0,0.3);"></div>',
            className: 'current-location-marker',
            iconSize: [18, 18],
            iconAnchor: [9, 9]
          });
          
          L.marker([latitude, longitude], { icon: currentLocationIcon })
            .addTo(map)
            .bindPopup('現在地')
            .openPopup();
        },
        () => {
          alert('現在地を取得できませんでした');
        }
      );
    } else {
      alert('このブラウザは位置情報をサポートしていません');
    }
  };

  return (
    <div className="leaflet-top leaflet-right" style={{ marginTop: '80px', marginRight: '10px' }}>
      <div className="leaflet-control leaflet-bar">
        <button
          onClick={handleLocationClick}
          className="bg-white border border-gray-300 w-8 h-8 flex items-center justify-center hover:bg-gray-50 rounded"
          title="現在地を表示"
        >
          <MapPin className="w-4 h-4 text-indigo-600" />
        </button>
      </div>
    </div>
  );
};

const OpenStreetMap: React.FC<OpenStreetMapProps> = ({ spots, onSpotClick }) => {
  // 藩境のまちの中心座標
  const center: [number, number] = [33.5904, 130.4017];

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
        zoom={13}
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
              <div style={{ padding: '8px', minWidth: '200px', fontFamily: "'Noto Serif JP', serif" }}>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
                  <span style={{ fontSize: '20px', marginRight: '8px' }}>{getTypeIcon(spot.type)}</span>
                  <h3 style={{ margin: '0', color: '#2e4057', fontSize: '16px' }}>{spot.name}</h3>
                </div>
                <p style={{ margin: '4px 0', color: '#666', fontSize: '14px' }}>{spot.description}</p>
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
                {spot.rating && (
                  <div style={{ display: 'flex', alignItems: 'center', margin: '4px 0' }}>
                    <span style={{ color: '#daa520', marginRight: '4px' }}>⭐</span>
                    <span style={{ fontSize: '12px' }}>{spot.rating}</span>
                  </div>
                )}
                {spot.coupon && (
                  <div style={{ background: '#ffb7c5', padding: '4px 8px', borderRadius: '4px', marginTop: '8px' }}>
                    <span style={{ fontSize: '12px', color: '#c73e1d' }}>🎫 クーポンあり</span>
                  </div>
                )}
              </div>
            </Popup>
          </Marker>
        ))}
        
        {/* 現在地ボタン */}
        <LocationButton />
      </MapContainer>
      
      {/* マップ情報 */}
      <div className="absolute bottom-2 left-2 bg-white bg-opacity-90 rounded px-2 py-1 text-xs text-gray-600">
        OpenStreetMap
      </div>
    </div>
  );
};

export default OpenStreetMap;