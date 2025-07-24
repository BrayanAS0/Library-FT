import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";

 import SignupPage from "./pages/SignupPage";
import IndexPage from "./pages/IndexPage";

function App() {
  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen bg-gradient-to-br from-cyan-150 to-green-900">
        <header className="bg-green-700 text-white text-center py-4 text-xl font-semibold shadow">
          Library Management System
        </header>
        <main className="flex-1 flex items-center justify-center">
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/index" element ={<IndexPage></IndexPage>}></Route>
            {/* Redirige ruta por defecto a login */}
            <Route path="*" element={<Navigate to="/login" />} />
          </Routes>
        </main>
        <footer className="bg-green-50 text-gray-600 text-center py-3 text-sm">
          &copy; {new Date().getFullYear()} Library Inc.
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
