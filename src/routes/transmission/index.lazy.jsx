import { createLazyFileRoute, useNavigate } from '@tanstack/react-router';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import { FaPlus } from 'react-icons/fa';
import { getTransmission } from '../../service/transmission';
import TransmissionItem from '../../components/Transmission/TransmissionItem';

export const Route = createLazyFileRoute('/transmission/')({
	component: Transmission,
});

function Transmission() {
	const navigate = useNavigate();
	const { token, user } = useSelector(state => state.auth);

	const [transmissions, setTransmissions] = useState([]);
	const [isLoading, setIsLoading] = useState(false);

	const getTransmissionData = async () => {
		setIsLoading(true);
		const result = await getTransmission();
		if (result.success) {
			setTransmissions(result.data);
		}
		setIsLoading(false);
	};

	const refetchData = async () => {
		await getTransmissionData();
	};

	useEffect(() => {
		const getTransmissionData = async () => {
			setIsLoading(true);
			const result = await getTransmission();
			if (result.success) {
				setTransmissions(result.data);
			}
			setIsLoading(false);
		};

		if (token) {
			getTransmissionData();
		} else {
			navigate({ to: '/login' });
		}
	}, [token, navigate]);

	if (!token) {
		return null;
	}

	if (isLoading) {
		return (
			<div className="mt-4">
				<h1>Loading...</h1>
			</div>
		);
	}

	return (
		<>
			<div className="d-flex justify-content-between align-items-center mt-4">
				<h1>Transmission List</h1>
				{user && user.role_id === 1 && (
					<Button variant="primary" onClick={() => navigate({ to: '/transmission/create' })} className="d-flex align-items-center">
						<FaPlus className="me-2" />
						Create New Transmission
					</Button>
				)}
			</div>

			{transmissions.length === 0 ? (
				<h1 className="mt-4">Transmission data is not found!</h1>
			) : (
				<Table striped bordered hover className="mt-4">
					<thead>
						<tr>
							<th>ID</th>
							<th>Transmission Name</th>
							<th>Actions</th>
						</tr>
					</thead>
					<tbody>
						{transmissions.map(transmission => (
							<TransmissionItem
								transmission={transmission}
								key={transmission?.id}
								refetchData={refetchData} // Pass refetchData to each TransmissionItem
							/>
						))}
					</tbody>
				</Table>
			)}
		</>
	);
}

export default Transmission;
