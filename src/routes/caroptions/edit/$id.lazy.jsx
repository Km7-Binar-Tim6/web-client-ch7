import { createLazyFileRoute, useNavigate } from '@tanstack/react-router';
import { useEffect, useState } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { getDetailCarOption, updateCarOption } from '../../../service/carOption';
import ProtectedRoute from '../../../redux/slices/ProtectedRoute.js';

export const Route = createLazyFileRoute('/caroptions/edit/$id')({
	component: () => (
		<ProtectedRoute allowedRoles={[1]}>
			<EditCarOption />
		</ProtectedRoute>
	),
});

function EditCarOption() {
	const { id } = Route.useParams();
	const navigate = useNavigate();

	const [option, setOption] = useState('');
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		const fetchCarOption = async () => {
			try {
				const result = await getDetailCarOption(id);
				if (result?.success && result.data) {
					setOption(result.data.option_name);
					setError(null);
				} else {
					setError('Failed to load car option details.');
				}
			} catch (error) {
				console.error('Error fetching car option details:', error);
				setError('An error occurred while fetching data.');
			} finally {
				setIsLoading(false);
			}
		};

		if (id) {
			fetchCarOption();
		}
	}, [id]);

	const onSubmit = async event => {
		event.preventDefault();
		const request = { option_name: option };

		const result = await updateCarOption(id, request);

		if (result?.success) {
			navigate({ to: `/caroptions/${id}` });
		} else {
			alert(result?.message || 'Failed to update car option');
		}
	};

	if (isLoading) {
		return (
			<Row className="mt-5">
				<Col className="text-center">
					<h1>Loading...</h1>
				</Col>
			</Row>
		);
	}

	if (error) {
		return (
			<Row className="mt-5">
				<Col className="text-center">
					<h1>{error}</h1>
				</Col>
			</Row>
		);
	}

	return (
		<Row className="justify-content-center mt-4">
			<Col md={6}>
				<Card className="shadow-sm border-0">
					<Card.Body>
						<Form onSubmit={onSubmit}>
							<Form.Group className="mb-3" controlId="option">
								<Form.Label>Current Car Option</Form.Label>
								<Form.Control type="text" value={option} onChange={event => setOption(event.target.value)} placeholder="Enter new car option" required />
							</Form.Group>

							<Button variant="primary" type="submit" className="w-100 mt-3">
								Update Car Option
							</Button>
						</Form>
					</Card.Body>
				</Card>
			</Col>
		</Row>
	);
}

export default EditCarOption;
