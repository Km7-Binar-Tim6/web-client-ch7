import { createLazyFileRoute, useNavigate } from '@tanstack/react-router';
import { useEffect, useState } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { getDetailCarOption } from '../../service/carOption';

export const Route = createLazyFileRoute('/caroptions/$id')({
	component: CarOptionDetail,
});

function CarOptionDetail() {
	const { id } = Route.useParams();
	const navigate = useNavigate();

	const [carOption, setCarOption] = useState({});
	const [isLoading, setIsLoading] = useState(false);
	const [isNotFound, setIsNotFound] = useState(false);

	useEffect(() => {
		const getDetailCarOptionData = async () => {
			if (!id) return;

			setIsLoading(true);
			try {
				const result = await getDetailCarOption(id);
				if (result.success && result.data) {
					setCarOption(result.data);
					setIsNotFound(false);
				} else {
					setIsNotFound(true);
				}
			} catch (error) {
				console.error('Error fetching car option details:', error);
				setIsNotFound(true);
			} finally {
				setIsLoading(false);
			}
		};
		getDetailCarOptionData();
	}, [id]);

	if (isLoading) {
		return (
			<Row className="mt-5">
				<Col>
					<h1 className="text-center">Loading...</h1>
				</Col>
			</Row>
		);
	}

	if (isNotFound) {
		return (
			<Row className="mt-5">
				<Col>
					<h1 className="text-center">Car option not found!</h1>
				</Col>
			</Row>
		);
	}

	return (
		<Row className="mt-5">
			<Col md={{ span: 6, offset: 3 }}>
				<Card className="shadow-sm">
					<Card.Body>
						<Card.Title className="text-center mb-4">Car Option Details</Card.Title>
						<Card.Text>
							<strong>ID:</strong> {id}
						</Card.Text>
						<Card.Text>
							<strong>Name:</strong> {carOption.option_name || 'No option available'}
						</Card.Text>
						<Button variant="secondary" size="md" className="d-block mt-4" onClick={() => navigate({ to: '/caroptions' })}>
							Back to Car Option List
						</Button>
					</Card.Body>
				</Card>
			</Col>
		</Row>
	);
}

export default CarOptionDetail;
