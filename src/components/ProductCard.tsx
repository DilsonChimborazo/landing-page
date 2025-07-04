import React, { useState, ChangeEvent } from "react";

export interface ProductData {
  id: number;
  title: string;
  description: string;
  image: string;
  additional?: string;
}

interface ProductCardProps extends ProductData {
  isAdmin?: boolean;
  onUpdate?: (id: number, data: ProductData) => void;
  isActive?: boolean; // Nueva prop para indicar si el card está activo
}

const ProductCard: React.FC<ProductCardProps> = ({
  id,
  title,
  description,
  image,
  additional = "",
  isAdmin = false,
  onUpdate,
  isActive = false,
}) => {
  const [showInfoModal, setShowInfoModal] = useState(false);
  const [showFormModal, setShowFormModal] = useState(false);

  const [productTitle, setProductTitle] = useState(title);
  const [productDescription, setProductDescription] = useState(description);
  const [productImage, setProductImage] = useState(image);
  const [productAdditional, setProductAdditional] = useState(additional);

  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageURL = URL.createObjectURL(file);
      setProductImage(imageURL);
    }
  };

  const handleSave = () => {
    if (onUpdate && isAdmin) {
      const updatedData: ProductData = {
        id,
        title: productTitle,
        description: productDescription,
        image: productImage,
        additional: productAdditional,
      };
      onUpdate(id, updatedData);
    }
    setShowFormModal(false);
  };

  return (
    <>
      <div
        className={`w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg mx-auto p-4 bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 ${
          isActive ? "scale-105 shadow-lg z-10" : "z-0"
        }`}
      >
        <img
          src={productImage}
          alt={productTitle}
          className="w-full sm:h-56 md:h-40 object-cover"
          onError={(e) => {
            e.currentTarget.src = "";
            e.currentTarget.classList.add("opacity-50");
          }}
        />
        <div className="text-center p-2 sm:p-4">
          <h3 className="text-lg sm:text-xl md:text-2xl font-semibold mb-2 text-gray-900">{title}</h3>
          <p className="text-xs sm:text-sm md:text-base text-gray-700 mb-4 line-clamp-3">{description}</p>
          <div className="flex justify-center gap-2">
            <button
              onClick={() => setShowInfoModal(true)}
              className="bg-orange-600 text-white px-3 py-1 sm:px-4 sm:py-2 rounded-full hover:bg-orange-700 transition-colors text-xs sm:text-sm"
            >
              Más Información
            </button>
            {isAdmin && (
              <button
                onClick={() => setShowFormModal(true)}
                className="bg-blue-600 text-white px-3 py-1 sm:px-4 sm:py-2 rounded-full hover:bg-blue-700 transition-colors text-xs sm:text-sm"
              >
                Editar
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Modal de información */}
      {showInfoModal && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-center p-4">
          <div className="bg-white w-full max-w-md sm:max-w-lg md:max-w-xl p-4 sm:p-6 rounded-lg shadow-lg relative">
            <h3 className="text-lg sm:text-xl md:text-2xl font-semibold mb-4 text-gray-800">{title}</h3>
            <p className="text-xs sm:text-sm md:text-base text-gray-700 mb-6">{additional}</p>
            <button
              onClick={() => setShowInfoModal(false)}
              className="bg-orange-600 text-white px-3 py-1 sm:px-4 sm:py-2 rounded-full hover:bg-orange-700 transition-colors text-xs sm:text-sm"
            >
              Cerrar
            </button>
          </div>
        </div>
      )}

      {/* Modal de edición */}
      {showFormModal && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-center p-4">
          <div className="bg-white w-full max-w-md sm:max-w-lg md:max-w-xl p-4 sm:p-6 rounded-lg shadow-lg relative">
            <h3 className="text-lg sm:text-xl md:text-2xl font-semibold mb-4 text-gray-800">Editar Producto</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-xs sm:text-sm md:text-base font-medium text-gray-700">Título</label>
                <input
                  type="text"
                  value={productTitle}
                  onChange={(e) => setProductTitle(e.target.value)}
                  className="mt-1 w-full border rounded p-2 text-xs sm:text-sm md:text-base"
                />
              </div>
              <div>
                <label className="block text-xs sm:text-sm md:text-base font-medium text-gray-700">Descripción</label>
                <textarea
                  value={productDescription}
                  onChange={(e) => setProductDescription(e.target.value)}
                  className="mt-1 w-full border rounded p-2 text-xs sm:text-sm md:text-base resize-y"
                  rows={4}
                />
              </div>
              <div>
                <label className="block text-xs sm:text-sm md:text-base font-medium text-gray-700">Detalles adicionales</label>
                <textarea
                  value={productAdditional}
                  onChange={(e) => setProductAdditional(e.target.value)}
                  className="mt-1 w-full border rounded p-2 text-xs sm:text-sm md:text-base resize-y"
                  rows={4}
                />
              </div>
              <div>
                <label className="block text-xs sm:text-sm md:text-base font-medium text-gray-700">Imagen</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="mt-1 w-full border rounded p-2 text-xs sm:text-sm md:text-base"
                />
              </div>
              <div className="flex justify-end gap-2">
                <button
                  onClick={() => setShowFormModal(false)}
                  className="bg-gray-400 text-white px-3 py-1 sm:px-4 sm:py-2 rounded-full hover:bg-gray-500 transition-colors text-xs sm:text-sm"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleSave}
                  className="bg-green-600 text-white px-3 py-1 sm:px-4 sm:py-2 rounded-full hover:bg-green-700 transition-colors text-xs sm:text-sm"
                >
                  Guardar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductCard;