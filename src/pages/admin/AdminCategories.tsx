import React, { useEffect, useState } from "react";
import { getCategories } from "../../services/categories";
import { Category } from "../../types/category";
import {
  createCategory,
  deleteCategory,
  updateCategory,
} from "../../services/admin/category";
import Swal from "sweetalert2";

const AdminCategories = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [editMode, setEditMode] = useState<number | null>(null);
  const [newCategoryName, setNewCategoryName] = useState<string>("");
  const [editCategoryName, setEditCategoryName] = useState<string>("");

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
      Swal.fire("წაიშალა!", "კატეგორია წარმატებით წაიშალა.", "success");
    } catch (error) {
      console.error("Error deleting category:", error);
      Swal.fire("Error!", `Failed to delete category: ${error}`, "error");
    }
  };

  const handleEditCategory = async (id: number) => {
    try {
      await updateCategory(id, {
        name: editCategoryName,
      });
      setEditMode(null);
      setEditCategoryName("");
      fetchCategories();
      Swal.fire("განახლება!", "კატეგორია წარმატებით განახლდა.", "success");
    } catch (error) {
      console.error("Error updating category:", error);
      Swal.fire("Error!", `Failed to update category: ${error}`, "error");
    }
  };

  const cancelEdit = () => {
    setEditMode(null);
    setEditCategoryName("");
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (editMode !== null) {
      setEditCategoryName(event.target.value);
    } else {
      setNewCategoryName(event.target.value);
    }
  };

  const handleAddCategory = async () => {
    try {
      const response = await createCategory({ name: newCategoryName });
      setCategories([...categories, response.data]);
      setNewCategoryName("");
      Swal.fire("დამატებულია!", "კატეგორია წარმატებით დაემატა", "success");
    } catch (error) {
      console.error("Error adding category:", error);
      Swal.fire("Error!", `Failed to add category: ${error}`, "error");
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">კატეგორიები</h1>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleAddCategory();
        }}
        className="mb-8 max-w-md mx-auto"
      >
        <div className="flex items-center border border-gray-300 rounded-md overflow-hidden">
          <input
            type="text"
            name="newCategoryName"
            placeholder="ახალი კატეგორიის სახელი"
            value={newCategoryName}
            onChange={handleInputChange}
            className="px-3 py-2 w-full focus:outline-none"
            required
          />

          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-r focus:outline-none"
          >
            დამატება
          </button>
        </div>
      </form>

      {/* Display existing categories */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((category) => (
          <div
            key={category.id}
            className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition duration-300"
          >
            <div className="p-6">
              {editMode === category.id ? (
                // Edit mode view
                <div className="flex flex-col">
                  <input
                    type="text"
                    className="border rounded px-2 py-1 mb-2 w-full"
                    value={editCategoryName}
                    onChange={(e) => setEditCategoryName(e.target.value)}
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
                // Display mode view
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
                        setEditCategoryName(category.name);
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
