import { useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { sendPasswordReset } from "../api/authApi";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleReset = useCallback(
    async (e) => {
      e.preventDefault();
      setError("");
      setSuccess("");
      setLoading(true);

      try {
        await sendPasswordReset(email);
        setSuccess("Password reset link sent to your email.");
      } catch (err) {
        setError(err.message.replaceAll("_", " "));
      } finally {
        setLoading(false);
      }
    },
    [email]
  );

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded-xl shadow-lg">

        <h2 className="text-2xl font-semibold mb-2">
          Forgot Password
        </h2>

        <p className="text-sm text-gray-500 mb-4">
          Enter your email and we’ll send you a reset link.
        </p>

        {error && (
          <p className="text-sm text-red-500 mb-3">
            {error}
          </p>
        )}

        {success && (
          <p className="text-sm text-green-600 mb-3">
            {success}
          </p>
        )}

        <form className="space-y-4" onSubmit={handleReset}>
          <input
            type="email"
            placeholder="you@example.com"
            className="w-full px-4 py-2 border rounded-lg"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 text-white py-2 rounded-lg
                       disabled:opacity-60"
          >
            {loading ? "Sending..." : "Send Reset Link"}
          </button>
        </form>

        <p className="text-sm text-center mt-6">
          Remembered your password?{" "}
          <Link to="/" className="text-indigo-600">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}

export default ForgotPassword;
