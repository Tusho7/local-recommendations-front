import { useEffect, useState } from "react";
import {
  blockUnblockUser,
  deleteUser,
  getUsers,
} from "../../services/admin/users";
import { User } from "../../types/user";
import Swal from "sweetalert2";

const AdminUsers = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredUsers(users);
    } else {
      const filtered = users.filter(
        (user) =>
          user.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
          user.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
          (user.isBlocked ? "დაბლოკილია" : "აქტიურია")
            .toLowerCase()
            .includes(searchQuery.toLowerCase())
      );
      setFilteredUsers(filtered);
    }
  }, [searchQuery, users]);

  const fetchUsers = async () => {
    try {
      const response = await getUsers();
      setUsers(response.data);
      setFilteredUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
      Swal.fire("შეცდომა!", "მომხმარებელების ჩატვირთვა ვერ მოხერხდა.", "error");
    }
  };

  const handleToggleBlockUser = async (id: number, isBlocked: boolean) => {
    const actionVerb = isBlocked ? "განიბლოკება" : "დაიბლოკება";
    const result = await Swal.fire({
      title: `დარწმუნებული ხარ?`,
      text: `მომხმარებელი ${actionVerb}!`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: isBlocked ? "#3085d6" : "#d33",
      cancelButtonColor: "#6c757d",
      confirmButtonText: `დიახ`,
      cancelButtonText: "გაუქმება",
    });

    if (result.isConfirmed) {
      try {
        await blockUnblockUser(id);
        updateBlockStatus(id, !isBlocked);
        const successMessage = isBlocked ? "განბლოკილია!" : "დაბლოკილია!";
        Swal.fire("წარმატება!", `მომხმარებელი ${successMessage}`, "success");
      } catch (error) {
        console.error(`Error ${actionVerb.toLowerCase()} user:`, error);
        const errorMessage = isBlocked ? "განბლოკვა" : "დაბლოკვა";
        Swal.fire(
          "შეცდომა!",
          `მომხმარებლის ${errorMessage} ვერ მოხერხდა.`,
          "error"
        );
      }
    }
  };

  const updateBlockStatus = (id: number, isBlocked: boolean) => {
    const updatedUsers = users.map((user) =>
      user.id === id ? { ...user, isBlocked } : user
    );
    setUsers(updatedUsers);
    setFilteredUsers(updatedUsers);
  };

  const handleSearchInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSearchQuery(event.target.value);
  };

  const handleDeleteUser = async (id: number) => {
    const result = await Swal.fire({
      title: "დარწმუნებული ხარ?",
      text: "მომხმარებელი წაიშლება!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#6c757d",
      confirmButtonText: "დიახ",
      cancelButtonText: "გაუქმება",
    });

    if (result.isConfirmed) {
      try {
        await deleteUser(id);
        const updatedUsers = users.filter((user) => user.id !== id);
        setUsers(updatedUsers);
        setFilteredUsers(updatedUsers);
        Swal.fire("წარმატება!", "მომხმარებელი წაიშალა!", "success");
      } catch (error) {
        console.error("Error deleting user:", error);
        Swal.fire("შეცდომა!", "მომხმარებლის წაშლა ვერ მოხერხდა.", "error");
      }
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-center">მომხმარებლები</h1>
      <div className="mb-4">
        <input
          type="text"
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
          placeholder="ძებნა სახელი, გვარი, სტატუსი"
          value={searchQuery}
          onChange={handleSearchInputChange}
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredUsers.map((user) => (
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
              <p className="mb-2">
                <span className="font-semibold">სტატუსი:</span>{" "}
                {user.isBlocked ? "დაბლოკილია" : "აქტიურია"}
              </p>
            </div>
            <button
              onClick={() => handleToggleBlockUser(user.id, user.isBlocked)}
              className={`${
                user.isBlocked ? "bg-green-500" : "bg-red-500"
              } text-white px-2 py-1 rounded hover:bg-opacity-80 transition duration-300 mt-4 mr-2`}
            >
              {user.isBlocked ? "განბლოკვა" : "დაბლოკვა"}
            </button>
            <button
              onClick={() => handleDeleteUser(user.id)}
              className="bg-red-500 text-white px-2 py-1 rounded hover:bg-opacity-80 transition duration-300 mt-4"
            >
              წაშლა
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminUsers;
