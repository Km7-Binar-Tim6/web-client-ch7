export const getCarOptions = async () => {
	const token = localStorage.getItem('token');
	let url = `${import.meta.env.VITE_API_URL}/caroptions`;

	const response = await fetch(url, {
		headers: {
			authorization: `Bearer ${token}`,
		},
		method: 'GET',
	});

	const result = await response.json();
	return result;
};

export const getDetailCarOption = async id => {
	const token = localStorage.getItem('token');
	let url = `${import.meta.env.VITE_API_URL}/caroptions/${id}`;

	const response = await fetch(url, {
		headers: {
			authorization: `Bearer ${token}`,
		},
		method: 'GET',
	});

	const result = await response.json();
	return result;
};

export const createCarOption = async request => {
	const token = localStorage.getItem('token');
	if (!token) throw new Error('Authentication token is missing.');

	const formData = new FormData();
	formData.append('option_name', request.option_name);

	const response = await fetch(`${import.meta.env.VITE_API_URL}/caroptions`, {
		headers: {
			authorization: `Bearer ${token}`,
		},
		method: 'POST',
		body: formData,
	});

	const result = await response.json();
	return result;
};

export const deleteCarOptionById = async id => {
	const token = localStorage.getItem('token');

	let url = `${import.meta.env.VITE_API_URL}/caroptions/${id}`;

	const response = await fetch(url, {
		headers: {
			authorization: `Bearer ${token}`,
		},
		method: 'DELETE',
	});

	const result = await response.json();
	return result;
};

export const updateCarOption = async (id, request) => {
	const token = localStorage.getItem('token');
	const formData = new FormData();
	formData.append('option_name', request.option_name);

	const response = await fetch(`${import.meta.env.VITE_API_URL}/caroptions/${id}`, {
		headers: {
			authorization: `Bearer ${token}`,
		},
		method: 'PUT',
		body: formData,
	});

	const result = await response.json();
	return result;
};
