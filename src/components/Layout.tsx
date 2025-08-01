// Layout.jsx
import { Link, Outlet } from "react-router-dom";
import LateralBar from "./LateralBar";

export default function Layout() {
  return (
    <div className="flex bg-amber-50 flex-col min-h-screen bg-gradient-to-br ">


<header className="bg-amber-700 text-white py-4 text-xl font-semibold shadow flex items-center ">
  <div className=" flex flex-1 justify-center gap-2 px-3">
    <Link to="/index" className=" object-center ">
      Library Management System
    </Link>
  </div>
  <div className=" mx-3">
    <LateralBar />
  </div>
</header>




      <main className="flex-1 flex items-center justify-center p-1">
        <Outlet />
      </main>
      <footer className="bg-neutral-50 text-gray-600 text-center py-3 text-sm">
        &copy; {new Date().getFullYear()} Library Inc.
      </footer>

    </div>
  );
}
