import { useCallback, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../store/slices/authSlice";
import { loginUser } from "../api/authApi";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = useCallback(
    async (e) => {
      e.preventDefault();
      setError("");
      setLoading(true);

      try {
        const data = await loginUser(email, password);

        const userData = {
          email: data.email,
          token: data.idToken,
          userId: data.localId,
        };

        // Redux
        dispatch(loginSuccess(userData));

        // LocalStorage
        localStorage.setItem(
          "auth",
          JSON.stringify({
            user: userData,
            isAuthenticated: true,
          })
        );

        navigate("/dashboard");
      } catch (err) {
        setError(err.message.replaceAll("_", " "));
      } finally {
        setLoading(false);
      }
    },
    [email, password, dispatch, navigate]
  );

  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2">
      {/* LEFT HERO */}
      <div
        className="relative hidden md:flex flex-col justify-between p-12 text-white
                   bg-cover bg-center"
        style={{
          backgroundImage:
            "url(https://images.unsplash.com/photo-1519681393784-d120267933ba)",
        }}
      >
        <div className="absolute inset-0 bg-linear-to-br from-black/80 via-black/60 to-black/40"></div>

        <div className="relative z-10 text-2xl font-semibold">
          Job<span className="text-indigo-400">Trackr</span>
        </div>

        <div className="relative z-10 max-w-lg">
          <h1 className="text-5xl font-bold leading-tight">Welcome Back</h1>
          <p className="mt-4 text-lg text-gray-200">
            Track all your job applications in one place.
          </p>
        </div>
      </div>

      {/* RIGHT FORM */}
      <div className="flex items-center justify-center bg-gray-50">
        <div className="w-full max-w-md p-8 bg-white rounded-xl shadow-lg">
          <h2 className="text-2xl font-semibold text-gray-800 mb-1">Sign in</h2>

          <p className="text-sm text-gray-500 mb-4">
            Enter your credentials to continue
          </p>

          {error && <p className="text-sm text-red-500 mb-4">{error}</p>}

          <form className="space-y-4" onSubmit={handleLogin}>
            <input
              type="email"
              placeholder="Email"
              className="w-full px-4 py-2 border rounded-lg"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <input
              type="password"
              placeholder="Password"
              className="w-full px-4 py-2 border rounded-lg"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <div className="flex justify-between text-sm">
              <Link to="/forgot-password" className="text-indigo-600">
                Forgot password?
              </Link>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-indigo-600 text-white py-2 rounded-lg
                         hover:bg-indigo-700 transition disabled:opacity-60"
            >
              {loading ? "Signing in..." : "Sign in"}
            </button>
          </form>

          <p className="text-sm text-center text-gray-500 mt-6">
            Don’t have an account?{" "}
            <Link to="/signup" className="text-indigo-600 hover:underline">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
