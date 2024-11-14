export const getType = async () => {
  const token = localStorage.getItem("token");
  let url = `${import.meta.env.VITE_API_URL}/type`;

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

export const getDetailType = async (id) => {
  const token = localStorage.getItem("token");
  let url = `${import.meta.env.VITE_API_URL}/type/${id}`;

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

export const createType = async (request) => {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("Authentication token is missing.");

  const formData = new FormData();
  // Mengubah 'name' menjadi 'type_option'
  formData.append("type_option", request.type_option);

  const response = await fetch(`${import.meta.env.VITE_API_URL}/type`, {
    headers: {
      authorization: `Bearer ${token}`,
    },
    method: "POST",
    body: formData,
  });

  const result = await response.json();
  return result;
};

export const deleteTypeById = async (id) => {
  const token = localStorage.getItem("token");

  let url = `${import.meta.env.VITE_API_URL}/type/${id}`;

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

export const updateType = async (id, request) => {
  const token = localStorage.getItem("token");
  const formData = new FormData();
  formData.append("type_option", request.type_option);

  const response = await fetch(`${import.meta.env.VITE_API_URL}/type/${id}`, {
    headers: {
      authorization: `Bearer ${token}`,
    },
    method: "PUT",
    body: formData,
  });

  const result = await response.json();
  return result;
};
