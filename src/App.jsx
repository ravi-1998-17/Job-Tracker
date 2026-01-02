function App() {
  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-blue-100">
        <div className="bg-white w-full max-w-md p-8 rounded-2xl shadow-xl">
          <h1 className="text-3xl font-semibold text-center text-indigo-600">
            JobTrackr
          </h1>

          <p className="text-center text-gray-500 mt-2">
            Track your job applications smartly
          </p>

          <button className="mt-6 w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition duration-200">
            Get Started
          </button>
        </div>
      </div>
    </>
  );
}

export default App;
