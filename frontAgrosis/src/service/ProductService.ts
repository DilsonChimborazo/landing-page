// src/service/ProductService.ts

import { ProductData } from "../components/ProductCard";

const STORAGE_KEY = "productos";

export const saveProducts = (products: ProductData[]) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
};

export const loadProducts = (): ProductData[] => {
  const stored = localStorage.getItem(STORAGE_KEY);
  return stored ? JSON.parse(stored) : [];
};
