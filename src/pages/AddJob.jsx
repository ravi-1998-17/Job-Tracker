import { useState, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addJob } from "../api/jobsApi";
import { addJobToState } from "../store/slices/jobsSlice";

function AddJob() {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [company, setCompany] = useState("");
  const [role, setRole] = useState("");
  const [status, setStatus] = useState("Applied");
  const [notes, setNotes] = useState("");

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();

      const jobData = {
        company,
        role,
        status,
        notes,
        appliedDate: new Date().toISOString(),
      };

      try {
        const res = await addJob(user.userId, jobData, user.token);

        dispatch(
          addJobToState({
            id: res.name,
            ...jobData,
          })
        );

        navigate("/dashboard");
      } catch (err) {
        alert(err.message);
      }
    },
    [company, role, status, notes, user, dispatch, navigate]
  );

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-lg">
        <h2 className="text-2xl font-semibold mb-4">Add Job</h2>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Company Name"
            className="w-full px-4 py-2 border rounded-lg"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            required
          />

          <input
            type="text"
            placeholder="Job Role"
            className="w-full px-4 py-2 border rounded-lg"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            required
          />

          <select
            className="w-full px-4 py-2 border rounded-lg"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option>Applied</option>
            <option>Interview</option>
            <option>Offer</option>
            <option>Rejected</option>
          </select>

          <textarea
            placeholder="Notes (optional)"
            className="w-full px-4 py-2 border rounded-lg"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />

          <button className="w-full bg-indigo-600 text-white py-2 rounded-lg">
            Save Job
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddJob;
