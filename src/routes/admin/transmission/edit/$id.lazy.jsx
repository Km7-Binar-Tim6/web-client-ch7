import { createLazyFileRoute, useNavigate } from '@tanstack/react-router';
import { useEffect, useState } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { getDetailTransmission, updateTransmission } from '../../../../service/transmission';
import ProtectedRoute from '../../../../redux/slices/ProtectedRoute.js';
import { toast } from 'react-toastify';
import { useMutation, useQuery } from '@tanstack/react-query';
import { FaArrowLeft } from 'react-icons/fa';

export const Route = createLazyFileRoute('/admin/transmission/edit/$id')({
	component: () => (
		<ProtectedRoute allowedRoles={[1]}>
			<EditTransmission />
		</ProtectedRoute>
	),
});

function EditTransmission() {
	const { id } = Route.useParams();
	const navigate = useNavigate();

	const [transmissionName, setTransmissionName] = useState('');

	const { data: transmission, isSuccess } = useQuery({
		queryKey: ['transmission', id],
		queryFn: () => getDetailTransmission(id),
		enabled: !!id,
	});

	const { mutate: updatingTransmission, isPending: isUpdatingTransmission } = useMutation({
		mutationFn: data => updateTransmission(id, data),
		onSuccess: () => {
			toast.success('Transmission updated successfully');
			navigate({ to: '/admin/transmission/$id' });
		},
		onError: error => {
			toast.error(error?.message);
		},
	});

	useEffect(() => {
		if (isSuccess) {
			setTransmissionName(transmission.transmission_option);
		}
	}, [transmission, isSuccess]);

	const onSubmit = async event => {
		event.preventDefault();
		const request = { transmission_option: transmissionName };

		if (!transmissionName || transmissionName === transmission.transmission_option) {
			toast.error('Transmission name is required and cannot be the same as before');
			return;
		}
		updatingTransmission(request);
	};

	return (
		<>
			<Row className="mt-3 mb-3">
				<Col>
					<Button
						variant="outline-secondary"
						onClick={() => navigate({ to: '/admin/transmission' })}
						style={{
							display: 'flex',
							alignItems: 'center',
						}}
					>
						<FaArrowLeft style={{ marginRight: '8px' }} /> Back
					</Button>
				</Col>
			</Row>
			<Row className="mt-5">
				<Col className="offset-md-4">
					<Card
						style={{
							border: '1px solid #E0E0E0',
							borderRadius: '8px',
							padding: '16px',
						}}
					>
						<Card.Body>
							<Form onSubmit={onSubmit}>
								<Form.Group className="mb-3">
									<Form.Label>Transmission Name</Form.Label>
									<Form.Control
										type="text"
										value={transmissionName}
										onChange={event => {
											setTransmissionName(event.target.value);
										}}
									/>
								</Form.Group>
								<Button type="submit" variant="primary" disabled={isUpdatingTransmission}>
									Update
								</Button>
							</Form>
						</Card.Body>
					</Card>
				</Col>
				<Col md={3}></Col>
			</Row>
		</>
	);
}

export default EditTransmission;
