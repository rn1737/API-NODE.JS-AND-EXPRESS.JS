import { Link } from 'react-router-dom';

export default function TechDashboard() {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Technician Dashboard</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Link to="/tech/bookings" className="card hover:ring-2 ring-primary">
          <div className="font-semibold">Incoming Bookings</div>
          <div className="text-sm text-gray-600">Accept or reject jobs</div>
        </Link>
        <Link to="/tech/earnings" className="card hover:ring-2 ring-primary">
          <div className="font-semibold">Earnings</div>
          <div className="text-sm text-gray-600">View payout summary</div>
        </Link>
      </div>
    </div>
  );
}
