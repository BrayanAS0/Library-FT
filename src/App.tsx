import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";

import SignupPage from "./pages/SignupPage";
import IndexPage from "./pages/IndexPage";
import BookDetail from "./pages/BookDetail";
import Layout from "./components/Layout";
import Profile from "./pages/Profile";

function App() {
  return (
    <BrowserRouter>
      <div className="flex bg-amber-50 flex-col min-h-screen">

        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="*" element={<Navigate to="/login" />} />
          <Route element={<Layout />}>

            <Route path="/index" element={<IndexPage></IndexPage>} />
            <Route path="/index/BookDetail" element={<BookDetail />} />
            <Route path="/Profile" element={<Profile/>} />
          </Route>
        </Routes>
      </div>

    </BrowserRouter>
  );
}

export default App;
