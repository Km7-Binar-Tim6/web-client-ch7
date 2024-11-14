export const getCars = async (
    plate,
    rentPerDay,
    capacity,
    description,
    availableAt,
    available,
    year,
    image
) => {
    const token = localStorage.getItem("token");

    let params = {};
    if (plate) params.plate = plate;
    if (rentPerDay) params.rentperday = rentPerDay;
    if (capacity) params.capacity = capacity;
    if (description) params.description = description;
    if (availableAt) params.availableat = availableAt;
    if (available) params.available = available;
    if (year) params.year = year;
    if (image) params.image = image;

    let url = `${import.meta.env.VITE_API_URL}/cars?` + new URLSearchParams(params);

    const response = await fetch(url, {
        method: "GET",
        headers: {
            authorization: `Bearer ${token}`
        }
    });
    const result = await response.json();
    return result;
}

export const getDetailCar = async (id) => {
    const token = localStorage.getItem("token");

    let url = `${import.meta.env.VITE_API_URL}/cars/${id}`;

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

export const deleteCar = async (id) => {
    const token = localStorage.getItem("token");
    let url = `${import.meta.env.VITE_API_URL}/cars/${id}`;

    const response = await fetch(url, {
        method: "DELETE",
        headers: {
            authorization: `Bearer ${token}`,
        },
    });

    const result = await response.json();
    return result;
}

export const createCar = async (request) => {
    const token = localStorage.getItem("token");
    
    const formattedAvailableAt = new Date(request.availableAt);
    const formattedDate = formattedAvailableAt.toISOString();
    
    const formData = new FormData();
    formData.append("plate", request.plate);
    formData.append("rentperday", request.rentPerDay.toString());
    formData.append("capacity", request.capacity.toString());
    formData.append("description", request.description);
    formData.append("availableat", new Date(request.availableAt).toISOString());
    formData.append("available", request.available.toString());
    formData.append("year", request.year.toString());
    formData.append("manufacture_id", request.manufactureId.toString());
    formData.append("transmission_id", request.transmissionId.toString());
    formData.append("type_id", request.typeCarId.toString());
    formData.append("model_id", request.modelId.toString());

    request.optionIds.forEach((optionId) => {
        formData.append("option_id", optionId);
    });
    request.specIds.forEach((specId) => {
        formData.append("spec_id", specId);
    });
    
    if (request.image) {
        formData.append('image', request.image);
    }

    console.log(formData);
    console.log(request);

    let url = `${import.meta.env.VITE_API_URL}/cars`;

    const response = await fetch(url, {
        method: "POST",
        body: formData,
        headers: {
            authorization: `Bearer ${token}`,
        },
    });

    const result = await response.json();
    return result;
}

export const updateCar = async (id, request) => {
    const token = localStorage.getItem("token");
    
    const formattedAvailableAt = new Date(request.availableAt);
    const formattedDate = formattedAvailableAt.toISOString();
    
    const formData = new FormData();
    formData.append("plate", request.plate);
    formData.append("rentperday", request.rentPerDay.toString());
    formData.append("capacity", request.capacity.toString());
    formData.append("description", request.description);
    formData.append("availableat", new Date(request.availableAt).toISOString());
    formData.append("available", request.available.toString());
    formData.append("year", request.year.toString());
    formData.append("manufacture_id", request.manufactureId.toString());
    formData.append("transmission_id", request.transmissionId.toString());
    formData.append("type_id", request.typeCarId.toString());
    formData.append("model_id", request.modelId.toString());

    request.optionIds.forEach((optionId) => {
        formData.append("option_id", optionId);
    });
    request.specIds.forEach((specId) => {
        formData.append("spec_id", specId);
    });
    
    if (request?.image) {
        formData.append('image', request?.image);
    }

    console.log(formData);
    console.log(request);

    let url = `${import.meta.env.VITE_API_URL}/cars/${id}`;

    const response = await fetch(url, {
        method: "PUT",
        body: formData,
        headers: {
            authorization: `Bearer ${token}`,
        },
    });

    const result = await response.json();
    return result;
}

