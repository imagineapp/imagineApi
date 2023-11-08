import {
  createImage,
  getJobById,
  getJobs,
  imageToVideo,
  init,
} from "@8glabs/imagine-api";
import { useState } from "react";

export default function ApiTest() {
  init("test", "test");

  const [prompt, setPromt] = useState("");
  const [createdJobId, setCreatedJobId] = useState("");
  const [jobId, setJobId] = useState("");
  const [jobResult, setJobResult] = useState();
  const [allJobsResult, setAllJobsResult] = useState();
  const [url, setUrl] = useState("");

  const handleSubmit = async () => {
    if (!prompt) return;
    try {
      const result = await createImage(prompt);
      setCreatedJobId(result.jobId);
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

  const handleImageToVideo = async () => {
    if (!url) return;
    try {
      const result = await imageToVideo(url);
      setJobResult(result.jobId);
    } catch {
      console.log("error");
    }
  };

  return (
    <>
      <div>
        <div>
          <div>Create Image</div>
          <input
            value={prompt}
            onChange={(e) => setPromt(e.target.value)}
            placeholder="prompt"
          />
          <button onClick={handleSubmit}>submit</button>
          {createdJobId && <div>id: {createdJobId}</div>}
        </div>
        <div>
          <div>Image To Video</div>
          <input
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="image url"
          />
          <button onClick={handleImageToVideo}>submit</button>
          {createdJobId && <div>id: {createdJobId}</div>}
        </div>
        <br />
        <div>
          <div>Query Job</div>
          <input
            value={jobId}
            onChange={(e) => setJobId(e.target.value)}
            placeholder="job id"
          />
          <button onClick={handleQuery}>query</button>
          {jobResult && (
            <div>
              <div>status: {jobResult.status}</div>
              {jobResult.status === "JOB_STATUS_DONE" && (
                <>
                  {jobResult.type === "INFERENCE" && (
                    <img src={jobResult.medias[0].url} alt="" />
                  )}
                  {jobResult.type === "MULTI_IMAGE_2_VIDEO_INFERENCE" && (
                    <video controls>
                      <source src={jobResult.medias[0].url} type="video/mp4" />
                    </video>
                  )}
                </>
              )}
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
