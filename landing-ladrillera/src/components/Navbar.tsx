import React from 'react';

const Navbar: React.FC = () => {
  const navItems = [
    { name: 'Inicio', href: '#Inicio' },
    { name: 'Productos', href: '#' },
    { name: 'Servicios', href: '#services' },
    { name: 'Proyectos', href: '#projects' },
    { name: 'Nosotros', href: '#about' },
    { name: 'Blog', href: '#blog' },
    { name: 'Contacto', href: '#contact' },
  ];

  return (
    <header className="bg-orange-600 text-white py-4 shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Ladrillera San José</h1>
          <nav className="flex flex-wrap justify-end gap-4 sm:gap-6">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-sm sm:text-lg hover:underline hover:text-yellow-300 transition-colors duration-200"
                title="menu"
              >
                {item.name}
              </a>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Navbar;