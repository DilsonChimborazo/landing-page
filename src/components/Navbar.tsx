import React from "react";

interface NavbarProps {
  onLoginClick?: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onLoginClick }) => {
  return (
  <nav className="fixed top-0 w-full bg-gradient-to-b from-black via-gray-900 to-transparent text-white  z-50">
    <div className="container mx-auto flex items-center justify-between px-6 py-6">
      <h1 className="text-white text-2xl font-extrabold tracking-wide">
        LADRILLERA<span className="text-orange-500">PIÑA</span>
      </h1>
      <ul className="flex space-x-8 text-white font-medium">
        <li className="hover:text-orange-500 transition cursor-pointer"><a href="#home">Inicio</a></li>
        <li className="hover:text-orange-500 transition cursor-pointer"><a href="#products">Productos</a></li>
        <li className="hover:text-orange-500 transition cursor-pointer"><a href="#projects">Proyectos</a></li>
        <li className="hover:text-orange-500 transition cursor-pointer"><a href="#contact">Contacto</a></li>
        {onLoginClick && (
          <li>
            <button
              onClick={onLoginClick}
              className="ml-6 px-4 py-2 rounded-full border border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white transition duration-300"
            >
              Admin
            </button>
          </li>
        )}
      </ul>
    </div>
  </nav>

  );
};

export default Navbar;