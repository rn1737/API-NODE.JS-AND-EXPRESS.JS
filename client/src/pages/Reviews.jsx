import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext.jsx';

export default function Reviews() {
  const { authAxios } = useAuth();
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    authAxios.get('/api/technicians/reviews').then((res) => setReviews(res.data.reviews || []));
  }, []);

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Recent Reviews</h2>
      <div className="space-y-2">
        {reviews.map((r, idx) => (
          <div key={idx} className="card">
            <div className="flex items-center justify-between">
              <div>
                <div className="font-semibold">{r.technicianName}</div>
                <div className="text-sm">Rating: {r.rating} / 5</div>
              </div>
              <div className="text-sm text-gray-600">{r.comment}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
