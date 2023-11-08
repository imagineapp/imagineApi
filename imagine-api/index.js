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
      type: 3,
      status: "JOB_STATUS_PENDING",
      priority: 1,
      metadata: `{"inference_input":{"prompt":{"partial_prompt":"${prompt}","style_id":"","character_infos":[]},"inference_params":{"num_output_imgs":3,"output_img_height":512,"output_img_width":512,"output_object_prefix":"media/original","base_model":"8glabs/Deliberate"}}}`,
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

exports.imageToVideo = async function (url) {
  if (!app_id || !app_key || !url) return;
  const headers = {
    app_id: app_id,
    app_key: app_key,
    "Content-Type": "application/json",
  };
  const data = {
    job: {
      type: 16,
      status: "JOB_STATUS_PENDING",
      priority: 1,
      metadata: `{"input":{"images":[{"end_time":4,"image_url":"${url}"}]},"inference_params":{"duration":4,"aspect_ratio":1,"audio_url":"","output_object_prefix":"api_test"}}`,
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

exports.videoToVideo = async function (prompt, videoUrl, imgUrl, duration) {
  if (!app_id || !app_key || !prompt || !videoUrl || !imgUrl || !duration)
    return;
  const headers = {
    app_id: app_id,
    app_key: app_key,
    "Content-Type": "application/json",
  };
  const data = {
    job: {
      type: 9,
      status: "JOB_STATUS_PENDING",
      priority: 1,
      metadata: `{"structured_prompt":{"style_id":"","partial_prompt":"${prompt}","character_infos":[]},"inference_params":{"type":2,"duration":${duration},"watermark_add":false,"user_input_media_url":"${videoUrl}","system_generated_input_media_id":"4d32b14a-e2b8-47c9-9e1b-698f13fe165c","system_generated_input_media_url":"${imgUrl}","transform":6,"rendering_model":null,"base_model":"8glabs/Deliberate"}}`,
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
