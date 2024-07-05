import { useUser } from "../contexts/UseUser";

const UserDetails = () => {
  const { user } = useUser();
  return (
    <div className="user-info bg-white p-6 rounded-lg shadow-md mb-6 flex items-center gap-4">
      <img
        src={`${import.meta.env.VITE_API_STORAGE}${user?.profilePicture}`}
        alt="User"
        className="w-16 h-16 rounded-full object-cover"
      />
      <div>
        <h2 className="text-2xl font-bold mb-2">{`${user?.firstName} ${user?.lastName}`}</h2>
        <p className="text-gray-600">{user?.email}</p>
      </div>
    </div>
  );
};

export default UserDetails;
