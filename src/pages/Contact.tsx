import React, { useState } from "react";
import Layout from "../Layout";
import Loading from "../components/Loading";
import { useUser } from "../contexts/UseUser";
import { contact } from "../services/contact";

const Contact: React.FC = () => {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const { user } = useUser();

  const userEmail = user?.email || "";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await contact({ name, userEmail, message });
      setSuccess(true);
      setName("");
      setMessage("");
    } catch (error) {
      console.error("Error sending message:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout mainClassname="max-w-screen-md mx-auto">
      <h1 className="text-4xl font-bold text-gray-800 text-center mb-8">
        კონტაქტი
      </h1>
      {loading && <Loading />}
      <form
        onSubmit={handleSubmit}
        className="bg-[#fefefe] rounded-lg shadow-md p-8"
      >
        {success && (
          <p className="text-green-500 mb-4">
            მადლობას გიხდით დაკავშირებისთვის!
          </p>
        )}
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-700">
            სახელი
          </label>
          <input
            type="text"
            id="name"
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="message" className="block text-gray-700">
            ტექსტი
          </label>
          <textarea
            id="message"
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 resize-none"
            rows={4}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
          />
        </div>
        <div className="text-center">
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300"
          >
            გაგზავნა
          </button>
        </div>
      </form>
    </Layout>
  );
};

export default Contact;
