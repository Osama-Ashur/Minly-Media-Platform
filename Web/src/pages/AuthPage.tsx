import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { IoPerson } from "react-icons/io5";
import { AiOutlineMail } from "react-icons/ai";
import { IoMdLock } from "react-icons/io";

import Logo from "/minly_logo1.png";
import { useNavigate } from "react-router-dom";
import Spinner from "../components/ui/Spinner";

export default function AuthPage() {
  const [email, setEmail] = useState("osama2k2@gmail.com");
  const [password, setPassword] = useState("osama123");
  const [username, setUsername] = useState("");
  const [hasAccount, setHasAccount] = useState(true);
  const { login, register, user, loading } = useAuth();

  const navigate = useNavigate();

  if (loading) {
    return <Spinner />;
  }
  if (user) {
    navigate("/");
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (hasAccount) {
        await login(email, password);
        setEmail("");
        setPassword("");
        navigate("/");
      } else {
        await register(email, username, password);
        setEmail("");
        setPassword("");
        setUsername("");
        navigate("/");
      }
    } catch (error) {
      setEmail("");
      setPassword("");
      setUsername("");
      console.error("Authentication failed", error);
    }
  };

  if (hasAccount) {
    return (
      <div className="flex flex-col max-w-md mx-auto p-6 bg-white rounded-xl shadow-md mt-10">
        <div className="flex flex-col items-center mb-6">
          <img className="w-20" src={Logo} alt="Logo" />
          <h1 className="text-2xl text-center font-bold mb-4">Log in</h1>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-row items-center w-full p-2 border border-gray-100 rounded-md hover:border-gray-400  has-focus:border-gray-900 ">
            <AiOutlineMail />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Your email address"
              className="w-full p-2 border-none outline-none"
            />
          </div>
          <div className="flex flex-row items-center w-full p-2 border border-gray-100 rounded-md hover:border-gray-400  has-focus:border-gray-900 ">
            <IoMdLock />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Enter your password"
              className="w-full p-2 border-none outline-none"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-[#333333] text-white py-2 px-4 rounded-full cursor-pointer"
          >
            Log in
          </button>
        </form>
        <p className="mt-4">
          Don't have an account?{" "}
          <button
            onClick={() => setHasAccount(false)}
            className="text-[#e02037] cursor-pointer"
          >
            Register here
          </button>
        </p>
      </div>
    );
  }

  if (!hasAccount) {
    return (
      <div className="max-w-md mx-auto p-6 bg-white rounded-xl shadow-md mt-10">
        <div className="flex flex-col items-center mb-6">
          <img className="w-20" src={Logo} alt="Logo" />
          <h1 className="text-2xl font-bold mb-4">Welcome to Minly</h1>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-row items-center w-full p-2 border border-gray-100 rounded-md hover:border-gray-400  has-focus:border-gray-900 ">
            <IoPerson />
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              placeholder="Your Name"
              className="w-full p-2 border-none outline-none"
            />
          </div>
          <div className="flex flex-row items-center w-full p-2 border border-gray-100 rounded-md hover:border-gray-400  has-focus:border-gray-900 ">
            <AiOutlineMail />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Your email address"
              className="w-full p-2 border-none outline-none"
            />
          </div>
          <div className="flex flex-row items-center w-full p-2 border border-gray-100 rounded-md hover:border-gray-400  has-focus:border-gray-900 ">
            <IoMdLock />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Enter your password"
              className="w-full p-2 border-none outline-none"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-[#333333] text-white py-2 px-4 rounded-full cursor-pointer"
          >
            Sign up
          </button>
        </form>
        <p className="mt-4">
          Already have an account?{" "}
          <button
            onClick={() => setHasAccount(true)}
            className="text-[#e02037] cursor-pointer"
          >
            Login here
          </button>
        </p>
        <p className="text-center text-gray-500 py-2 text-xs">
          By signing up, you agree to our Terms of Service & Privacy Policy
        </p>
      </div>
    );
  }
}
