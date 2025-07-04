import React, { useEffect, useState } from "react";
import ProductCard, { ProductData } from "./ProductCard";
import { fetchProducts, addProduct, updateProduct } from "../service/ProductService";

interface ProductManagerProps {
  isAdmin: boolean;
}

const ProductManager: React.FC<ProductManagerProps> = ({ isAdmin }) => {
  const [products, setProducts] = useState<ProductData[]>([]);

  useEffect(() => {
    const load = async () => {
      const data = await fetchProducts();
      setProducts(data);
    };
    load();
  }, []);

  const handleAddProduct = async () => {
    const newProduct: ProductData = {
      id: Date.now(), // ✅ ID único basado en el timestamp actual
      title: "Nuevo Producto",
      description: "Descripción del producto",
      image: "../../public/image.png",
      additional: "Detalles adicionales"
    };
    await addProduct(newProduct);
    setProducts([newProduct, ...products]);
  };

  const handleUpdateProduct = async (id: number, data: ProductData) => {
    await updateProduct(id, data);
    setProducts(products.map(p => (p.id === id ? data : p)));
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
            key={product.id} // 🔐 ahora será único
            {...product}
            isAdmin={isAdmin}
            onUpdate={(updatedId, data) => handleUpdateProduct(updatedId, data)}
          />
        ))}
      </div>
    </>
  );
};

export default ProductManager;
