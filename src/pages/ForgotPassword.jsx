import { useRef, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";

function ForgotPassword() {
  const emailRef = useRef(null);

  useEffect(() => {
    emailRef.current.focus();
  }, []);

  const handleReset = useCallback((e) => {
    e.preventDefault();
    alert("Password reset link will be sent");
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded-xl shadow-lg">
        
        <h2 className="text-2xl font-semibold text-gray-800 mb-1">
          Forgot Password
        </h2>

        <p className="text-sm text-gray-500 mb-6">
          Enter your email to receive a reset link
        </p>

        <form className="space-y-4" onSubmit={handleReset}>
          <input
            ref={emailRef}
            type="email"
            placeholder="you@example.com"
            className="w-full px-4 py-2 border rounded-lg
                       focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 rounded-lg
                       hover:bg-indigo-700 transition"
          >
            Send reset link
          </button>
        </form>

        <p className="text-sm text-center text-gray-500 mt-6">
          Remember your password?{" "}
          <Link to="/" className="text-indigo-600 hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}

export default ForgotPassword;
