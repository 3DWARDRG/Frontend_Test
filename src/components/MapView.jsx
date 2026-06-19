import { MapContainer, TileLayer, Polyline, Marker, Popup } from 'react-leaflet';

function toLatLng(coords) {
  return [coords[1], coords[0]];
}

export default function MapView({ routeGeometry, stops, distance, time }) {
  if (!routeGeometry) return null;

  const positions = routeGeometry.coordinates.map(toLatLng);
  const center = positions.length > 0 ? positions[0] : [40.7, -74.0];

  return (
    <div style={{ position: 'relative'}}>
      <MapContainer center={center} zoom={5} >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Polyline positions={positions} color="#1A237E" weight={4} opacity={0.8} />
        {stops.map((stop, idx) => {
          const position = stop.coords ? toLatLng(stop.coords) : [40.7, -74.0];
          return (
            <Marker key={idx} position={position}>
              <Popup>
                <strong>{stop.type.toUpperCase()}</strong><br />
                Día {stop.day}<br />
                Llegada: {new Date(stop.arrival_time).toLocaleTimeString()}<br />
                Salida: {new Date(stop.departure_time).toLocaleTimeString()}
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>

      {/* Leyenda */}
      <div style={{
        position: 'absolute',
        bottom: 12,
        left: 12,
        backgroundColor: 'rgba(255,255,255,0.95)',
        backdropFilter: 'blur(4px)',
        borderRadius: 8,
        padding: '6px 12px',
        fontSize: 12,
        display: 'flex',
        gap: 16,
        boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
        zIndex: 1000,
      }}>
        <span><span style={{ display:'inline-block', width:12, height:12, borderRadius:'50%', backgroundColor:'#D32F2F', marginRight:4 }}></span>Parada</span>
        <span><span style={{ display:'inline-block', width:12, height:12, borderRadius:'50%', backgroundColor:'#1976D2', marginRight:4 }}></span>Descanso</span>
        <span><span style={{ display:'inline-block', width:12, height:12, borderRadius:'50%', backgroundColor:'#388E3C', marginRight:4 }}></span>Combustible</span>
      </div>
    </div>
  );
}