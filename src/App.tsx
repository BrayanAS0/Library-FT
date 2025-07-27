import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";

 import SignupPage from "./pages/SignupPage";
import IndexPage from "./pages/IndexPage";
import BookDetail from "./pages/Book";

function App() {
  return (
    <BrowserRouter>
      <div className="flex bg-amber-50 flex-col min-h-screen bg-gradient-to-br ">
        <header className="bg-amber-700 text-white text-center py-4 text-xl font-semibold shadow">
          Library Management System
        </header>
        <main className="flex-1 flex items-center justify-center p-1">
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/index" element ={<IndexPage></IndexPage>}></Route>
            <Route path="/index/BookDetail"element={<BookDetail/>}/>
            {/* Redirige ruta por defecto a login */}
            <Route path="*" element={<Navigate to="/login" />} />
          </Routes>
        </main>
        <footer className="bg-neutral-50 text-gray-600 text-center py-3 text-sm">
          &copy; {new Date().getFullYear()} Library Inc.
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
