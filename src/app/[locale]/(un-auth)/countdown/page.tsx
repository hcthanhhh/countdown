'use client';

import { useState, useEffect } from 'react';

export default function Countdown() {
  // Target date for the countdown
  const targetDate = new Date('2024-12-24T00:00:00+07:00').getTime();

  // State to track the remaining time
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  // Function to calculate the time difference
  const calculateTimeLeft = () => {
    const now = new Date().getTime();
    const difference = targetDate - now;

    if (difference > 0) {
      setTimeLeft({
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / (1000 * 60)) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      });
    } else {
      setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
    }
  };

  // Update the countdown every second
  useEffect(() => {
    const timer = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className='bg-gray-900 text-white min-h-screen flex flex-col items-center justify-center'>
      <h1 className='text-4xl font-bold mb-4'>Countdown to Christmas 🎄</h1>
      <div className='flex space-x-4 text-center text-2xl'>
        <div className='flex flex-col items-center'>
          <span className='font-bold text-6xl'>{timeLeft.days}</span>
          <span>Days</span>
        </div>
        <div className='flex flex-col items-center'>
          <span className='font-bold text-6xl'>{timeLeft.hours}</span>
          <span>Hours</span>
        </div>
        <div className='flex flex-col items-center'>
          <span className='font-bold text-6xl'>{timeLeft.minutes}</span>
          <span>Minutes</span>
        </div>
        <div className='flex flex-col items-center'>
          <span className='font-bold text-6xl'>{timeLeft.seconds}</span>
          <span>Seconds</span>
        </div>
      </div>
      <p className='mt-6 text-gray-400'>Stay tuned for the big day!</p>
    </div>
  );
}
