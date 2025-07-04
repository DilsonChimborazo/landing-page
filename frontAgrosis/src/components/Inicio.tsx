import React, { useState } from 'react';
import Navbar from './Navbar';
import "../Index.css";
import ProductManager from './ProductManager';

interface InicioProps {
  isAdmin: boolean;
}

const Inicio: React.FC<InicioProps> = ({ isAdmin }) => {
  const [formData, setFormData] = useState({ name: '', email: '', cantidad: '', message: '' });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Formulario enviado: ' + JSON.stringify(formData));
    setFormData({ name: '', email: '', cantidad: '', message: '' });
  };

  return (
    <div className="min-h-screen bg-gray-100 font-sans">
      <Navbar />
      <section id="home" className="bg-cover bg-center h-96 flex items-center justify-center">
        <div className="container mx-auto px-4 text-center text-black">
          <h1 className="text-5xl font-bold mb-4 tracking-tight">Ladrillera Piña</h1>
          <p className="text-xl mb-6 max-w-2xl mx-auto">
            Construye tus sueños con los ladrillos más resistentes y confiables del mercado.
          </p>
          <a
            href="https://wa.me/573186479724"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-orange-600 text-white font-semibold px-8 py-3 rounded-full hover:bg-orange-700 transition-colors duration-300"
          >
            Contáctanos por WhatsApp
          </a>
        </div>
      </section>

      <section id="products" className="py-12 bg-gray-100">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap gap-8 justify-center">
            <ProductManager isAdmin={isAdmin} />
          </div>
        </div>
      </section>

      <section id="services" className="py-12 bg-gray-200">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">Nuestros Servicios</h2>
          <p className="text-center">Ofrecemos asesoría, distribución y soporte técnico para tus proyectos.</p>
        </div>
      </section>

      <section id="projects" className="py-12 bg-gray-100">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">Proyectos</h2>
          <p className="text-center">Descubre nuestras obras destacadas con ladrillos de calidad.</p>
        </div>
      </section>

      <section id="about" className="py-12 bg-gray-200">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">Sobre Nosotros</h2>
          <p className="text-center">Ladrillera Piña, líder en la industria desde hace más de 20 años.</p>
        </div>
      </section>

      <section id="blog" className="py-12 bg-gray-100">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">Blog</h2>
          <p className="text-center">Lee nuestros consejos y novedades sobre construcción.</p>
        </div>
      </section>

      <section id="contact" className="py-12 bg-gray-200">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">Contáctanos</h2>
          <div className="max-w-lg mx-auto">
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Nombre</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="mt-1 p-2 w-full border rounded-md"
                  placeholder="Tu nombre"
                />
              </div>
              <div className="mt-4">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Correo Electrónico</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="mt-1 p-2 w-full border rounded-md"
                  placeholder="tu@correo.com"
                />
              </div>
              <div className="mt-4">
                <label htmlFor="cantidad" className="block text-sm font-medium text-gray-700">Cantidad</label>
                <input
                  type="number"
                  id="cantidad"
                  name="cantidad"
                  value={formData.cantidad}
                  onChange={handleInputChange}
                  className="mt-1 p-2 w-full border rounded-md"
                  placeholder="1000 Ladrillos"
                />
              </div>
              <div className="mt-4">
                <label htmlFor="message" className="block text-sm font-medium text-gray-700">Mensaje</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  className="mt-1 p-2 w-full border rounded-md"
                  rows={4}
                  placeholder="Tu mensaje"
                ></textarea>
              </div>
              <button
                type="submit"
                className="mt-6 bg-orange-600 text-white px-6 py-2 rounded-full hover:bg-orange-700"
              >
                Enviar
              </button>
            </form>
          </div>
        </div>
      </section>

      <footer className="bg-orange-600 text-white py-4">
        <div className="container mx-auto px-4 text-center">
          <p>© 2025 Ladrillera Piña. Todos los derechos reservados.</p>
        </div>
      </footer>
    </div>
  );
};

export default Inicio;
