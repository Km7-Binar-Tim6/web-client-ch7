import { createLazyFileRoute, useNavigate } from '@tanstack/react-router';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import { FaPlus } from 'react-icons/fa';
import { getTransmission } from '../../../service/transmission';
import TransmissionItem from '../../../components/Transmission/TransmissionItem';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/esm/Col';
import ProtectedRoute from '../../../redux/slices/ProtectedRoute';

export const Route = createLazyFileRoute('/admin/transmission/')({
	component: () => (
		<ProtectedRoute allowedRoles={[1]}>
			<Transmission />
		</ProtectedRoute>
	),
});

function Transmission() {
	const navigate = useNavigate();
	const { token, user } = useSelector(state => state.auth);

	const [transmissions, setTransmissions] = useState([]);

	const queryClient = useQueryClient();

	const { data, isSuccess, isPending } = useQuery({
		queryKey: ['transmission'],
		queryFn: getTransmission,
		enabled: !!token,
	});

	const sortedTransmission = data?.sort((a, b) => a.id - b.id);

	const refetchData = async () => {
		await queryClient.invalidateQueries({ queryKey: ['transmission'] });
	};

	useEffect(() => {
		if (isSuccess) {
			setTransmissions(sortedTransmission);
		}
	}, [data, isSuccess]);

	if (!token) {
		return (
			<Row className="mt-4">
				<Col>
					<h1 className="text-center">Please login first to get transmissions data!</h1>
				</Col>
			</Row>
		);
	}

	if (isPending) {
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
					<Button variant="primary" onClick={() => navigate({ to: '/admin/transmission/create' })} className="d-flex align-items-center">
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
							<TransmissionItem transmission={transmission} key={transmission?.id} refetchData={refetchData} />
						))}
					</tbody>
				</Table>
			)}
		</>
	);
}
