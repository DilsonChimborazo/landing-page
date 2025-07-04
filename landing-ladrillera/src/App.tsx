import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Inicio from './components/Inicio';

const App: React.FC = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Formulario enviado: ' + JSON.stringify(formData));
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <div className="min-h-screen bg-gray-100 font-sans">
      <Navbar />
      <section id="home">
        <Inicio />
      </section>
      <section id="products" className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">Nuestros Productos</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-2">Ladrillo Común</h3>
              <p>Ideal para construcciones estándar, resistente y económico.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-2">Ladrillo Hueco</h3>
              <p>Ligero y eficiente para paredes divisorias y estructuras modernas.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-2">Ladrillo Refractario</h3>
              <p>Perfecto para hornos y chimeneas, soporta altas temperaturas.</p>
            </div>
          </div>
        </div>
      </section>
      <section id="services" className="py-12 bg-gray-200">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">Nuestros Servicios</h2>
          <p className="text-center">Ofrecemos asesoría, distribución y soporte técnico para tus proyectos.</p>
        </div>
      </section>
      <section id="projects" className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">Proyectos</h2>
          <p className="text-center">Descubre nuestras obras destacadas con ladrillos de calidad.</p>
        </div>
      </section>
      <section id="about" className="py-12 bg-gray-200">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">Sobre Nosotros</h2>
          <p className="text-center">Ladrillera San José, líder en la industria desde hace más de 20 años.</p>
        </div>
      </section>
      <section id="blog" className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">Blog</h2>
          <p className="text-center">Lee nuestros consejos y novedades sobre construcción.</p>
        </div>
      </section>
      <section id="contact" className="py-12 bg-gray-200">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">Contáctanos</h2>
          <div className="max-w-lg mx-auto">
            <div className="bg-white p-6 rounded-lg shadow-md">
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
                onClick={handleSubmit}
                className="mt-6 bg-orange-600 text-white px-6 py-2 rounded-full hover:bg-orange-700"
              >
                Enviar
              </button>
            </div>
          </div>
        </div>
      </section>
      <footer className="bg-orange-600 text-white py-4">
        <div className="container mx-auto px-4 text-center">
          <p>© 2025 Ladrillera San José. Todos los derechos reservados.</p>
        </div>
      </footer>
    </div>
  );
};

export default App;