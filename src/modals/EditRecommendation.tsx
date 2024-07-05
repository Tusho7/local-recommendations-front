import { useState } from "react";
import { RecommendationPropsForProfile } from "../types/recommendation";

interface EditModalProps {
  recommendation: RecommendationPropsForProfile;
  onSave: (recommendation: RecommendationPropsForProfile) => void;
  onCancel: () => void;
}

const EditModal = ({ recommendation, onSave, onCancel }: EditModalProps) => {
  const [editedRecommendation, setEditedRecommendation] =
    useState(recommendation);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setEditedRecommendation((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(editedRecommendation);
  };

  return (
    <div className="">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-bold mb-4 text-center">რედაქტირება</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              ობიექტი
            </label>
            <input
              type="text"
              name="name"
              value={editedRecommendation.name}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              შეფასება
            </label>
            <textarea
              name="review"
              value={editedRecommendation.review}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline resize-none"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              მისამართი
            </label>
            <input
              type="text"
              name="address"
              value={editedRecommendation.address}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              ტელეფონი
            </label>
            <input
              type="text"
              name="phoneNumber"
              value={editedRecommendation.phoneNumber}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              ვებსაიტი
            </label>
            <input
              type="text"
              name="website"
              value={editedRecommendation.website}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={onCancel}
              className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition duration-300"
            >
              გაუქმება
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300"
            >
              შენახვა
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditModal;
