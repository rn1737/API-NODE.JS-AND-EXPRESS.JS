import { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext.jsx';

export default function TechBookings() {
  const { authAxios } = useAuth();
  const [bookings, setBookings] = useState([]);

  const refresh = async () => {
    const res = await authAxios.get('/api/bookings?scope=technician');
    setBookings(res.data.bookings || []);
  };

  useEffect(() => { refresh(); }, []);

  const update = async (bookingId, status) => {
    await authAxios.patch(`/api/bookings/${bookingId}`, { status });
    await refresh();
  };

  const shareLocation = async () => {
    // Mock location update via API
    const lat = 28.6 + Math.random() * 0.1;
    const lng = 77.2 + Math.random() * 0.1;
    await authAxios.post('/api/technicians/location', { lat, lng });
    alert('Location shared');
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Incoming Bookings</h2>
        <button className="btn-secondary" onClick={shareLocation}>Share Live Location</button>
      </div>
      <div className="space-y-3">
        {bookings.map((b) => (
          <div key={b._id} className="card">
            <div className="flex items-center justify-between">
              <div>
                <div className="font-semibold">{b.serviceName}</div>
                <div className="text-sm text-gray-600">{new Date(b.scheduledAt).toLocaleString()}</div>
              </div>
              <div className="flex gap-2">
                <button className="btn-secondary" onClick={() => update(b._id, 'rejected')}>Reject</button>
                <button className="btn-primary" onClick={() => update(b._id, 'accepted')}>Accept</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
