import React from 'react';
import { MapPin, ExternalLink } from 'lucide-react';

interface GoogleMapsButtonProps {
  lat: number;
  lng: number;
  name: string;
  className?: string;
}

const GoogleMapsButton: React.FC<GoogleMapsButtonProps> = ({ 
  lat, 
  lng, 
  name, 
  className = '' 
}) => {
  const openGoogleMaps = () => {
    // Google Mapsで場所を開くURL
    const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${lat},${lng}&query_place_id=${encodeURIComponent(name)}`;
    
    // 新しいタブで開く
    window.open(googleMapsUrl, '_blank', 'noopener,noreferrer');
  };

  const openDirections = () => {
    // 現在地からの経路案内URL
    const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}&destination_place_id=${encodeURIComponent(name)}`;
    
    // 新しいタブで開く
    window.open(directionsUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className={`flex space-x-2 ${className}`}>
      {/* Google Mapsで開く */}
      <button
        onClick={openGoogleMaps}
        className="flex items-center px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm"
        title="Google Mapsで開く"
      >
        <MapPin className="w-4 h-4 mr-1" />
        <span>Maps</span>
        <ExternalLink className="w-3 h-3 ml-1" />
      </button>

      {/* 経路案内 */}
      <button
        onClick={openDirections}
        className="flex items-center px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
        title="経路案内"
      >
        <span>🧭</span>
        <span className="ml-1">経路</span>
        <ExternalLink className="w-3 h-3 ml-1" />
      </button>
    </div>
  );
};

export default GoogleMapsButton;