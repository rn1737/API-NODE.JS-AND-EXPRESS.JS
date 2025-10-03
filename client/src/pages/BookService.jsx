import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext.jsx';

export default function BookService() {
  const { authAxios } = useAuth();
  const [services, setServices] = useState([]);
  const [form, setForm] = useState({ serviceId: '', scheduledAt: '', notes: '' });
  const [message, setMessage] = useState(null);

  useEffect(() => {
    authAxios.get('/api/services').then((res) => setServices(res.data.services || []));
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();
    const res = await authAxios.post('/api/bookings', form);
    setMessage(`Booking created: ${res.data.bookingId}`);
  };

  return (
    <div className="max-w-md mx-auto card space-y-4">
      <h2 className="text-xl font-semibold">Book a Service</h2>
      {message && <div className="text-green-700 text-sm">{message}</div>}
      <form onSubmit={onSubmit} className="space-y-3">
        <select className="input" value={form.serviceId} onChange={(e) => setForm({ ...form, serviceId: e.target.value })}>
          <option value="">Select Service</option>
          {services.map((s) => (
            <option key={s._id} value={s._id}>{s.name} - ₹{s.basePrice}</option>
          ))}
        </select>
        <input className="input" type="datetime-local" value={form.scheduledAt} onChange={(e) => setForm({ ...form, scheduledAt: e.target.value })} />
        <textarea className="input" rows="3" placeholder="Notes (optional)" value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} />
        <button className="btn-primary w-full">Create Booking</button>
      </form>
    </div>
  );
}
