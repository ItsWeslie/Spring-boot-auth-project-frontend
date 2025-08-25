import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from './pages/LoginPage'
import './App.css'
import Signup from './pages/Signup'
import ProtectedRoute from "./components/ProtectedRoutes";
import Logout from "./components/Logout";
import OAuth2Redirect from "./pages/OAuth2Redirect";

function App() {

 function AdminLanding() {
  return (
    <div className="text-center mt-10">
      <h1 className="text-2xl font-bold">Welcome Admin!</h1>
      <Logout />
    </div>
  );
}

function UserLanding() {
  return (
    <div className="text-center mt-10">
      <h1 className="text-2xl font-bold">Welcome User!</h1>
      <Logout />
    </div>
  );
}
  
  return (
    <>
    <Router>
      <Routes>
        <Route path="/" element={<Login/>} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/oauth-login" element={<OAuth2Redirect />} />
        <Route
          path="/admin"
          element={
            <ProtectedRoute allowedRoles={["ADMIN"]}>
              <AdminLanding />
            </ProtectedRoute>
          }
        />

        <Route
          path="/user"
          element={
            <ProtectedRoute allowedRoles={["USER"]}>
              <UserLanding />
            </ProtectedRoute>
          }
        />

      </Routes>
    </Router>
    </>
  )
}

export default App
