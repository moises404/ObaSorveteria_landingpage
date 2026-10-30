import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

// Coordenadas exatas da OBA! Sorveteria conforme o link do Google Maps
const position = [-5.9473305, -35.2784841];

// Link direto para o Google Maps
const googleMapsUrl = "https://www.google.com/maps/place/Rua+principal+da+upa+de+prox+a+igreja+universal+-+R.+Rosa+Fernandes+da+Silva,+1150+-+Lj+03+-+Nova+Esperan%C3%A7a,+Parnamirim+-+RN,+59144-210/@-5.9472662,-35.2785685,21z/data=!4m14!1m7!3m6!1s0x7b2575b41cd43f7:0x73e09a86343ed546!2sOBA*21+Sorveteria!8m2!3d-5.9473305!4d-35.2784841!16s%2Fg%2F11hh8q0gqy!3m5!1s0x7b259ddb6f79501:0x272f6700f5e69f9a!8m2!3d-5.9473305!4d-35.2784841!16s%2Fg%2F11z5ppjc2q?entry=ttu&g_ep=EgoyMDI2MTAyMC4wIKXMDSoASAFQAw%3D%3D";

export default function LocationMap() {
  return (
    <div className="w-full max-w-4xl mx-auto p-4 z-50">
      
      {/* Container do Mapa Leaflet */}
      <div className="h-[400px] w-full rounded-xl overflow-hidden shadow-lg border border-gray-200">
        <MapContainer 
          center={position} 
          zoom={18} 
          scrollWheelZoom={false} 
          className="w-full h-full"
        >
          {/* Camada do OpenStreetMap */}
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {/* Marcador no local exato */}
          <Marker position={position}>
            <Popup>
              <div className="text-sm space-y-2 p-1">
                <strong className="text-base text-pink-600 block">OBA! Sorveteria</strong>
                <p className="text-gray-600 leading-snug">
                  R. Rosa Fernandes da Silva, 1150 - Lj 03<br />
                  Nova Esperança, Parnamirim - RN<br />
                  <span className="text-xs text-gray-500">(Próx. à UPA e Igreja Universal)</span>
                </p>
                
                {/* Botão para redirecionar para o Google Maps */}
                <a
                  href={googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block mt-2 px-3 py-1.5 bg-blue-100 text-white font-medium text-xs rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
                >
                  Ver no Google Maps ↗
                </a>
              </div>
            </Popup>
          </Marker>
        </MapContainer>
      </div>
    </div>
  );
}