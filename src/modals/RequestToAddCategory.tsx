import React, { useState } from "react";
import { useUser } from "../contexts/UseUser";
import { addCategoryRequest } from "../services/contact";
import { ModalProps } from "../types/modal";
import Loading from "../components/Loading";

const RequestToAddCategory: React.FC<ModalProps> = ({ onClose }) => {
  const { user } = useUser();

  const [categoryName, setCategoryName] = useState("");
  const [comment, setComment] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const userEmail = user?.email || "";

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    try {
      await addCategoryRequest({ categoryName, userEmail, comment });
      setSuccess(true);
      setCategoryName("");
      setComment("");
    } catch (error) {
      console.error("Error sending message:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-3xl font-semibold text-center mb-12">
        კატეგორიის დამატების მოთხოვნა
      </h2>
      {loading && <Loading />}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            htmlFor="categoryName"
            className="block text-gray-700 font-semibold mb-2"
          >
            კატეგორიის სახელი:
          </label>
          <input
            type="text"
            id="categoryName"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
            required
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="comment"
            className="block text-gray-700 font-semibold mb-2"
          >
            კომენტარი:
          </label>
          <textarea
            id="comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500 resize-none"
          ></textarea>
        </div>
        {success && (
          <p className="text-green-500 mb-4 text-center">
            მადლობა, თქვენი მოთხოვნა მიღებულია!
          </p>
        )}
        <div className="flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="mr-2 px-4 py-2 text-gray-600 border border-gray-300 rounded-lg focus:outline-none hover:bg-gray-100"
          >
            გაუქმება
          </button>
          <button
            type="submit"
            className="px-4 py-2 text-white bg-indigo-600 border border-transparent rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            გაგზავნა
          </button>
        </div>
      </form>
    </div>
  );
};

export default RequestToAddCategory;
