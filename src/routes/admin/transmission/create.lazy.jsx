import { createLazyFileRoute, useNavigate } from '@tanstack/react-router';
import { useState } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { createTransmission } from '../../../service/transmission';
import { toast } from 'react-toastify';
import ProtectedRoute from '../../../redux/slices/ProtectedRoute.js';
import { useMutation } from '@tanstack/react-query';

export const Route = createLazyFileRoute('/admin/transmission/create')({
	component: () => (
		<ProtectedRoute allowedRoles={[1]}>
			<CreateTransmission />
		</ProtectedRoute>
	),
});

function CreateTransmission() {
	const navigate = useNavigate();

	const [transmissionName, setTransmissionName] = useState('');

	const { mutate: create, isPending } = useMutation({
		mutationFn: data => createTransmission(data),
		onSuccess: () => {
			toast.success('Transmission created successfully!');
			navigate({ to: '/admin/transmission' });
		},
		onError: error => {
			toast.error(error?.message);
		},
	});

	const onSubmit = async event => {
		event.preventDefault();

		const request = {
			transmission_option: transmissionName,
		};

		if (!transmissionName) {
			toast.error('Transmission name is required');
			return;
		}
		create(request);
	};

	return (
		<Row className="mt-5">
			<Col className="offset-md-3">
				<Card>
					<Card.Header className="text-center">Create Transmission</Card.Header>
					<Card.Body>
						<Form onSubmit={onSubmit}>
							<Form.Group as={Row} className="mb-3" controlId="transmissionName">
								<Form.Label column sm={3}>
									Transmission Name
								</Form.Label>
								<Col sm="9">
									<Form.Control
										type="text"
										placeholder="Transmission Name"
										value={transmissionName}
										onChange={event => {
											setTransmissionName(event.target.value);
										}}
									/>
								</Col>
							</Form.Group>
							<div className="d-grid gap-2">
								<Button type="submit" variant="primary" disabled={isPending}>
									Create Transmission
								</Button>
							</div>
						</Form>
					</Card.Body>
				</Card>
			</Col>
			<Col md={3}></Col>
		</Row>
	);
}

export default CreateTransmission;
