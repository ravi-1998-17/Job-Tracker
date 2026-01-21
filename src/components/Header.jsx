import { useDispatch, useSelector } from "react-redux";
import { logout } from "../store/slices/authSlice";
import { clearJobs } from "../store/slices/jobsSlice";
import { useNavigate } from "react-router-dom";

function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    dispatch(clearJobs());
    navigate("/");
  };

  return (
    <header className="bg-white shadow-sm px-4 py-3">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div
          className="text-xl font-semibold text-indigo-600 cursor-pointer"
          onClick={() => navigate("/dashboard")}
        >
          Job<span className="text-gray-800">Trackr</span>
        </div>

        <div className="flex items-center gap-3">
          <div
            className="w-9 h-9 rounded-full bg-indigo-600 text-white
                          flex items-center justify-center font-semibold"
          >
            {user?.email?.charAt(0).toUpperCase()}
          </div>

          <span className="text-sm text-gray-700 hidden sm:block">
            {user?.email}
          </span>

          <button
            onClick={handleLogout}
            className="text-sm text-red-600 hover:underline"
          >
            Logout
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;
