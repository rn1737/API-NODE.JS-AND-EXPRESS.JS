import { useEffect, useState } from 'react';
import axios from 'axios';

export default function Services() {
  const [services, setServices] = useState([]);

  useEffect(() => {
    axios.get('/api/services').then((res) => setServices(res.data.services || []));
  }, []);

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Available Services</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {services.map((s) => (
          <div key={s._id || s.id} className="card">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold">{s.name}</h3>
                <p className="text-sm text-gray-600">{s.category}</p>
              </div>
              <div className="text-right">
                <div className="text-lg font-bold">₹{s.basePrice}</div>
                <div className="text-xs text-gray-500">~{s.etaMins} mins</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
