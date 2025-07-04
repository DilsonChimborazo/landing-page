import React, { useEffect, useState } from "react";
import ProductCard, { ProductData } from "./ProductCard";
import { getRole } from "./auth";
import { loadProducts, saveProducts } from "../service/ProductService";

interface ProductDataWithId extends ProductData {
  id: number;
}

const ProductManager: React.FC = () => {
  const [products, setProducts] = useState<ProductDataWithId[]>([]);
  const isAdmin = getRole() === "admin";

  // Cargar productos del localStorage al iniciar
  useEffect(() => {
    const loaded = loadProducts();
    setProducts(loaded);
  }, []);

  // Guardar productos en localStorage cada vez que cambien
  useEffect(() => {
    saveProducts(products);
  }, [products]);

  const getNextId = (): number => {
    return products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1;
  };

  const handleAddProduct = () => {
    const newProduct: ProductDataWithId = {
      id: getNextId(),
      title: "Nuevo Producto",
      description: "Descripción del producto",
      image: "../../public/image.png",
      additional: "Detalles adicionales",
    };
    setProducts([newProduct, ...products]);
  };

  const handleUpdateProduct = (id: number, data: ProductData) => {
    setProducts(products.map((p) => (p.id === id ? { ...p, ...data } : p)));
  };

  return (
    <>
      {isAdmin && (
        <div className="mb-4">
          <button
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            onClick={handleAddProduct}
          >
            Agregar Producto
          </button>
        </div>
      )}

      <div className="flex flex-wrap gap-6">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            {...product}
            isAdmin={isAdmin}
            onUpdate={(id, data) => handleUpdateProduct(id, data)}
          />
        ))}
      </div>
    </>
  );
};

export default ProductManager;
