import { useRef, useEffect } from "react";
import { Link } from "react-router-dom";

function Signup() {
  // useRef is used to directly access the email input
  const emailRef = useRef(null);

  // Auto-focus email input when page loads
  useEffect(() => {
    emailRef.current.focus();
  }, []);

  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2">
      {/* LEFT SECTION – HERO */}
      <div
        className="relative hidden md:flex flex-col justify-between p-12 text-white
                   bg-cover bg-center"
        style={{
          backgroundImage:
            "url(https://images.unsplash.com/photo-1498050108023-c5249f4df085)",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-black/60 to-black/40"></div>

        <div className="relative z-10 text-2xl font-semibold">
          Job<span className="text-indigo-400">Trackr</span>
        </div>

        <div className="relative z-10 max-w-lg">
          <h1 className="text-5xl font-bold leading-tight">Create Account</h1>

          <p className="mt-4 text-lg text-gray-200">
            Start tracking your job applications the smart way.
          </p>
        </div>

        <div className="relative z-10 text-sm text-gray-300">
          Built for freshers & professionals
        </div>
      </div>

      {/* RIGHT SECTION – SIGNUP FORM */}
      <div className="flex items-center justify-center bg-gray-50">
        <div className="w-full max-w-md p-8 bg-white rounded-xl shadow-lg">
          <h2 className="text-2xl font-semibold text-gray-800 mb-1">Sign up</h2>

          <p className="text-sm text-gray-500 mb-6">
            Create your account to get started
          </p>

          <form className="space-y-4">
            <div>
              <label className="text-sm text-gray-600">Email Address</label>
              <input
                ref={emailRef}
                type="email"
                placeholder="you@example.com"
                name="email"
                className="mt-1 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />
            </div>

            <div>
              <label className="text-sm text-gray-600">Password</label>
              <input
                type="password"
                placeholder="••••••••"
                className="mt-1 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition"
            >
              Create account
            </button>
          </form>

          <p className="text-sm text-center text-gray-500 mt-6">
            Already have an account?{" "}
            <Link
              to="/"
              className="text-indigo-600 cursor-pointer hover:underline"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Signup;
