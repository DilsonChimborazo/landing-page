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
    <div className="">
      <div className="fixed bottom-0 right-0 px-10 py-3 ">
        {isAdmin ? (
          <button
            className="  px-4 py-2 font-bold"
            onClick={handleLogout}
          >
            ✅
          </button>
        ) : (
          !showLogin && (
            <button
              className=" px-4 py-2 rounded-full font-bold hover:text-orange-600"
              onClick={() => setShowLogin(true)}
            >
              ⚙️
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
