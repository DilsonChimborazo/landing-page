import React, { useState } from 'react';

const Navbar: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const navItems = [
    { name: 'Inicio', href: '#home' },
    { name: 'Productos', href: '#products' },
    { name: 'Servicios', href: '#services' },
    { name: 'Proyectos', href: '#projects' },
    { name: 'Nosotros', href: '#about' },
    { name: 'Blog', href: '#blog' },
    { name: 'Contacto', href: '#contact' },
  ];

  return (
    <header className="bg-orange-600 text-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Ladrillera Piña</h1>

        {/* Botón hamburguesa */}
        <button
          className="sm:hidden text-white text-2xl focus:outline-none"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </button>

        {/* Menú en pantallas grandes */}
        <nav className="hidden sm:flex gap-4">
          {navItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="text-sm sm:text-base hover:underline hover:text-yellow-300 transition-colors duration-200"
            >
              {item.name}
            </a>
          ))}
        </nav>
      </div>

      {/* Menú en pantallas pequeñas */}
      {menuOpen && (
        <div className="sm:hidden px-4 pb-4">
          {navItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="block py-2 border-b border-white text-sm hover:text-yellow-300"
            >
              {item.name}
            </a>
          ))}
        </div>
      )}
    </header>
  );
};

export default Navbar;
