import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import ForgotPassword from "./pages/ForgotPassword";
import Signup from "./pages/Signup";
import ProtectedRoute from "./components/ProtectedRoute";
import AddJob from "./pages/AddJob";
import EditJob from "./pages/EditJob";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route
          path="dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/add-job"
          element={
            <ProtectedRoute>
              <AddJob />
            </ProtectedRoute>
          }
        />

        <Route
          path="/edit-job/:id"
          element={
            <ProtectedRoute>
              <EditJob />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;

// AIzaSyAEBB3j4x5KkYRa-TVD5V_wXsluRbx_VrQ
// DB: https://jobtrackr-5511f-default-rtdb.firebaseio.com/
