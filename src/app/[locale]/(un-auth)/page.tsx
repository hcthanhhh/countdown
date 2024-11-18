'use client';

import Gallery from '@/components/molecules/Gallery';
import { useEffect, useState } from 'react';

export default function Home() {
  const targetDate = new Date('2024-12-21T00:00:00+07:00').getTime();

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

  const reasons = [
    'Your smile lights up my world.',
    'You inspire me every day.',
    'You make every moment special.',
    'I love how kind and thoughtful you are.',
  ];

  return (
    <div className='bg-pink-50 min-h-screen flex flex-col items-center px-4 py-8'>
      {/* Header */}
      <header className='text-center mb-8'>
        <h1 className='text-4xl font-bold text-pink-600'>Welcome to Our Special Place ❤️</h1>
        <p className='text-gray-600 mt-2'>A little something I made just for you.</p>
      </header>
      <section className='flex flex-col items-center py-8  text-grey'>
        <h2 className='text-3xl font-semibold mb-4'>Countdown to Dalat 🎄</h2>
        <div className='flex space-x-6 text-center text-xl'>
          <div className='flex flex-col items-center'>
            <span className='text-6xl font-bold'>{timeLeft.days}</span>
            <span>Days</span>
          </div>
          <div className='flex flex-col items-center'>
            <span className='text-6xl font-bold'>{timeLeft.hours}</span>
            <span>Hours</span>
          </div>
          <div className='flex flex-col items-center'>
            <span className='text-6xl font-bold'>{timeLeft.minutes}</span>
            <span>Minutes</span>
          </div>
          <div className='flex flex-col items-center'>
            <span className='text-6xl font-bold'>{timeLeft.seconds}</span>
            <span>Seconds</span>
          </div>
        </div>
      </section>

      {/* Photo Gallery */}
      <section className='mb-12'>
        <h2 className='text-2xl font-semibold text-pink-600 mb-4 text-center'>Our Memories</h2>
        <Gallery />
      </section>

      {/* Timeline */}
      <section className='mb-12'>
        <h2 className='text-2xl font-semibold text-pink-600 mb-4 text-center'>Our Journey</h2>
        <ul className='space-y-2 text-gray-700'>
          <li>📅 First Date: February 3rd, 2022</li>
          <li>❤️ First "I Love You": February 19th, 2022</li>
          <li>🎉 Anniversary: February 19th</li>
        </ul>
      </section>

      {/* Reasons I Love You */}
      <section className='mb-12'>
        <h2 className='text-2xl font-semibold text-pink-600 mb-4 text-center'>
          Reasons I Love You
        </h2>
        <div className='flex flex-wrap justify-center gap-4'>
          {reasons.map((reason, index) => (
            <div
              key={index}
              className='bg-pink-100 text-pink-600 p-4 rounded-lg shadow-md hover:scale-105 transition-transform'
            >
              {reason}
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className='mt-8 text-center text-gray-500 text-sm'>Made with ❤️ by h0cataf</footer>
    </div>
  );
}
