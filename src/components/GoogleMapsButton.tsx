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
  const openDirections = () => {
    // 現在地からの経路案内URL
    const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}&destination_place_id=${encodeURIComponent(name)}`;
    
    // 新しいタブで開く
    window.open(directionsUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <button
      onClick={openDirections}
      className={`flex items-center px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm ${className}`}
      title="Google Mapsで経路案内"
    >
      <MapPin className="w-4 h-4 mr-1" />
      <span>経路案内</span>
      <ExternalLink className="w-3 h-3 ml-1" />
    </button>
  );
};

export default GoogleMapsButton;