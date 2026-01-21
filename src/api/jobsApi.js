const DB_URL = "https://jobtrackr-5511f-default-rtdb.firebaseio.com";

/* CREATE */
export async function addJob(userId, jobData, token) {
  const response = await fetch(
    `${DB_URL}/jobs/${userId}.json?auth=${token}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(jobData),
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || "Failed to add job");
  }

  return data; // contains generated jobId in data.name
}

/* READ */
export async function getJobs(userId, token) {
  const response = await fetch(
    `${DB_URL}/jobs/${userId}.json?auth=${token}`
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || "Failed to fetch jobs");
  }

  return data;
}

/* UPDATE */
export async function updateJob(userId, jobId, jobData, token) {
  const response = await fetch(
    `${DB_URL}/jobs/${userId}/${jobId}.json?auth=${token}`,
    {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(jobData),
    }
  );

  if (!response.ok) {
    throw new Error("Failed to update job");
  }
}

/* DELETE */
export async function deleteJob(userId, jobId, token) {
  const response = await fetch(
    `${DB_URL}/jobs/${userId}/${jobId}.json?auth=${token}`,
    {
      method: "DELETE",
    }
  );

  if (!response.ok) {
    throw new Error("Failed to delete job");
  }
}
