export const getCarSpecs = async () => {
    const token = localStorage.getItem("token");

    let url = `${import.meta.env.VITE_API_URL}/carspecs`;

    const response = await fetch(url, {
        method: "GET",
        headers: {
            authorization: `Bearer ${token}`
        }
    });
    const result = await response.json();
    if (!result?.success) {
        throw new Error(result?.message);
    }
    return result?.data;
}

export const getDetailCarSpecs = async (id) => {
    const token = localStorage.getItem("token");
    let url = `${import.meta.env.VITE_API_URL}/carspecs/${id}`;

    const response = await fetch(url, {
        method: "GET",
        headers: { 
            authorization: `Bearer ${token}`
        },
    });
    const result = await response.json();
    if (!result?.success) {
        throw new Error(result?.message);
    }
    return result?.data;
}

export const createCarSpecs = async (data) => {
    const token = localStorage.getItem("token");
    const formData = new FormData();
    formData.append("spec_name", data.spec_name);

    let url = `${import.meta.env.VITE_API_URL}/carspecs`;

    const response = await fetch(url, {
        method: "POST",
        body: formData,
        headers: {
            authorization: `Bearer ${token}`
        }
    });
    const result = await response.json();
    if (!result?.success) {
        throw new Error(result?.message);
    }
    return result?.data;
}

export const deleteCarSpecs = async (id) => {
    const token = localStorage.getItem("token");

    let url = `${import.meta.env.VITE_API_URL}/carspecs/${id}`;

    const response = await fetch(url, {
        method: "DELETE",
        headers: { 
            authorization: `Bearer ${token}`
        }
    });
    const result = await response.json();
    if (!result?.success) {
        throw new Error(result?.message);
    }
    return result?.data;
}

export const updateCarSpecs = async (id, data) => {
    const token = localStorage.getItem("token");
    const formData = new FormData();
    formData.append("spec_name", data.spec_name);

    let url = `${import.meta.env.VITE_API_URL}/carspecs/${id}`;
    const response = await fetch(url, {
        method: "PUT",
        body: formData,
        headers: { 
            authorization: `Bearer ${token}`
        }
    });
    const result = await response.json();
    if (!result?.success) {
        throw new Error(result?.message);
    }
    return result?.data;
}

