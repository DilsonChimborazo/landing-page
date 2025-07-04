import React from 'react';
import Navbar from './Navbar';

const Inicio: React.FC = () => {
  return (
      <div className="container mx-auto px-4  text-white">
        <div className='flex'>
            <Navbar/>
        </div>
            
            <p className="text-xl mb-6 max-w-2xl mx-auto">
              Construye tus sueños con los ladrillos más resistentes y confiables del mercado.
            </p>
        <a
          href='https://wa.me/3186479724'
          className="inline-block bg-yellow-500 text-black font-semibold px-8 py-3 rounded-full hover:bg-yellow-600 transition-colors duration-300"
        >
          Solicita una Cotización
        </a>
      </div>
  );
};

export default Inicio;