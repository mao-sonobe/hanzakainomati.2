import React, { useEffect, useRef, useState } from 'react';
import { Loader } from '@googlemaps/js-api-loader';
import { MapPin, Star, Award, Coffee, Store, Camera } from 'lucide-react';

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

interface GoogleMapProps {
  spots: TouristSpot[];
  onSpotClick?: (spot: TouristSpot) => void;
}

const GoogleMap: React.FC<GoogleMapProps> = ({ spots, onSpotClick }) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [markers, setMarkers] = useState<google.maps.Marker[]>([]);
  const [selectedSpot, setSelectedSpot] = useState<TouristSpot | null>(null);

  // 藩境のまちの中心座標（例：福岡県の座標）
  const center = { lat: 33.5904, lng: 130.4017 };

  useEffect(() => {
    const initMap = async () => {
      const loader = new Loader({
        apiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY || 'YOUR_API_KEY_HERE',
        version: 'weekly',
        libraries: ['places']
      });

      try {
        await loader.load();
        
        if (mapRef.current) {
          const mapInstance = new google.maps.Map(mapRef.current, {
            center: center,
            zoom: 14,
            styles: [
              // 和風テーマのマップスタイル
              {
                featureType: 'all',
                elementType: 'geometry',
                stylers: [{ color: '#f5f5dc' }]
              },
              {
                featureType: 'water',
                elementType: 'geometry',
                stylers: [{ color: '#4a5d23' }]
              },
              {
                featureType: 'road',
                elementType: 'geometry',
                stylers: [{ color: '#ffffff' }]
              },
              {
                featureType: 'poi.park',
                elementType: 'geometry',
                stylers: [{ color: '#c8d5b9' }]
              }
            ]
          });

          setMap(mapInstance);
          
          // マーカーを追加
          const newMarkers = spots.map(spot => {
            const marker = new google.maps.Marker({
              position: { lat: spot.lat, lng: spot.lng },
              map: mapInstance,
              title: spot.name,
              icon: getMarkerIcon(spot.type)
            });

            // インフォウィンドウ
            const infoWindow = new google.maps.InfoWindow({
              content: createInfoWindowContent(spot)
            });

            marker.addListener('click', () => {
              infoWindow.open(mapInstance, marker);
              setSelectedSpot(spot);
              onSpotClick?.(spot);
            });

            return marker;
          });

          setMarkers(newMarkers);
        }
      } catch (error) {
        console.error('Google Maps loading error:', error);
      }
    };

    initMap();

    return () => {
      // クリーンアップ
      markers.forEach(marker => marker.setMap(null));
    };
  }, [spots, onSpotClick]);

  const getMarkerIcon = (type: string) => {
    const iconBase = 'data:image/svg+xml;base64,';
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

    const svg = `
      <svg width="32" height="40" viewBox="0 0 32 40" xmlns="http://www.w3.org/2000/svg">
        <path d="M16 0C7.2 0 0 7.2 0 16c0 16 16 24 16 24s16-8 16-24C32 7.2 24.8 0 16 0z" fill="${color}"/>
        <circle cx="16" cy="16" r="8" fill="white"/>
        <text x="16" y="20" text-anchor="middle" font-size="12">${symbol}</text>
      </svg>
    `;

    return {
      url: iconBase + btoa(svg),
      scaledSize: new google.maps.Size(32, 40),
      anchor: new google.maps.Point(16, 40)
    };
  };

  const createInfoWindowContent = (spot: TouristSpot) => {
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

    return `
      <div style="padding: 12px; min-width: 200px; font-family: 'Noto Serif JP', serif;">
        <div style="display: flex; align-items: center; margin-bottom: 8px;">
          <span style="font-size: 20px; margin-right: 8px;">${getTypeIcon(spot.type)}</span>
          <h3 style="margin: 0; color: #2e4057; font-size: 16px;">${spot.name}</h3>
        </div>
        <p style="margin: 4px 0; color: #666; font-size: 14px;">${spot.description}</p>
        ${spot.stamps ? `
          <div style="display: flex; align-items: center; margin: 4px 0;">
            <span style="color: #c73e1d; margin-right: 4px;">🏆</span>
            <span style="font-size: 12px; color: #c73e1d;">+${spot.stamps} スタンプ</span>
          </div>
        ` : ''}
        ${spot.difficulty ? `
          <div style="font-size: 12px; color: #4a5d23; margin: 4px 0;">
            難易度: ${spot.difficulty}
          </div>
        ` : ''}
        ${spot.rating ? `
          <div style="display: flex; align-items: center; margin: 4px 0;">
            <span style="color: #daa520; margin-right: 4px;">⭐</span>
            <span style="font-size: 12px;">${spot.rating}</span>
          </div>
        ` : ''}
        ${spot.coupon ? `
          <div style="background: #ffb7c5; padding: 4px 8px; border-radius: 4px; margin-top: 8px;">
            <span style="font-size: 12px; color: #c73e1d;">🎫 クーポンあり</span>
          </div>
        ` : ''}
      </div>
    `;
  };

  return (
    <div className="relative">
      <div 
        ref={mapRef} 
        className="w-full h-80 rounded-lg border-2 border-gray-200"
        style={{ minHeight: '320px' }}
      />
      
      {/* マップコントロール */}
      <div className="absolute top-4 right-4 bg-white rounded-lg shadow-lg p-2">
        <div className="flex flex-col space-y-2">
          <button
            onClick={() => map?.setZoom((map.getZoom() || 14) + 1)}
            className="w-8 h-8 bg-white border border-gray-300 rounded flex items-center justify-center hover:bg-gray-50"
          >
            +
          </button>
          <button
            onClick={() => map?.setZoom((map.getZoom() || 14) - 1)}
            className="w-8 h-8 bg-white border border-gray-300 rounded flex items-center justify-center hover:bg-gray-50"
          >
            -
          </button>
        </div>
      </div>

      {/* 現在地ボタン */}
      <div className="absolute bottom-4 right-4">
        <button
          onClick={() => {
            if (navigator.geolocation) {
              navigator.geolocation.getCurrentPosition(
                (position) => {
                  const pos = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                  };
                  map?.setCenter(pos);
                  map?.setZoom(16);
                },
                () => {
                  alert('現在地を取得できませんでした');
                }
              );
            }
          }}
          className="bg-white rounded-full shadow-lg p-3 hover:bg-gray-50 border border-gray-200"
        >
          <MapPin className="w-5 h-5 text-indigo-600" />
        </button>
      </div>

      {/* API Key警告 */}
      {(!import.meta.env.VITE_GOOGLE_MAPS_API_KEY || import.meta.env.VITE_GOOGLE_MAPS_API_KEY === 'YOUR_API_KEY_HERE') && (
        <div className="absolute inset-0 bg-gray-100 rounded-lg flex items-center justify-center">
          <div className="text-center p-4">
            <MapPin className="w-12 h-12 text-gray-400 mx-auto mb-2" />
            <p className="text-gray-600 text-sm mb-2">Google Maps API Keyが必要です</p>
            <p className="text-xs text-gray-500">
              .envファイルにVITE_GOOGLE_MAPS_API_KEYを設定してください
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default GoogleMap;