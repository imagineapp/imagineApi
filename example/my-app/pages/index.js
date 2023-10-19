import { createImage, getJobById, getJobs, init } from "@8glabs/imagine-api";
import { useState } from "react";

export default function ApiTest() {
  init("app_id", "app_key");

  const [prompt, setPromt] = useState("");
  const [promptJobId, setPromptJobId] = useState("");
  const [jobId, setJobId] = useState("");
  const [jobResult, setJobResult] = useState();
  const [allJobsResult, setAllJobsResult] = useState();

  const handleSubmit = async () => {
    if (!prompt) return;
    try {
      const result = await createImage(prompt);
      setPromptJobId(result.jobId);
    } catch {
      console.log("error");
    }
  };

  const handleQuery = async () => {
    if (!jobId) return;
    try {
      const result = await getJobById(jobId);
      setJobResult(result.job);
    } catch {
      console.log("error");
    }
  };

  const handleQueryAll = async () => {
    try {
      const result = await getJobs();
      setAllJobsResult(result.jobs);
    } catch {
      console.log("error");
    }
  };

  return (
    <>
      <div>
        <div>
          <div>Create Image</div>
          <input value={prompt} onChange={(e) => setPromt(e.target.value)} />
          <button onClick={handleSubmit}>submit</button>
          {promptJobId && <div>id: {promptJobId}</div>}
        </div>
        <br />
        <div>
          <div>Query Job</div>
          <input value={jobId} onChange={(e) => setJobId(e.target.value)} />
          <button onClick={handleQuery}>query</button>
          {jobResult && (
            <div>
              <div>status: {jobResult.status}</div>
            </div>
          )}
        </div>
        <br />
        <div>
          <div>Query All Jobs</div>
          <button onClick={handleQueryAll}>query all</button>
          {allJobsResult && (
            <div>
              {(allJobsResult || []).map((item) => (
                <div key={item}>{item.id}</div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
