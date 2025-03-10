import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { Logout, verifyUser } from "../services/api/Auth";

interface VerificationCodeProps {
  email: string;
  logout?: boolean;
  className?: string;
}

const VerificationCodeInput = ({
  email,
  logout,
  className,
}: VerificationCodeProps) => {
  const [verificationCode, setVerificationCode] = useState("");
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await verifyUser(email, verificationCode);
      Swal.fire({
        icon: "success",
        title: "წარმატება",
        text: "ვერიფიკაცია წარმატებით გაიარეთ !",
      });
      if (logout) {
        Logout();
        localStorage.clear();
        window.location.href = "/";
      } else {
        localStorage.clear();
        navigate("/");
      }
    } catch (error) {
      console.error("Verification failed:", error);
      setError("Invalid verification code. Please try again.");
      Swal.fire({
        icon: "error",
        title: "შეცდომა",
        text: "ვერიფიკაცია ვერ მოხერხდა",
      });
    }
  };

  return (
    <div className={` ${className}`}>
      <div className="max-w-lg w-full bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-3xl font-extrabold text-gray-900 text-center mb-6">
          შეიყვანეთ ვერიფიკაციის კოდი
        </h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="space-y-2">
            <p className="text-gray-700">
              ვერიფიკაციის კოდი გამოგზავნილია ელ-ფოსტაზე.
            </p>
          </div>
          <div className="space-y-2">
            <label htmlFor="verificationCode" className="sr-only">
              ვერიფიკაციის კოდი
            </label>
            <input
              id="verificationCode"
              name="verificationCode"
              type="text"
              autoComplete="off"
              required
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value)}
              className="block w-full px-4 py-3 border border-gray-300 rounded-md placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              placeholder="ვერიფიკაციის კოდი"
            />
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button
            type="submit"
            className="w-full py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            ვერიფიკაცია
          </button>
        </form>
      </div>
    </div>
  );
};

export default VerificationCodeInput;
