// src/service/ProductService.ts
import {
  collection,
  getDocs,
  updateDoc,
  doc,
  setDoc
} from "firebase/firestore";
import { db } from "../firebase";
import { ProductData } from "../components/ProductCard";

const PRODUCTS_COLLECTION = "productos";

export const fetchProducts = async (): Promise<ProductData[]> => {
  const snapshot = await getDocs(collection(db, PRODUCTS_COLLECTION));
  return snapshot.docs.map((doc) => doc.data() as ProductData);
};

export const addProduct = async (product: ProductData) => {
  await setDoc(doc(db, PRODUCTS_COLLECTION, product.id.toString()), product);
};

export const updateProduct = async (id: number, product: ProductData) => {
  await updateDoc(doc(db, PRODUCTS_COLLECTION, id.toString()), { ...product });
};
