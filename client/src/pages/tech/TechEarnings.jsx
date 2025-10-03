import { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext.jsx';

export default function TechEarnings() {
  const { authAxios } = useAuth();
  const [summary, setSummary] = useState({ completed: 0, total: 0 });

  useEffect(() => {
    authAxios.get('/api/technicians/earnings').then((res) => setSummary(res.data));
  }, []);

  return (
    <div className="card">
      <h2 className="text-xl font-semibold mb-4">Earnings</h2>
      <div className="grid grid-cols-2 gap-4">
        <div className="card">
          <div className="text-sm text-gray-600">Completed Jobs</div>
          <div className="text-2xl font-bold">{summary.completed}</div>
        </div>
        <div className="card">
          <div className="text-sm text-gray-600">Total Earnings</div>
          <div className="text-2xl font-bold">₹{summary.total}</div>
        </div>
      </div>
    </div>
  );
}
