import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, EffectCoverflow } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/effect-coverflow";
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
      id: Date.now(),
      title: "Nuevo Producto",
      description: "Descripción del producto",
      image: "/public/image.png",
      additional: "Detalles adicionales",
    };
    await addProduct(newProduct);
    setProducts([newProduct, ...products]);
  };

  const handleUpdateProduct = async (id: number, data: ProductData) => {
    await updateProduct(id, data);
    setProducts(products.map((p) => (p.id === id ? data : p)));
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {isAdmin && (
        <div className="mb-4 flex justify-end">
          <button
            className="bg-gradient-to-r from-orange-500 to-red-600 text-white px-4 py-2 rounded-full shadow hover:shadow-lg transition"
            onClick={handleAddProduct}
          >
            Agregar Producto
          </button>
        </div>
      )}
      <Swiper
        modules={[Navigation, EffectCoverflow]}
        spaceBetween={30}
        slidesPerView={3}
        effect="coverflow"
        coverflowEffect={{
          rotate: 0,
          stretch: 0,
          depth: 100,
          modifier: 2.5,
          slideShadows: false,
        }}
        navigation
        autoplay={{ delay: 3000 }}
        className="w-full"
      >
        {products.map((product) => (
          <SwiperSlide key={product.id}>
            <ProductCard
              {...product}
              isAdmin={isAdmin}
              onUpdate={(updatedId, data) => handleUpdateProduct(updatedId, data)}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ProductManager;
