import { useEffect, useCallback, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import {
  setJobs,
  deleteJobFromState,
  setFilter,
} from "../store/slices/jobsSlice";
import { getJobs, deleteJob } from "../api/jobsApi";

function Dashboard() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);
  const { list: jobs, filter } = useSelector((state) => state.jobs);

  const [loading, setLoading] = useState(true);

  const fetchJobs = useCallback(async () => {
    try {
      setLoading(true);

      const data = await getJobs(user.userId, user.token);

      if (!data) {
        dispatch(setJobs([]));
        return;
      }

      const jobsArray = Object.keys(data).map((key) => ({
        id: key,
        ...data[key],
      }));

      dispatch(setJobs(jobsArray));
    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  }, [dispatch, user]);

  useEffect(() => {
    fetchJobs();
  }, [fetchJobs]);

  const filteredJobs = useMemo(() => {
    if (filter === "All") return jobs;
    return jobs.filter((job) => job.status === filter);
  }, [jobs, filter]);

  const handleDelete = async (jobId) => {
    if (!window.confirm("Delete this job?")) return;

    try {
      await deleteJob(user.userId, jobId, user.token);
      dispatch(deleteJobFromState(jobId));
    } catch (err) {
      alert(err.message);
    }
  };

  const statusColor = {
    Applied: "bg-blue-100 text-blue-600",
    Interview: "bg-yellow-100 text-yellow-700",
    Offer: "bg-green-100 text-green-700",
    Rejected: "bg-red-100 text-red-600",
  };

  return (
    <>
      <Header />

      <div className="min-h-screen bg-gray-100 p-6">
        {/* TOP ACTIONS */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold">Job Applications</h1>

          <button
            onClick={() => navigate("/add-job")}
            className="bg-indigo-600 text-white px-4 py-2 rounded-lg"
          >
            + Add Job
          </button>
        </div>

        {/* FILTERS */}
        <div className="flex gap-2 mb-6 flex-wrap">
          {["All", "Applied", "Interview", "Offer", "Rejected"].map(
            (status) => (
              <button
                key={status}
                onClick={() => dispatch(setFilter(status))}
                className={`px-4 py-1 rounded-full text-sm border
                  ${
                    filter === status
                      ? "bg-indigo-600 text-white"
                      : "bg-white text-gray-700"
                  }`}
              >
                {status}
              </button>
            )
          )}
        </div>

        {/* LOADING */}
        {loading && <p className="text-gray-500">Loading jobs...</p>}

        {/* EMPTY STATE */}
        {!loading && filteredJobs.length === 0 && (
          <div className="text-center text-gray-500 mt-16">
            <p className="text-lg font-medium">No job applications yet</p>
            <p className="text-sm">Click “Add Job” to start tracking</p>
          </div>
        )}

        {/* JOB LIST */}
        <div className="grid gap-4">
          {filteredJobs.map((job) => (
            <div key={job.id} className="bg-white p-4 rounded-xl shadow-sm">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-lg font-semibold">{job.company}</h2>
                  <p className="text-sm text-gray-600">{job.role}</p>
                  <span
                    className={`inline-block mt-2 px-3 py-1 rounded-full text-sm
                      ${statusColor[job.status]}`}
                  >
                    {job.status}
                  </span>
                </div>

                <div className="flex gap-3 text-sm">
                  <button
                    onClick={() => navigate(`/edit-job/${job.id}`)}
                    className="text-blue-600 hover:underline"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => handleDelete(job.id)}
                    className="text-red-600 hover:underline"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Dashboard;
