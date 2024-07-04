import { useState } from "react";
import { useUser } from "../contexts/UseUser";
import { ModalProps } from "../types/modal";
import { createRecommendation } from "../services/recommendations";
import { useParams } from "react-router-dom";
import Loading from "../components/Loading";

const AddRecommendation = ({ onClose }: ModalProps) => {
  const categoryId = useParams<{ id: string }>().id;
  const { user } = useUser();
  const [recommendationName, setRecommendationName] = useState("");
  const [review, setReview] = useState("");
  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [website, setWebsite] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const userId = user?.id || "";

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const payload = {
        name: recommendationName,
        review,
        address,
        phoneNumber,
        website,
        userId,
        categoryId,
      };

      await createRecommendation(payload);

      setSuccess(true);
      setRecommendationName("");
      setReview("");
      setAddress("");
      setPhoneNumber("");
      setWebsite("");
    } catch (error) {
      console.error("Error adding recommendation:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2 className="text-3xl font-semibold text-center mb-12">
        რეკომენდაციის დამატება
      </h2>
      {loading && <Loading />}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            htmlFor="recommendationName"
            className="block text-gray-700 font-semibold mb-2"
          >
            რეკომენდაციის სახელი:
          </label>
          <input
            type="text"
            id="recommendationName"
            value={recommendationName}
            onChange={(e) => setRecommendationName(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
            required
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="review"
            className="block text-gray-700 font-semibold mb-2"
          >
            შეფასება/აღწერა:
          </label>
          <textarea
            id="review"
            value={review}
            onChange={(e) => setReview(e.target.value)}
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
          ></textarea>
        </div>
        <div className="mb-4">
          <label
            htmlFor="address"
            className="block text-gray-700 font-semibold mb-2"
          >
            მისამართი:
          </label>
          <input
            type="text"
            id="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
            required
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="phoneNumber"
            className="block text-gray-700 font-semibold mb-2"
          >
            ტელ.ნომერი:
          </label>
          <input
            type="text"
            id="phoneNumber"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
            required
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="website"
            className="block text-gray-700 font-semibold mb-2"
          >
            ვებგვერდის მისამართი:
          </label>
          <input
            type="text"
            id="website"
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
            required
          />
        </div>
        {success && (
          <p className="text-green-500 mb-4 text-center">წარმატებით დაემატა!</p>
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

export default AddRecommendation;
