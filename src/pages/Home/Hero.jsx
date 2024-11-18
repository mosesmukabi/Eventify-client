import React from 'react';
import evenifyHero from '../../assets/Eventfy.jpg';

function Hero() {
  return (
    <div className="relative text-2xl">
      <img
        src={evenifyHero}
        alt="Eventify background"
        className="w-full h-[500px] object-cover"
      />
      <div className="absolute inset-0 flex flex-col justify-center items-center bg-black bg-opacity-50 text-white text-center p-4">
        <h1 className="text-4xl font-bold mb-4">Welcome to Eventify</h1>
        <p className="text-2xl">
          Discover amazing events near you, connect with others, and make unforgettable memories!
        </p>
      </div>
    </div>
  );
}

export default Hero;
