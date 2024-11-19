export const getCarOptions = async () => {
	const token = localStorage.getItem('token');
	if (!token) throw new Error('Authentication token is missing.');

	let url = `${import.meta.env.VITE_API_URL}/caroptions`;
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

export const getDetailCarOption = async id => {
	const token = localStorage.getItem('token');
	if (!token) throw new Error('Authentication token is missing.');

	let url = `${import.meta.env.VITE_API_URL}/caroptions/${id}`;
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

export const createCarOption = async data => {
	const token = localStorage.getItem('token');
	if (!token) throw new Error('Authentication token is missing.');
	const formData = new FormData();
	formData.append('option_name', data.option_name);

	let url = `${import.meta.env.VITE_API_URL}/caroptions`;
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

export const deleteCarOptionById = async id => {
	const token = localStorage.getItem('token');
	if (!token) throw new Error('Authentication token is missing.');

	let url = `${import.meta.env.VITE_API_URL}/caroptions/${id}`;
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

export const updateCarOption = async (id, data) => {
	const token = localStorage.getItem('token');
	if (!token) throw new Error('Authentication token is missing.');
	const formData = new FormData();
	formData.append('option_name', data.option_name);

	let url = `${import.meta.env.VITE_API_URL}/caroptions/${id}`;
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
