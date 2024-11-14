export const getManufacture = async () => {
  const token = localStorage.getItem("token");
  let url = `${import.meta.env.VITE_API_URL}/manufacture`;

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

export const getDetailManufacture = async (id) => {
  const token = localStorage.getItem("token");
  let url = `${import.meta.env.VITE_API_URL}/manufacture/${id}`;

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

export const createManufacture = async (request) => {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("Authentication token is missing.");

  const formData = new FormData();
  // Mengubah 'name' menjadi 'manufacture_name'
  formData.append("manufacture_name", request.manufacture_name);

  const response = await fetch(`${import.meta.env.VITE_API_URL}/manufacture`, {
    headers: {
      authorization: `Bearer ${token}`,
    },
    method: "POST",
    body: formData,
  });

  const result = await response.json();
  return result;
};

export const deleteManufactureById = async (id) => {
  const token = localStorage.getItem("token");

  let url = `${import.meta.env.VITE_API_URL}/manufacture/${id}`;

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

export const updateManufacture = async (id, request) => {
  const token = localStorage.getItem("token");
  const formData = new FormData();
  formData.append("manufacture_name", request.manufacture_name);

  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/manufacture/${id}`,
    {
      headers: {
        authorization: `Bearer ${token}`,
      },
      method: "PUT",
      body: formData,
    }
  );

  const result = await response.json();
  return result;
};
