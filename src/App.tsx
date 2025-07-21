import LoginForm from "./components/LoginForm";

function App() {


  return (
        <div className="flex flex-col min-h-screen bg-gradient-to-br from-cyan-50 to-green-100">

        <header className="bg-green-700 text-white text-center py-4 text-xl font-semibold shadow">
        Library Management System
      </header>
      <LoginForm></LoginForm>
           <footer className="bg-green-50 text-gray-600 text-center py-3 text-sm">
        &copy; {new Date().getFullYear()} Library Inc.
      </footer> 
      </div>
  )
}

export default App;
