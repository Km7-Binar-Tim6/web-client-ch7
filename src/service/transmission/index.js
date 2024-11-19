export const getTransmission = async () => {
	const token = localStorage.getItem('token');
	if (!token) throw new Error('Authentication token is missing.');

	let url = `${import.meta.env.VITE_API_URL}/transmission`;
	const response = await fetch(url, {
		method: 'GET',
		headers: {
			authorization: `Bearer ${token}`,
		},
	});

	const result = await response.json();
	if (!result?.success) {
		throw new Error(result?.message);
	}
	return result?.data;
};

export const getDetailTransmission = async id => {
	const token = localStorage.getItem('token');
	if (!token) throw new Error('Authentication token is missing.');

	let url = `${import.meta.env.VITE_API_URL}/transmission/${id}`;
	const response = await fetch(url, {
		method: 'GET',
		headers: {
			authorization: `Bearer ${token}`,
		},
	});

	const result = await response.json();
	if (!result?.success) {
		throw new Error(result?.message);
	}
	return result?.data;
};

export const createTransmission = async request => {
	const token = localStorage.getItem('token');
	if (!token) throw new Error('Authentication token is missing.');
	const formData = new FormData();
	formData.append('transmission_option', request.transmission_option);

	let url = `${import.meta.env.VITE_API_URL}/transmission`;
	const response = await fetch(url, {
		method: 'POST',
		body: formData,
		headers: {
			authorization: `Bearer ${token}`,
		},
	});

	const result = await response.json();
	if (!result?.success) {
		throw new Error(result?.message);
	}
	return result?.data;
};

export const deleteTransmissionById = async id => {
	const token = localStorage.getItem('token');
	if (!token) throw new Error('Authentication token is missing.');

	let url = `${import.meta.env.VITE_API_URL}/transmission/${id}`;
	const response = await fetch(url, {
		method: 'DELETE',
		headers: {
			authorization: `Bearer ${token}`,
		},
	});

	const result = await response.json();
	if (!result?.success) {
		throw new Error(result?.message);
	}
	return result?.data;
};

export const updateTransmission = async (id, request) => {
	const token = localStorage.getItem('token');
	if (!token) throw new Error('Authentication token is missing.');
	const formData = new FormData();
	formData.append('transmission_option', request.transmission_option);

	let url = `${import.meta.env.VITE_API_URL}/transmission/${id}`;
	const response = await fetch(url, {
		method: 'PUT',
		body: formData,
		headers: {
			authorization: `Bearer ${token}`,
		},
	});

	const result = await response.json();
	if (!result?.success) {
		throw new Error(result?.message);
	}
	return result?.data;
};
