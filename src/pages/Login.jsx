
function Login() {
  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2 font-[Poppins]">
      {/* LEFT SECTION - IMAGE & TEXT */}
      <div
        className="relative hidden md:flex flex-col justify-between p-12 text-white
             bg-cover bg-center"
        style={{
          backgroundImage:
            "url(https://images.unsplash.com/photo-1519681393784-d120267933ba)",
        }}
      >
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-black/60 to-black/40"></div>

        {/* Top brand */}
        <div className="relative z-10">
          <h2 className="text-2xl font-semibold tracking-wide">
            Job<span className="text-indigo-400">Trackr</span>
          </h2>
        </div>

        {/* Center content */}
        <div className="relative z-10 max-w-lg">
          <h1 className="text-5xl font-bold leading-tight">Welcome Back</h1>

          <p className="mt-4 text-lg text-gray-200">
            Track all your job applications in one place and never miss an opportunity again.
          </p>
        </div>

        {/* Bottom indicators */}
        <div className="relative z-10 flex items-center gap-3 text-sm text-gray-300">
          <span className="w-8 h-[2px] bg-indigo-400"></span>
          <span>Built for job seekers</span>
        </div>
      </div>
      {/* RIGHT SECTION - LOGIN FORM */}
      <div className="flex items-center justify-center bg-gray-50">
        <div className="w-full max-w-md p-8 bg-white rounded-xl shadow-lg">
          <h2 className="text-2xl font-semibold text-gray-800 mb-1">Sign in</h2>

          <p className="text-sm text-gray-500 mb-6">
            Enter your details to continue
          </p>

          <form className="space-y-4">
            {/* Email */}
            <div>
              <label className="text-sm text-gray-600">Email Address</label>
              <input
                type="email"
                placeholder="you@example.com"
                className="mt-1 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />
            </div>

            {/* Password */}
            <div>
              <label className="text-sm text-gray-600">Password</label>
              <input
                type="password"
                placeholder="••••••••"
                className="mt-1 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />
            </div>

            {/* Remember + Forgot */}
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2">
                <input type="checkbox" />
                Remember me
              </label>

              <span className="text-indigo-600 cursor-pointer hover:underline">
                Forgot password?
              </span>
            </div>

            {/* Login button */}
            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition"
            >
              Sign in now
            </button>
          </form>

          {/* Signup */}
          <p className="text-sm text-center text-gray-500 mt-6">
            Don’t have an account?{" "}
            <span className="text-indigo-600 cursor-pointer hover:underline">
              Sign up
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
