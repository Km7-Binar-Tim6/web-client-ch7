export const getTransmission = async () => {
	const token = localStorage.getItem('token');
	let url = `${import.meta.env.VITE_API_URL}/transmission`;

	const response = await fetch(url, {
		headers: {
			authorization: `Bearer ${token}`,
		},
		method: 'GET',
	});

	// get data
	const result = await response.json();
	return result;
};

export const getDetailTransmission = async id => {
	const token = localStorage.getItem('token');
	let url = `${import.meta.env.VITE_API_URL}/transmission/${id}`;

	const response = await fetch(url, {
		headers: {
			authorization: `Bearer ${token}`,
		},
		method: 'GET',
	});

	// get data
	const result = await response.json();
	return result;
};

export const createTransmission = async request => {
	const token = localStorage.getItem('token');
	if (!token) throw new Error('Authentication token is missing.');

	const formData = new FormData();
	// Mengubah 'name' menjadi 'transmission_option'
	formData.append('transmission_option', request.transmission_option);

	const response = await fetch(`${import.meta.env.VITE_API_URL}/transmission`, {
		headers: {
				authorization: `Bearer ${token}`,
		},
		method: 'POST',
		body: formData,
	});

	const result = await response.json();
	return result;
};

export const deleteTransmissionById = async id => {
	const token = localStorage.getItem('token');

	let url = `${import.meta.env.VITE_API_URL}/transmission/${id}`;

	const response = await fetch(url, {
		headers: {
			authorization: `Bearer ${token}`,
		},
		method: 'DELETE',
	});

	// get data
	const result = await response.json();
	return result;
};

export const updateTransmission = async (id, request) => {
	const token = localStorage.getItem('token');
	const formData = new FormData();
	formData.append('transmission_option', request.transmission_option);

	const response = await fetch(`${import.meta.env.VITE_API_URL}/transmission/${id}`, {
		headers: {
				authorization: `Bearer ${token}`,
		},
		method: 'PUT',
		body: formData,
	});

	const result = await response.json();
	return result;
};
