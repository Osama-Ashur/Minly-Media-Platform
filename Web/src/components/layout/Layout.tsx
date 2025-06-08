import { Outlet } from "react-router-dom";
import Nav from "./Nav";
import Footer from "./Footer";

export default function Layout() {
  return (
    <div className="min-h-screen  flex flex-col space-y-4">
      <Nav />
      <main className="flex-gro">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
