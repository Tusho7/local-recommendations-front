import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getCategories } from "../services/categories";
import Layout from "../Layout";
import { Category } from "../types/category";

const Home = () => {
  const navigate = useNavigate();
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

  const handleAddCategory = () => {
    navigate("/add_category");
  };

  return (
    <Layout mainClassname={"flex-grow py-8 px-4"}>
      <div className="max-w-screen-xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 text-center">
            კატეგორიები
          </h1>

          <button
            className="bg-blue-600 text-white rounded-md shadow-md p-2"
            onClick={handleAddCategory}
          >
            კატეგორიის დამატება
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:justify-items-center">
          {categories &&
            categories.map((category) => (
              <Link
                key={category.id}
                to={`/category/${category.id}`}
                className="transform transition-transform hover:scale-105"
              >
                <div className="bg-gray-800 text-white rounded-lg shadow-md hover:shadow-lg transition duration-300 p-6 flex flex-col items-center text-center">
                  <h2 className="text-2xl font-semibold  mb-4">
                    {category.name}
                  </h2>
                </div>
              </Link>
            ))}
        </div>
      </div>
    </Layout>
  );
};

export default Home;
