export const getModel = async () => {
  const token = localStorage.getItem("token");
  let url = `${import.meta.env.VITE_API_URL}/model`;

  const response = await fetch(url, {
    headers: {
      authorization: `Bearer ${token}`,
    },
    method: "GET",
  });

  // get data
  const result = await response.json();
  return result;
};

export const getDetailModel = async (id) => {
  const token = localStorage.getItem("token");
  let url = `${import.meta.env.VITE_API_URL}/model/${id}`;

  const response = await fetch(url, {
    headers: {
      authorization: `Bearer ${token}`,
    },
    method: "GET",
  });

  // get data
  const result = await response.json();
  return result;
};

export const createModel = async (request) => {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("Authentication token is missing.");

  const formData = new FormData();
  // Mengubah 'name' menjadi 'model_name'
  formData.append("model_name", request.model_name);

  const response = await fetch(`${import.meta.env.VITE_API_URL}/model`, {
    headers: {
      authorization: `Bearer ${token}`,
    },
    method: "POST",
    body: formData,
  });

  const result = await response.json();
  return result;
};

export const deleteModelById = async (id) => {
  const token = localStorage.getItem("token");

  let url = `${import.meta.env.VITE_API_URL}/model/${id}`;

  const response = await fetch(url, {
    headers: {
      authorization: `Bearer ${token}`,
    },
    method: "DELETE",
  });

  // get data
  const result = await response.json();
  return result;
};

export const updateModel = async (id, request) => {
  const token = localStorage.getItem("token");
  const formData = new FormData();
  formData.append("model_name", request.model_name);

  const response = await fetch(`${import.meta.env.VITE_API_URL}/model/${id}`, {
    headers: {
      authorization: `Bearer ${token}`,
    },
    method: "PUT",
    body: formData,
  });

  const result = await response.json();
  return result;
};
