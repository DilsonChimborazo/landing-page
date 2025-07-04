import React, { useEffect, useState } from "react";
import Inicio from "./components/Inicio";
import Login from "./components/Login";
import { auth, onAuthStateChanged, signOut } from "./firebase"; // asegúrate de tenerlo configurado
import "./Index.css";

const App: React.FC = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user?.email === "dilsonchimborazoperez@gmail.com") {
        setIsAdmin(true);
      } else {
        setIsAdmin(false);
      }
      setCheckingAuth(false);
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = () => {
    signOut(auth);
    setIsAdmin(false);
    setShowLogin(false);
  };

  if (checkingAuth) return <div className="text-center mt-20 text-xl">Cargando...</div>;

  return (
    <div className="py-2">
      <div className="flex justify-end mb-4">
        {isAdmin ? (
          <button
            className="bg-red-600 text-white px-4 py-2 rounded-full hover:bg-red-700"
            onClick={handleLogout}
          >
            Cerrar sesión
          </button>
        ) : (
          !showLogin && (
            <button
              className="bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700"
              onClick={() => setShowLogin(true)}
            >
              Administrador
            </button>
          )
        )}
      </div>

      {showLogin && !isAdmin && (
        <Login
          onLoginSuccess={() => {
            setIsAdmin(true);
            setShowLogin(false);
          }}
          onClose={() => setShowLogin(false)}
        />
      )}


      <Inicio isAdmin={isAdmin} />
    </div>
  );
};

export default App;
