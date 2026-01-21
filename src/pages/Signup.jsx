import { useCallback, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../store/slices/authSlice";
import { signupUser } from "../api/authApi";

function Signup() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignup = useCallback(
    async (e) => {
      e.preventDefault();
      setError("");
      setLoading(true);

      try {
        const data = await signupUser(email, password);

        const userData = {
          email: data.email,
          token: data.idToken,
          userId: data.localId,
        };

        dispatch(loginSuccess(userData));

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
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded-xl shadow-lg">

        <h2 className="text-2xl font-semibold mb-2">Create Account</h2>

        {error && <p className="text-sm text-red-500 mb-4">{error}</p>}

        <form className="space-y-4" onSubmit={handleSignup}>
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

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 text-white py-2 rounded-lg"
          >
            {loading ? "Creating..." : "Sign up"}
          </button>
        </form>

        <p className="text-sm text-center mt-6">
          Already have an account?{" "}
          <Link to="/" className="text-indigo-600">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;
