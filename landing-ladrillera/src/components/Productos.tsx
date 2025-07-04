import React from 'react';
import Navbar from './Navbar';

const Productos: React.FC = () => {
  return (
      <div className="container mx-auto px-4  text-white">
        <div className='flex'>
            <Navbar/>
        </div>
        <p>Estos son los productos</p>
      </div>
  );
};

export default Productos;