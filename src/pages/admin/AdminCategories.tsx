import React, { useEffect, useState } from "react";
import { getCategories } from "../../services/categories";
import { Category } from "../../types/category";
import { deleteCategory, updateCategory } from "../../services/admin/category";

const AdminCategories = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [editMode, setEditMode] = useState<number | null>(null);
  const [newCategoryName, setNewCategoryName] = useState<string>("");

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await getCategories();
      setCategories(response.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const handleDeleteCategory = async (id: number) => {
    try {
      await deleteCategory(id);
      setCategories(categories.filter((category) => category.id !== id));
    } catch (error) {
      console.error("Error deleting category:", error);
    }
  };

  const handleEditCategory = async (id: number) => {
    try {
      await updateCategory(id, {
        name: newCategoryName,
      });
      setEditMode(null);
      setNewCategoryName("");
      fetchCategories();
    } catch (error) {
      console.error("Error updating category:", error);
    }
  };

  const cancelEdit = () => {
    setEditMode(null);
    setNewCategoryName("");
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewCategoryName(event.target.value);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">კატეგორიები</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories &&
          categories.map((category) => (
            <div
              key={category.id}
              className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition duration-300"
            >
              <div className="p-6">
                {editMode === category.id ? (
                  <div className="flex flex-col">
                    <input
                      type="text"
                      className="border rounded px-2 py-1 w-full mb-2"
                      value={newCategoryName}
                      onChange={handleInputChange}
                    />
                    <div className="flex justify-between">
                      <button
                        className="bg-green-500 hover:bg-green-600 text-white px-4 py-1 rounded mr-2 transition duration-300"
                        onClick={() => handleEditCategory(category.id)}
                      >
                        შენახვა
                      </button>
                      <button
                        className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-1 rounded transition duration-300"
                        onClick={cancelEdit}
                      >
                        გაუქმება
                      </button>
                    </div>
                  </div>
                ) : (
                  <div>
                    <h2 className="text-2xl font-semibold text-gray-800">
                      {category.name}
                    </h2>
                    <div className="flex justify-between items-center pt-4">
                      <button
                        className="text-md text-red-500 hover:text-red-700 focus:outline-none mr-2 transition duration-300"
                        onClick={() => handleDeleteCategory(category.id)}
                      >
                        წაშლა
                      </button>
                      <button
                        className="text-md text-blue-500 hover:text-blue-700 focus:outline-none transition duration-300"
                        onClick={() => {
                          setEditMode(category.id);
                          setNewCategoryName(category.name);
                        }}
                      >
                        რედაქტირება
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default AdminCategories;
