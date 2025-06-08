import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import Logo from "/minly_logo1.png";
import Spinner from "../ui/Spinner";

export default function Nav() {
  const { user, logout, loading } = useAuth();

  if (loading) {
    return <Spinner />;
  }

  return (
    <header className="gradient-bg shadow">
      <div className="container mx-auto md:px-10 px-5 py-3 flex justify-between items-center">
        <Link to="/">
          <img className="w-20" src={Logo} alt="Minly" />
        </Link>
        <nav>
          {user ? (
            <div className="flex items-center space-x-4 md:space-x-10">
              <div>
                <p className="text-white hover:text-gray-300 font-bold cursor-pointer">
                  {user?.username}
                </p>
              </div>
              <button
                onClick={logout}
                className="bg-white px-4 py-2 rounded-lg text-[#e02037] font-semibold hover:bg-gray-200 cursor-pointer"
              >
                Logout
              </button>
            </div>
          ) : (
            <Link
              to="/auth"
              className="bg-white px-4 py-2 rounded-lg text-[#e02037] font-semibold hover:bg-gray-200 cursor-pointer"
            >
              Login
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}
