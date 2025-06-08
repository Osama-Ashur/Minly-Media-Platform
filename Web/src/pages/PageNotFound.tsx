import { useNavigate } from "react-router-dom";
import { IoAlertCircleOutline } from "react-icons/io5";

export default function PageNotFound() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-5 bg-white">
      <IoAlertCircleOutline size={80} className="text-gray-500" />
      <h1 className="text-2xl font-bold mt-5 mb-2.5 text-gray-800">
        Page Not Found
      </h1>
      <p className="text-base text-center text-gray-600 mb-8">
        The page you're looking for doesn't exist or has been moved.
      </p>
      <button
        onClick={() => navigate(-1)}
        className="bg-[#e02037] text-white px-5 py-3 rounded-lg shadow-md text-base font-semibold hover:bg-[#c81c2f] transition-colors"
      >
        Go Back
      </button>
    </div>
  );
}
