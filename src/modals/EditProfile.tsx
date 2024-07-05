import { ChangeEvent, FormEvent, useState } from "react";
import { ModalOnClose } from "../types/modal";
import { useUser } from "../contexts/UseUser";
import Swal from "sweetalert2";
import VerificationCodeInput from "../components/VerificationCodeInput";
import { UpdateUser } from "../services/api/Auth";
import Loading from "../components/Loading";

const EditProfile = ({ onClose }: ModalOnClose) => {
  const { user } = useUser();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
  });
  const [loading, setLoading] = useState(false);
  const [updateComplete, setUpdateComplete] = useState(false);
  const [logout, setLogout] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoading(true);

    try {
      await UpdateUser(user?.id, formData);
      Swal.fire({
        icon: "success",
        title: "პროფილი განახლებულია",
        text: "თქვენი პროფილი წარმატებით განახლდა",
      });
      if (formData.email) {
        setUpdateComplete(true);
        setLogout(true);
      } else {
        onClose();
      }
    } catch (error) {
      console.error("Error updating user:", error);
      Swal.fire({
        icon: "error",
        title: "შეცდომა",
        text: "პროფილის განახლებისას დაფიქსირდა შეცდომა",
      });
    } finally {
      setLoading(false);
      setLogout(false);
    }
  };

  if (updateComplete) {
    return <VerificationCodeInput email={formData.email} logout={logout} />;
  }
  return (
    <div className="bg-white p-6 rounded-lg shadow-md max-w-md ">
      <h2 className="text-2xl font-bold mb-4">პროფილის რედაქტირება</h2>
      {loading && <Loading />}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            ელ-ფოსტა
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            placeholder={user?.email}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700"
          >
            პაროლი
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder={"********"}
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="firstName"
            className="block text-sm font-medium text-gray-700"
          >
            სახელი
          </label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder={user?.firstName}
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="lastName"
            className="block text-sm font-medium text-gray-700"
          >
            გვარი
          </label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder={user?.lastName}
          />
        </div>
        <div className="flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="mr-2 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            გაუქმება
          </button>
          <button
            type="submit"
            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            განახლება
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProfile;
