import { useState, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { updateJob } from "../api/jobsApi";
import { updateJobInState } from "../store/slices/jobsSlice";

function EditJob() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);
  const job = useSelector((state) =>
    state.jobs.list.find((j) => j.id === id)
  );

  const [company, setCompany] = useState(job.company);
  const [role, setRole] = useState(job.role);
  const [status, setStatus] = useState(job.status);
  const [notes, setNotes] = useState(job.notes || "");

  const handleUpdate = useCallback(
    async (e) => {
      e.preventDefault();

      const updatedJob = {
        company,
        role,
        status,
        notes,
        appliedDate: job.appliedDate,
      };

      await updateJob(user.userId, id, updatedJob, user.token);
      dispatch(updateJobInState({ id, ...updatedJob }));
      navigate("/dashboard");
    },
    [company, role, status, notes, dispatch, navigate, user, id, job]
  );

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-lg">
        <h2 className="text-2xl font-semibold mb-4">Edit Job</h2>

        <form className="space-y-4" onSubmit={handleUpdate}>
          <input
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg"
          />

          <input
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg"
          />

          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg"
          >
            <option>Applied</option>
            <option>Interview</option>
            <option>Offer</option>
            <option>Rejected</option>
          </select>

          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg"
          />

          <button className="w-full bg-indigo-600 text-white py-2 rounded-lg">
            Update Job
          </button>
        </form>
      </div>
    </div>
  );
}

export default EditJob;
