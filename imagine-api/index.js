const fetch = require("node-fetch");

let app_key = "";
let app_id = "";

exports.init = function (id, key) {
  app_id = id;
  app_key = key;
};

exports.createImage = async function (prompt) {
  if (!app_id || !app_key || !prompt) return;
  const headers = {
    app_id: app_id,
    app_key: app_key,
    "Content-Type": "application/json",
  };
  const data = {
    job: {
      job_type: 3,
      status: "JOB_STATUS_PENDING",
      priority: 1,
      metadata: `{"inference_input":{"${prompt}":"elon musk","inference_params":{"num_output_imgs":3,"output_img_height":512,"output_img_width":512,"output_object_prefix":"media/original","base_model":"Deliberate"}}}`,
    },
  };
  const response = await fetch("http://34.66.32.56:8894/v1/create_job", {
    method: "POST",
    headers,
    body: JSON.stringify(data),
  });
  const result = await response.json();
  return result;
};

exports.getJobById = async function (id) {
  if (!app_id || !app_key || !id) return;
  const headers = {
    app_id: app_id,
    app_key: app_key,
    "Content-Type": "application/json",
  };
  const data = {
    id: id,
  };
  const response = await fetch("http://34.66.32.56:8894/v1/get_job_by_id", {
    method: "POST",
    headers,
    body: JSON.stringify(data),
  });
  const result = await response.json();
  return result;
};

exports.getJobs = async function () {
  if (!app_id || !app_key) return;
  const headers = {
    app_id: app_id,
    app_key: app_key,
    "Content-Type": "application/json",
  };
  const data = {
    typeIn: [3],
  };
  const response = await fetch("http://34.66.32.56:8894/v1/get_jobs", {
    method: "POST",
    headers,
    body: JSON.stringify(data),
  });
  const result = await response.json();
  return result;
};
