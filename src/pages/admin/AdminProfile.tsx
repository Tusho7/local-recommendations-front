import { useState } from "react";
import { useAdmin } from "../../contexts/UseAdmin";
import { UpdateAdmin } from "../../services/admin/api/Auth";
import Swal from "sweetalert2";
import { AdminUpdate } from "../../types/admin";
import { useNavigate } from "react-router-dom";

const AdminProfile = () => {
  const navigate = useNavigate();
  const { admin } = useAdmin();
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [error, setError] = useState("");

  const adminId = admin?.id;

  const handleCredentialsChange = async () => {
    const updateData: AdminUpdate = {
      currentPassword: currentPassword,
      newPassword: newPassword,
      newEmail: newEmail,
    };

    if (newEmail && newEmail !== admin?.email) {
      updateData.newEmail = newEmail;
    }

    if (newPassword && confirmNewPassword) {
      if (newPassword !== confirmNewPassword) {
        setPasswordError("Passwords do not match.");
        return;
      }
      updateData.currentPassword = currentPassword;
      updateData.newPassword = newPassword;
    } else if (newPassword || confirmNewPassword) {
      setPasswordError("Please fill out all password fields.");
      return;
    }

    try {
      await UpdateAdmin(adminId, updateData);
      setCurrentPassword("");
      setNewPassword("");
      setConfirmNewPassword("");
      setNewEmail("");
      setPasswordError("");
      setError("");
      localStorage.clear();
      Swal.fire({
        icon: "success",
        title: "პროფილი განახლდა",
        text: "პროფილი წარმატებით განხლდა",
      });
      navigate("/admin_login");
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setError(error.response.data.message);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: error.response.data.message,
        });
      } else {
        setError("Server Error. Please try again later.");
      }
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto bg-white shadow-md rounded-lg overflow-hidden">
        <div className="px-6 py-4">
          <h1 className="text-3xl font-semibold text-gray-800 mb-4">პროფილი</h1>
          <div className="grid grid-cols-2 gap-x-4 gap-y-2 mb-6">
            <div className="text-sm text-gray-600">სახელი:</div>
            <div className="text-sm">{admin?.firstName}</div>
            <div className="text-sm text-gray-600">გვარი:</div>
            <div className="text-sm">{admin?.lastName}</div>
            <div className="text-sm text-gray-600">ელ-ფოსტა:</div>
            <div className="text-sm">{admin?.email}</div>
          </div>

          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              შეცვალე პაროლი
            </h2>
            <input
              type="password"
              placeholder="ამჟამინდელი პაროლი"
              className="w-full px-3 py-2 border rounded-md text-sm outline-none focus:border-blue-500"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
            />
            <input
              type="password"
              placeholder="ახალი პაროლი"
              className="w-full mt-2 px-3 py-2 border rounded-md text-sm outline-none focus:border-blue-500"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <input
              type="password"
              placeholder="დაადასტურე ახალი პაროლი"
              className="w-full mt-2 px-3 py-2 border rounded-md text-sm outline-none focus:border-blue-500"
              value={confirmNewPassword}
              onChange={(e) => setConfirmNewPassword(e.target.value)}
            />
            {passwordError && (
              <p className="text-red-500 text-sm mt-1">{passwordError}</p>
            )}
          </div>

          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              შეცვალე ელ-ფოსტა
            </h2>
            <input
              type="email"
              placeholder="ახალი ელ-ფოსტა"
              className="w-full px-3 py-2 border rounded-md text-sm outline-none focus:border-blue-500"
              value={newEmail}
              onChange={(e) => setNewEmail(e.target.value)}
            />
            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
          </div>

          <button
            className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-md text-sm hover:bg-blue-600"
            onClick={handleCredentialsChange}
          >
            განახლება
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminProfile;
