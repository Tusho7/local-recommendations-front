import { useState, useEffect } from "react";
import { useAdmin } from "../../contexts/UseAdmin";
import {
  totalUsers,
  totalCategories,
  totalRecommendations,
} from "../../services/admin/total";
import { totalMetrics } from "../../services/admin/metrics";
import { ServerMetrics } from "../../types/serverMetrics";
import WeatherComponent from "../../components/Weather";

const AdminDashboard = () => {
  const { admin } = useAdmin();
  const adminFullName = admin?.firstName + " " + admin?.lastName;
  const [userDataCount, setUserDataCount] = useState<number>(0);
  const [categoriesCount, setCategoriesCount] = useState<number>(0);
  const [recommendationsCount, setRecommendationsCount] = useState<number>(0);
  const [serverMetrics, setServerMetrics] = useState<ServerMetrics>({
    uptime: "",
    freeMemory: 0,
    totalMemory: 0,
    loadAverage: [0, 0, 0],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const usersResponse = await totalUsers();
        setUserDataCount(usersResponse.data.totalUsers);

        const categoriesResponse = await totalCategories();
        setCategoriesCount(categoriesResponse.data.totalCategories);

        const recommendationsResponse = await totalRecommendations();
        setRecommendationsCount(
          recommendationsResponse.data.totalRecommendations
        );

        const metricsResponse = await totalMetrics();
        setServerMetrics(metricsResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const currentDate = new Date().toLocaleDateString("ka-GE", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const formatBytes = (bytes: number) => {
    if (bytes === 0) return "0 GB";
    const gb = bytes / 1024 / 1024 / 1024;
    return gb.toFixed(2) + " GB";
  };

  return (
    <div className="container mx-auto px-4 flex flex-col gap-10">
      <h1 className="text-4xl text-center mb-8 mt-6">ადმინ პანელი</h1>

      <section className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl text-gray-800">
            მოგესალმებით, <span className="font-semibold">{adminFullName}</span>
          </h1>
        </div>
        <div>
          <h1 className="text-2xl text-gray-800">{currentDate}</h1>
        </div>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-blue-500 rounded-3xl shadow-md p-6 text-white max-w-[300px]">
          <h2 className="text-xl font-semibold mb-4">მომხმარებლები</h2>
          <p className="text-3xl text-center">{userDataCount}</p>
        </div>

        <div className="bg-purple-500 rounded-3xl shadow-md p-6 text-white max-w-[300px]">
          <h2 className="text-xl font-semibold mb-4">კატეგორიები</h2>
          <p className="text-3xl text-center">{categoriesCount}</p>
        </div>

        <div className="bg-red-500 rounded-3xl shadow-md p-6 text-white max-w-[300px]">
          <h2 className="text-xl font-semibold mb-4">რეკომენდაციები</h2>
          <p className="text-3xl text-center">{recommendationsCount}</p>
        </div>
      </div>

      <div className="mt-8 bg-white rounded-lg shadow-2xl p-6">
        <h2 className="text-2xl font-semibold mb-4">სერვერის მდგომარეობა</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-lg">
              <strong>მუშაობის დრო:</strong> {serverMetrics.uptime}
            </p>
            <p className="text-lg">
              <strong>თავისუფალი მეხსიერება:</strong>{" "}
              {formatBytes(serverMetrics.freeMemory)}
            </p>
          </div>
          <div>
            <p className="text-lg">
              <strong>საერთო მეხსიერება:</strong>{" "}
              {formatBytes(serverMetrics.totalMemory)}
            </p>
            <p className="text-lg">
              <strong>დატვირთვა:</strong> {serverMetrics.loadAverage.join(", ")}
            </p>
          </div>
        </div>
      </div>

      <WeatherComponent />
    </div>
  );
};

export default AdminDashboard;
