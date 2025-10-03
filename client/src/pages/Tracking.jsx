import { useEffect, useRef, useState } from 'react';
import { io } from 'socket.io-client';
import { useAuth } from '../context/AuthContext.jsx';

export default function Tracking() {
  const { token } = useAuth();
  const [coords, setCoords] = useState({ lat: 28.6139, lng: 77.2090 }); // Delhi default
  const socketRef = useRef(null);

  useEffect(() => {
    const socket = io('/', { path: '/socket.io', auth: { token } });
    socketRef.current = socket;

    socket.on('technician:location', (data) => {
      setCoords({ lat: data.lat, lng: data.lng });
    });

    return () => {
      socket.disconnect();
    };
  }, [token]);

  return (
    <div className="card">
      <h2 className="text-xl font-semibold mb-2">Live Tracking (mocked)</h2>
      <div className="h-64 bg-gray-200 rounded flex items-center justify-center">
        <div className="text-center">
          <div className="text-gray-700">Technician Coordinates</div>
          <div className="font-mono">{coords.lat.toFixed(4)}, {coords.lng.toFixed(4)}</div>
        </div>
      </div>
    </div>
  );
}
