import { useEffect, useState } from "react";
import { getUsers } from "../../services/admin/users";
import { User } from "../../types/user";

const AdminUsers = () => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await getUsers();
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-center">მომხმარებლები</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {users &&
          users.map((user) => (
            <div
              key={user.id}
              className="bg-white rounded-lg shadow-md hover:shadow-lg transition duration-300 p-6"
            >
              <div className="flex items-center mb-4">
                <img
                  src={`${import.meta.env.VITE_API_STORAGE}${
                    user?.profilePicture
                  }`}
                  alt="Profile"
                  className="w-16 h-16 rounded-full object-cover mr-4"
                />
                <div>
                  <h2 className="text-xl font-semibold text-gray-800">
                    {user.firstName} {user.lastName}
                  </h2>
                  <p className="text-gray-600">{user.email}</p>
                </div>
              </div>
              <div className="text-gray-600">
                <p className="mb-2">
                  <span className="font-semibold">ID:</span> {user.id}
                </p>
                <p className="mb-2">
                  <span className="font-semibold">ვერიფიცირებული:</span>{" "}
                  {user.isVerified ? "კი" : "არა"}
                </p>
                <p className="mb-2">
                  <span className="font-semibold">პაროლი:</span>{" "}
                  <span className="italic">ჰეშირებულია უსაფრთხოებისთვის</span>
                </p>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default AdminUsers;
