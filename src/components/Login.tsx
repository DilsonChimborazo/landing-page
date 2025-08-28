// src/components/Login.tsx
import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

interface LoginProps {
  onLoginSuccess: () => void;
  onClose: () => void;
}

const Login: React.FC<LoginProps> = ({ onLoginSuccess, onClose }) => {
  const [password, setPassword] = useState("");
  const [showPwd, setShowPwd] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // El correo del admin se mantiene fijo según tu lógica actual
  const adminEmail = "dilsonchimborazoperez@gmail.com";

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await signInWithEmailAndPassword(auth, adminEmail, password);
      onLoginSuccess();
    } catch (err) {
      setError("Credenciales inválidas. Verifica la contraseña.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
      <div className="relative w-full max-w-sm p-6 rounded-2xl shadow-2xl bg-white/10 backdrop-blur-xl border border-orange-500/30">
        {/* Botón cerrar */}
        <button
          onClick={onClose}
          className="absolute -top-3 -right-3 h-9 w-9 rounded-full bg-white text-orange-600 font-bold shadow hover:shadow-md hover:scale-105 transition"
          aria-label="Cerrar"
        >
          x
        </button>

        {/* Header */}
        <div className="text-center mb-6">
          <h2 className="text-2xl font-extrabold tracking-widest text-white">
            ACCESO <span className="text-orange-400">ADMIN</span>
          </h2>
          <p className="text-xs text-gray-300 mt-1">
            Panel privado de <span className="text-orange-400">Ladrillera</span>
          </p>
        </div>

        {/* Formulario */}
        <form onSubmit={handleLogin} className="space-y-4">
          <div className="relative">
            <input
              type={showPwd ? "text" : "password"}
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 pr-12 rounded-xl bg-black/30 text-white placeholder-gray-400 border border-white/20 focus:border-orange-500 outline-none"
              required
            />
            <button
              type="button"
              onClick={() => setShowPwd((s) => !s)}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-xs px-2 py-1 rounded-md border border-white/20 text-gray-200 hover:bg-white/10"
              aria-label={showPwd ? "Ocultar contraseña" : "Mostrar contraseña"}
            >
              {showPwd ? "Ocultar" : "Mostrar"}
            </button>
          </div>

          {error && (
            <div className="text-red-400 text-sm bg-red-500/10 border border-red-400/30 rounded-lg p-2">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-full bg-gradient-to-r from-orange-500 to-red-600 hover:opacity-90 transition text-white font-semibold disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? "Ingresando..." : "Ingresar"}
          </button>
        </form>

        {/* Pie de modal */}
        <p className="mt-4 text-[11px] text-gray-400 text-center">
          Acceso restringido. Solo personal autorizado.
        </p>
      </div>
    </div>
  );
};

export default Login;
