// auth.ts o authService.ts

import { User } from "firebase/auth";

// Esto es solo un ejemplo básico. Idealmente deberías usar claims o una colección de roles en Firestore
export const getRole = (user: User | null): "admin" | "user" => {
  if (!user) return "user";

  // Por ahora usamos un correo fijo como admin
  if (user.email === "admin@ejemplo.com") return "admin";
  return "user";
};
