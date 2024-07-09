import { useEffect, useState } from "react";
import { getCategories } from "../../services/categories";
import { Category } from "../../types/category";
import { deleteCategory } from "../../services/admin/category";

const AdminCategories = () => {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await getCategories();
        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  const handleDeleteCategory = async (id: number) => {
    try {
      const response = await deleteCategory(id);
      console.log(response);
      setCategories(categories.filter((category) => category.id !== id));
    } catch (error) {
      console.error("Error deleting category:", error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">კატეგორიები</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((category) => (
          <div
            key={category.id}
            className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition duration-300"
          >
            <div className="p-6">
              <h2 className="text-2xl font-semibold text-gray-800">
                {category.name}
              </h2>
            </div>
            <div className="flex justify-start items-center px-6 py-4 bg-gray-100">
              <button
                className="text-md text-red-500 hover:text-red-700 focus:outline-none"
                onClick={() => handleDeleteCategory(category.id)}
              >
                წაშლა
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminCategories;
