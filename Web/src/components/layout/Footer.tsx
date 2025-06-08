import { FaFacebook, FaGift, FaYoutube } from "react-icons/fa";
import Egypt from "/Egypt.png";
import { FiInstagram } from "react-icons/fi";

export default function Footer() {
  return (
    <footer className="bg-white text-gray-800 py-2 ">
      <div className="container flex flex-col items-center lg:flex-row justify-between px-10 ">
        <div className="flex flex-col lg:flex-row items-center text-xs text-gray-400 ">
          <div>
            <span>&copy; Copyright 2025 Minly</span>
          </div>
          <div className="flex flex-row flex-wrap justify-center   px-5">
            <span className="px-2">About </span>|
            <span className="px-2">Careers</span>|
            <span className="px-2"> Terms</span>|
            <span className="px-2">Privacy</span>|
            <span className="px-2 flex flex-row  gap-1 ">
              <FaGift className="my-0.5" />
              Refer & Earn
            </span>
            |<span className="px-2">Help</span>
          </div>
        </div>
        <div className="flex flex-row items-center gap-10">
          <div className="flex flex-row  text-purple-900 ">
            <span className="text-2xl cursor-pointer hover:bg-gray-100 hover:rounded-full p-2">
              <a href="https://www.facebook.com/minlyapp" target="_blank">
                <FaFacebook />
              </a>
            </span>
            <span className="text-2xl cursor-pointer hover:bg-gray-100 hover:rounded-full p-2">
              <a
                href="https://www.youtube.com/@Minly/videos"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaYoutube />
              </a>
            </span>
            <span className="text-2xl cursor-pointer hover:bg-gray-100 hover:rounded-full p-2">
              <a href="https://www.instagram.com/minly.app/" target="_blank">
                <FiInstagram />
              </a>
            </span>
          </div>
          <div className="flex flex-row  border-2 gap-2 text-xs text-gray-400 rounded-2xl px-3 py-1 font-bold cursor-pointer">
            <span className="text-gray-700">عربي</span>
            <img className="w-5 h-3.5" src={Egypt} alt="Egypt" />
          </div>
        </div>
      </div>
    </footer>
  );
}
