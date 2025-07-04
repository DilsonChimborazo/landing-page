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
}

const ProductCard: React.FC<ProductCardProps> = ({
  id,
  title,
  description,
  image,
  additional = "",
  isAdmin = false,
  onUpdate,
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
      <div className="w-56 py-4 h-auto bg-white rounded-lg shadow-md overflow-hidden">
        <img
          src={productImage}
          alt={productTitle}
          className="w-full h-56 object-cover"
          onError={(e) => {
            e.currentTarget.src = "";
            e.currentTarget.classList.add("opacity-50");
          }}
        />
        <div className="text-center">
          <h3 className="text-xl font-semibold mb-2 text-gray-900">{title}</h3>
          <p className="text-sm text-gray-700 mb-4">{description}</p>
          <div className="flex justify-center gap-2">
            <button
              onClick={() => setShowInfoModal(true)}
              className="bg-orange-600 text-white px-3 py-1 rounded-full hover:bg-orange-700 transition-colors text-sm"
            >
              Más Información
            </button>
            {isAdmin && (
              <button
                onClick={() => setShowFormModal(true)}
                className="bg-blue-600 text-white px-3 py-1 rounded-full hover:bg-blue-700 transition-colors text-sm"
              >
                Editar
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Modal de información */}
      {showInfoModal && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white w-96 max-w-full p-6 rounded-lg shadow-lg relative">
            <h3 className="text-xl font-semibold mb-4 text-gray-800">{title}</h3>
            <p className="text-gray-700 text-sm mb-6">{additional}</p>
            <button
              onClick={() => setShowInfoModal(false)}
              className="bg-orange-600 text-white px-4 py-2 rounded-full hover:bg-orange-700 transition-colors text-sm"
            >
              Cerrar
            </button>
          </div>
        </div>
      )}

      {/* Modal de edición */}
      {showFormModal && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white w-96 max-w-full p-6 rounded-lg shadow-lg relative">
            <h3 className="text-xl font-semibold mb-4 text-gray-800">Editar Producto</h3>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSave();
              }}
              className="space-y-4"
            >
              <div>
                <label className="block text-sm font-medium text-gray-700">Título</label>
                <input
                  type="text"
                  value={productTitle}
                  onChange={(e) => setProductTitle(e.target.value)}
                  className="mt-1 w-full border rounded p-2 text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Descripción</label>
                <textarea
                  value={productDescription}
                  onChange={(e) => setProductDescription(e.target.value)}
                  className="mt-1 w-full border rounded p-2 text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Detalles adicionales</label>
                <textarea
                  value={productAdditional}
                  onChange={(e) => setProductAdditional(e.target.value)}
                  className="mt-1 w-full border rounded p-2 text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Imagen</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="mt-1 w-full border rounded p-2 text-sm"
                />
              </div>
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowFormModal(false)}
                  className="bg-gray-400 text-white px-4 py-2 rounded-full hover:bg-gray-500 transition-colors text-sm"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="bg-green-600 text-white px-4 py-2 rounded-full hover:bg-green-700 transition-colors text-sm"
                >
                  Guardar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductCard;
