import { createLazyFileRoute, useNavigate } from '@tanstack/react-router';
import { useState } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { createCarOption } from '../../../service/caroption';
import { toast } from 'react-toastify';
import ProtectedRoute from '../../../redux/slices/ProtectedRoute.js';
import { useMutation } from '@tanstack/react-query';

export const Route = createLazyFileRoute('/admin/caroptions/create')({
	component: () => (
		<ProtectedRoute allowedRoles={[1]}>
			<CreateCarOption />
		</ProtectedRoute>
	),
});

function CreateCarOption() {
	const navigate = useNavigate();

	const [optionName, setOptionName] = useState('');

	const { mutate: create, isPending } = useMutation({
		mutationFn: data => createCarOption(data),
		onSuccess: () => {
			toast.success('Car option created successfully!');
			navigate({ to: '/admin/caroptions' });
		},
		onError: error => {
			toast.error(error?.message);
		},
	});

	const onSubmit = async event => {
		event.preventDefault();

		const request = {
			option_name: optionName,
		};

		if (!optionName) {
			toast.error('Option name is required');
			return;
		}
		create(request);
	};

	return (
		<Row className="mt-5">
			<Col className="offset-md-3">
				<Card>
					<Card.Header className="text-center">Create Option</Card.Header>
					<Card.Body>
						<Form onSubmit={onSubmit}>
							<Form.Group as={Row} className="mb-3" controlId="optionName">
								<Form.Label column sm={3}>
									Option Name
								</Form.Label>
								<Col sm="9">
									<Form.Control
										type="text"
										placeholder="Option Name"
										value={optionName}
										onChange={event => {
											setOptionName(event.target.value);
										}}
									/>
								</Col>
							</Form.Group>
							<div className="d-grid gap-2">
								<Button type="submit" variant="primary" disabled={isPending}>
									Create Option
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

export default CreateCarOption;
