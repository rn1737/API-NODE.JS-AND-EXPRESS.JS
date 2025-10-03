export default function Home() {
  return (
    <div className="space-y-4">
      <header className="text-center">
        <h1 className="text-3xl font-bold">On-demand Home Repairs</h1>
        <p className="text-gray-600">Fan, AC, Plumbing, Geyser, Electrical and more.</p>
      </header>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="card">
          <h3 className="font-semibold">Fast Booking</h3>
          <p>Book a technician in minutes with transparent pricing.</p>
        </div>
        <div className="card">
          <h3 className="font-semibold">Live Tracking</h3>
          <p>Track your technician in real-time on a map.</p>
        </div>
        <div className="card">
          <h3 className="font-semibold">Trusted Pros</h3>
          <p>Verified technicians with ratings and reviews.</p>
        </div>
      </div>
    </div>
  );
}
