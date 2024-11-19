import { createLazyFileRoute, useNavigate } from '@tanstack/react-router';
import { useEffect, useState } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { getDetailTransmission } from '../../../service/transmission';
import { isPending } from '@reduxjs/toolkit';
import { useQuery } from '@tanstack/react-query';
import ProtectedRoute from '../../../redux/slices/ProtectedRoute';

export const Route = createLazyFileRoute('/admin/transmission/$id')({
	component: () => (
		<ProtectedRoute allowedRoles={[1]}>
			<TransmissionDetail />
		</ProtectedRoute>
	),
});

function TransmissionDetail() {
	const { id } = Route.useParams();
	const navigate = useNavigate();
	const [transmission, setTransmission] = useState({});

	const { data, isSuccess, isPending, isError } = useQuery({
		queryKey: ['transmission', id],
		queryFn: () => getDetailTransmission(id),
		enabled: !!id,
	});

	useEffect(() => {
		if (isSuccess) {
			setTransmission(data);
		}
	}, [data, isSuccess]);

	if (isPending) {
		return (
			<Row className="mt-5">
				<Col>
					<h1 className="text-center">Loading...</h1>
				</Col>
			</Row>
		);
	}

	if (isError) {
		return (
			<Row className="mt-5">
				<Col>
					<h1 className="text-center">Transmission not found!</h1>
				</Col>
			</Row>
		);
	}

	return (
		<Row className="mt-5">
			<Col md={{ span: 6, offset: 3 }}>
				<Card className="shadow-sm">
					<Card.Body>
						<Card.Title className="text-center mb-4">Transmission Details</Card.Title>
						<Card.Text>
							<strong>ID:</strong> {id}
						</Card.Text>
						<Card.Text>
							<strong>Name:</strong> {transmission.transmission_option || 'No option available'}
						</Card.Text>
						<Button variant="secondary" size="md" className="d-block mt-4" onClick={() => navigate({ to: '/admin/transmission' })}>
							Back to Transmission List
						</Button>
					</Card.Body>
				</Card>
			</Col>
		</Row>
	);
}

export default TransmissionDetail;
