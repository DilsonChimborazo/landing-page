import React, { useState } from "react";

export interface ProductData {
  id: number;
  title: string;
  description: string;
  image: string;
  additional: string;
}

interface ProductCardProps extends ProductData {
  isAdmin: boolean;
  onUpdate: (id: number, data: ProductData) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({
  id,
  title,
  description,
  image,
  additional,
  isAdmin,
  onUpdate,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState<ProductData>({
    id,
    title,
    description,
    image,
    additional,
  });

  const handleSave = () => {
    onUpdate(id, editedData);
    setIsEditing(false);
  };

  return (
    <div className="p-6 rounded-2xl bg-white/10 backdrop-blur-lg border border-orange-400/20 shadow-xl hover:shadow-2xl transition transform hover:scale-105">
      {isEditing ? (
        <div className="space-y-3">
          <input
            type="text"
            value={editedData.title}
            onChange={(e) =>
              setEditedData({ ...editedData, title: e.target.value })
            }
            className="w-full p-2 rounded bg-black/20 text-white border border-white/20"
          />
          <textarea
            value={editedData.description}
            onChange={(e) =>
              setEditedData({ ...editedData, description: e.target.value })
            }
            className="w-full p-2 rounded bg-black/20 text-white border border-white/20"
          />
          <input
            type="text"
            value={editedData.image}
            onChange={(e) =>
              setEditedData({ ...editedData, image: e.target.value })
            }
            className="w-full p-2 rounded bg-black/20 text-white border border-white/20"
          />
          <textarea
            value={editedData.additional}
            onChange={(e) =>
              setEditedData({ ...editedData, additional: e.target.value })
            }
            className="w-full p-2 rounded bg-black/20 text-white border border-white/20"
          />
          <button
            onClick={handleSave}
            className="px-4 py-2 rounded-full bg-orange-600 hover:bg-orange-700 text-white"
          >
            Guardar
          </button>
        </div>
      ) : (
        <div>
          <img
            src={image}
            alt={title}
            className="w-full h-40 object-cover rounded-xl mb-4"
          />
          <h3 className="text-2xl font-bold text-orange-400">{title}</h3>
          <p className="text-gray-200 mt-2">{description}</p>
          <p className="text-sm text-gray-400 mt-2">{additional}</p>
          {isAdmin && (
            <button
              onClick={() => setIsEditing(true)}
              className="mt-4 px-4 py-2 rounded-full border border-orange-400 text-orange-400 hover:bg-orange-500 hover:text-white transition"
            >
              Editar
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default ProductCard;
