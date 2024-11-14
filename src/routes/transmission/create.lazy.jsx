import { createLazyFileRoute, useNavigate } from '@tanstack/react-router';
import { useState } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { createTransmission } from '../../service/transmission';
import { toast } from 'react-toastify';
import ProtectedRoute from '../../redux/slices/ProtectedRoute.js';

export const Route = createLazyFileRoute('/transmission/create')({
	component: () => (
		<ProtectedRoute allowedRoles={[1]}>
			<CreateTransmission />
		</ProtectedRoute>
	),
});

function CreateTransmission() {
	const navigate = useNavigate();

	const [option, setOption] = useState('');

	const onSubmit = async event => {
		event.preventDefault();

		const request = {
			transmission_option: option,
		};

		const result = await createTransmission(request);
		if (result?.success) {
			navigate({ to: '/transmission' });
			return;
		}

		toast.error(result?.message || 'Failed to create transmission');
	};

	return (
		<Row className="justify-content-center">
			<Col md={6}>
				<Card>
					<Card.Body>
						<Card.Title>Create a new transmission</Card.Title>
						<Form onSubmit={onSubmit}>
							<Form.Group className="mb-3" controlId="transmissionOption">
								<Form.Label>Option</Form.Label>
								<Form.Control type="text" value={option} placeholder="Enter new transmission option" onChange={event => setOption(event.target.value)} />
							</Form.Group>

							<Button variant="primary" type="submit">
								Submit
							</Button>
						</Form>
					</Card.Body>
				</Card>
			</Col>
		</Row>
	);
}

export default CreateTransmission;
