import { createLazyFileRoute, useNavigate } from '@tanstack/react-router';
import { useEffect, useState } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { getDetailCarOption, updateCarOption } from '../../../../service/caroption';
import ProtectedRoute from '../../../../redux/slices/ProtectedRoute.js';
import { useMutation, useQuery } from '@tanstack/react-query';
import { FaArrowLeft } from 'react-icons/fa';
import { toast } from 'react-toastify';

export const Route = createLazyFileRoute('/admin/caroptions/edit/$id')({
	component: () => (
		<ProtectedRoute allowedRoles={[1]}>
			<EditCarOption />
		</ProtectedRoute>
	),
});

function EditCarOption() {
	const { id } = Route.useParams();
	const navigate = useNavigate();

	const [optionName, setOptionName] = useState('');

	const { data: carOptions, isSuccess } = useQuery({
		queryKey: ['carOptions', id],
		queryFn: () => getDetailCarOption(id),
		enabled: !!id,
	});

	const { mutate: updatingOption, isPending: isUpdatingOption } = useMutation({
		mutationFn: data => updateCarOption(id, data),
		onSuccess: () => {
			toast.success('Option updated successfully');
			navigate({ to: '/admin/caroptions/$id' });
		},
		onError: error => {
			toast.error(error?.message);
		},
	});

	useEffect(() => {
		if (isSuccess) {
			setOptionName(carOptions.option_name);
		}
	}, [carOptions, isSuccess]);

	const onSubmit = async event => {
		event.preventDefault();
		const request = { option_name: optionName };

		if (!optionName || optionName === carOptions.option_name) {
			toast.error('Option name is required and cannot be the same as before');
			return;
		}
		updatingOption(request);
	};

	return (
		<>
			<Row className="mt-3 mb-3">
				<Col>
					<Button
						variant="outline-secondary"
						onClick={() => navigate({ to: '/admin/caroptions' })}
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
									<Form.Label>Spec Name</Form.Label>
									<Form.Control
										type="text"
										value={optionName}
										onChange={event => {
											setOptionName(event.target.value);
										}}
									/>
								</Form.Group>
								<Button type="submit" variant="primary" disabled={isUpdatingOption}>
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
