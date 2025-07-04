import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

interface LoginProps {
  onLoginSuccess: () => void;
  onClose: () => void; // Para cerrar la ventana modal
}

const Login: React.FC<LoginProps> = ({ onLoginSuccess, onClose }) => {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const adminEmail = "dilsonchimborazoperez@gmail.com"; // Correo fijo del admin

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, adminEmail, password);
      onLoginSuccess();
    } catch (err) {
      setError("Contraseña incorrecta");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-sm relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-xl font-bold text-red-600 hover:text-red-800"
        >
          ×
        </button>
        <h2 className="text-xl font-bold mb-4 text-center">Acceso Administrador</h2>
        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border px-3 py-2 rounded"
          />
          {error && <p className="text-red-600 text-sm">{error}</p>}
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
          >
            Iniciar Sesión
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
