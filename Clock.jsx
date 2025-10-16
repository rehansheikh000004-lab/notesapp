import { useState, useEffect } from "react";

export default function Clock() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="p-6 text-center bg-gray-800 text-white rounded-xl shadow-lg">
      <h2 className="text-xl font-bold mb-4">Digital Clock</h2>
      <p className="text-3xl font-mono">{time.toLocaleTimeString()}</p>
      <p className="mt-2">{time.toDateString()}</p>
    </div>
  );
}