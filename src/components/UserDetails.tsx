import { useState } from "react";
import { useUser } from "../contexts/UseUser";
import Modal from "../modals/Modal";
import EditProfile from "../modals/EditProfile";

const UserDetails = () => {
  const { user } = useUser();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-6 flex items-center gap-4">
      <img
        src={`${import.meta.env.VITE_API_STORAGE}${user?.profilePicture}`}
        alt="User"
        className="w-16 h-16 rounded-full object-cover"
      />
      <div className="flex flex-col md:flex-row justify-between w-full items-center">
        <div>
          <h2 className="text-2xl font-bold mb-2">{`${user?.firstName} ${user?.lastName}`}</h2>
          <p className="text-gray-600">{user?.email}</p>
        </div>
        <button
          onClick={openModal}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300 focus:outline-none"
        >
          პროფილის რედაქტირება
        </button>
      </div>

      <Modal onClose={closeModal} isOpen={isModalOpen}>
        <EditProfile onClose={closeModal} />
      </Modal>
    </div>
  );
};

export default UserDetails;
