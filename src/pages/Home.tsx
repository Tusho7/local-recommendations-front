import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getCategories } from "../services/categories";
import Layout from "../Layout";
import { Category } from "../types/category";

const Home = () => {
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

  return (
    <Layout mainClassname={"flex-grow py-8 px-4 xl:px-0 "}>
      <div className="max-w-[1200px] mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 text-center">
            კატეგორიები
          </h1>
        </div>

        <div className="flex gap-2 items-center">
          {categories &&
            categories.map((category) => (
              <Link
                key={category.id}
                to={`/category/${category.id}`}
                className="transform transition-transform hover:scale-105"
              >
                <div className="border border-gray-300 rounded-lg shadow-md hover:shadow-lg transition duration-300 p-6 flex flex-col items-center text-center">
                  <h2 className="text-2xl font-semibold mb-4">
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
