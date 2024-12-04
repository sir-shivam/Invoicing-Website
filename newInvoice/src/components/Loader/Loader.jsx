// components/Loader.js
import React from 'react';
import './Loader.css'; // Include your CSS file here

const Loader = () => {
  return (
    <div className='absolute bg-gray-500 w-screen h-[90%] justify-center items-center flex z-20 bg-opacity-65 '>
    <div className="loader">
      <span className="hour"></span>
      <span className="min"></span>
      <span className="circel"></span>
    </div>
    </div>
  );
};

export default Loader;
