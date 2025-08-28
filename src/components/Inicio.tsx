import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import "../Index.css";
import ProductManager from "./ProductManager";
import emailjs from "@emailjs/browser";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../firebase";
import { motion } from "framer-motion";

interface InicioProps {
  isAdmin: boolean;
}

const Inicio: React.FC<InicioProps> = ({ isAdmin }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    cantidad: "",
    telefono: "",
    message: "",
  });

  const [proyectosTexto, setProyectosTexto] = useState("");
  const [blogTexto, setBlogTexto] = useState("");

  useEffect(() => {
    const fetchContent = async () => {
      const docRef = doc(db, "contenido", "secciones");
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const data = docSnap.data();
        setProyectosTexto(data.proyectosTexto || "");
        setBlogTexto(data.blogTexto || "");
      }
    };
    fetchContent();
  }, []);

  const updateContent = async (field: string, value: string) => {
    const docRef = doc(db, "contenido", "secciones");
    await setDoc(docRef, { [field]: value }, { merge: true });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    emailjs
      .send("service_1oztxla", "template_krw961k", formData, "e4oJ5EXANYFS-PvA5")
      .then(
        () => {
          alert("Mensaje enviado con éxito");
          setFormData({
            name: "",
            email: "",
            cantidad: "",
            telefono: "",
            message: "",
          });
        },
        (error) => {
          console.error("Error:", error);
          alert("Error al enviar mensaje");
        }
      );
  };

  return (
    <div className="text-white">
      <Navbar />
      {/* HERO */}
    <section
      id="home"
      className="h-[100vh] flex items-center justify-center relative overflow-hidden"
    >
      {/* Imagen de fondo */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('../ladrillo.jpg')" }}
      ></div>

      {/* Capa oscura */}
      <div className="absolute inset-0 bg-black/70"></div>

      {/* Contenedor principal */}
      <div className="relative z-10 max-w-5xl w-full px-6">
        <div className=" rounded-2xl shadow-2xl flex md:flex-row ">
          {/* Imagen al lado izquierdo */}
          <motion.img
            src="../image.png"
            alt="Tecnología"
            className="w-full md:w-1/2 object-cover"
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
          />

          {/* Texto al lado derecho */}
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            className="flex flex-col justify-center text-center md:text-left p-8 md:w-1/2 text-white"
          >
            {/* Título con rebote */}
            <motion.h1
              className="text-5xl sm:text-6xl font-extrabold tracking-wider drop-shadow-lg"
              initial={{ opacity: 0, scale: 0.8, y: -50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 1, ease: "easeOut", type: "spring" }}
            >
              LADRILLERA PIÑA
            </motion.h1>

            {/* Subtítulo con fade + delay */}
            <motion.p
              className="mt-4 text-lg sm:text-xl text-gray-200"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.5 }}
            >
              Innovación en cada ladrillo, construyendo con tecnología.
            </motion.p>

            {/* Botones con animación escalada secuencial */}
            <motion.div
              className="mt-6 flex gap-4 justify-center md:justify-start"
              initial="hidden"
              animate="visible"
              variants={{
                hidden: {},
                visible: {
                  transition: { staggerChildren: 0.3 }, // animación uno tras otro
                },
              }}
            >
              <motion.a
                href="#products"
                className="px-6 py-3 rounded-full border border-white/50 hover:bg-white hover:text-black transition text-lg font-medium"
                variants={{
                  hidden: { opacity: 0, scale: 0.8 },
                  visible: { opacity: 1, scale: 1 },
                }}
                transition={{ duration: 0.8, type: "spring" }}
              >
                Ver Más
              </motion.a>
              <motion.a
                href="#contact"
                className="px-6 py-3 rounded-full bg-orange-600 hover:bg-orange-700 transition text-lg font-medium"
                variants={{
                  hidden: { opacity: 0, scale: 0.8 },
                  visible: { opacity: 1, scale: 1 },
                }}
                transition={{ duration: 0.8, type: "spring", delay: 0.2 }}
              >
                Contáctanos
              </motion.a>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>


      {/* PRODUCTOS */}
      <section
        id="products"
        className="py-20 bg-gradient-to-b from-black via-gray-900 to-black"
      >
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12 text-white drop-shadow-lg">
            Nuestros Productos
          </h2>
          <ProductManager isAdmin={isAdmin} />
        </div>
      </section>

      {/* SERVICIOS */}
      <section id="services" className="py-20 bg-[#F5F5F5]">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold mb-8 text-center text-[#D35400]">
            Nuestros Servicios
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            {/* Columna de texto animada */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="bg-[#F5F5F5] text-gray-800 rounded-3xl "
            >
              Nos especializamos en la fabricación de ladrillo tolete de alta calidad, producido bajo procesos controlados que garantizan resistencia mecánica, uniformidad dimensional y óptimas propiedades térmicas y acústicas. <br /> <br />

              Nuestro producto es ideal para muros estructurales y no estructurales, brindando excelente adherencia en la mampostería y una apariencia estética uniforme. <br /> <br />

              ✅ Características técnicas: <br />

              - Dimensiones estándar según requerimiento del cliente. <br />

              -Alta resistencia a la compresión. <br /> 

              -Acabado homogéneo para un mejor desempeño en obra. <br /> 

              -Fabricación con materias primas seleccionadas. <br /> 

              -Cumplimiento con parámetros de calidad establecidos en normas nacionales. <br />  <br />

              ⚠️ Importante: Nuestro servicio se centra exclusivamente en la producción del ladrillo. No realizamos transporte, ni entrega en obra. El material se entrega en planta para su respectivo retiro por parte del cliente
            </motion.div>

            {/* Columna del mapa */}
            <div className="w-full h-96 rounded-xl overflow-hidden shadow-lg border-2 border-[#D35400]">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3987.7710486999567!2d-76.0746285251953!3d1.8355548981476537!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e250b2521765fcb%3A0xf3de3d0a4eb2c3a1!2sFinca%20Recreativa%20el%20Portal%20de%20Rafa!5e0!3m2!1ses!2sco!4v1756335484291!5m2!1ses!2sco"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
              ></iframe>
            </div>
          </div>
        </div>
      </section>



      {/* PROYECTOS */}
      <section id="projects" className="py-20 bg-black/60">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-8">Proyectos</h2>
          {isAdmin ? (
            <textarea
              value={proyectosTexto}
              onChange={(e) => {
                setProyectosTexto(e.target.value);
                updateContent("proyectosTexto", e.target.value);
              }}
              className="w-full p-4 rounded-xl bg-white/10 border border-white/20 backdrop-blur-lg text-white"
            />
          ) : (
            <p className="max-w-3xl mx-auto">{proyectosTexto}</p>
          )}
        </div>
      </section>

      {/* BLOG */}
      <section id="blog" className="py-20 bg-black">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-8">Blog</h2>
          {isAdmin ? (
            <textarea
              value={blogTexto}
              onChange={(e) => {
                setBlogTexto(e.target.value);
                updateContent("blogTexto", e.target.value);
              }}
              className="w-full p-4 rounded-xl bg-white/10 border border-white/20 backdrop-blur-lg text-white"
            />
          ) : (
            <p className="max-w-3xl mx-auto">{blogTexto}</p>
          )}
        </div>
      </section>

      {/* CONTACTO */}
      <section id="contact" className="py-20 bg-black/70">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-10">Contáctanos</h2>
          <form
            onSubmit={handleSubmit}
            className="max-w-lg mx-auto bg-white/10 backdrop-blur-lg p-8 rounded-2xl border border-white/20 space-y-4"
          >
            <input
              type="text"
              name="name"
              placeholder="Tu Nombre"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-3 rounded-lg bg-transparent border border-white/30 text-white"
            />
            <input
              type="email"
              name="email"
              placeholder="Tu Correo"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-3 rounded-lg bg-transparent border border-white/30 text-white"
            />
            <input
              type="number"
              name="cantidad"
              placeholder="Cantidad"
              value={formData.cantidad}
              onChange={handleChange}
              className="w-full p-3 rounded-lg bg-transparent border border-white/30 text-white"
            />
            <input
              type="number"
              name="telefono"
              placeholder="Teléfono"
              value={formData.telefono}
              onChange={handleChange}
              className="w-full p-3 rounded-lg bg-transparent border border-white/30 text-white"
            />
            <textarea
              name="message"
              placeholder="Mensaje"
              value={formData.message}
              onChange={handleChange}
              rows={4}
              className="w-full p-3 rounded-lg bg-transparent border border-white/30 text-white"
            ></textarea>
            <button
              type="submit"
              className="w-full py-3 rounded-full bg-gradient-to-r from-orange-500 to-red-600 hover:opacity-90 transition text-white font-semibold"
            >
              Enviar
            </button>
          </form>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-white py-6 text-center border-t border-white/20">
        <p className="text-black font-bold text-lg">
          © 2025 LADRILLERA PIÑA. Todos los derechos reservados.
        </p>
      </footer>
    </div>
  );
};

export default Inicio;
