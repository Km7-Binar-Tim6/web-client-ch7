import PropTypes from 'prop-types';
import { Link } from '@tanstack/react-router';
import Button from 'react-bootstrap/Button';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { confirmAlert } from 'react-confirm-alert';
import { deleteTransmissionById } from '../../service/transmission';

const TransmissionItem = ({ transmission, refetchData }) => {
	const { user } = useSelector(state => state.auth);

	const handleDelete = async event => {
		event.preventDefault();

		confirmAlert({
			title: 'Confirm to delete',
			message: 'Are you sure to delete this transmission?',
			buttons: [
				{
					label: 'Yes',
					onClick: async () => {
						const result = await deleteTransmissionById(transmission.id);
						if (result.success) {
							toast.success('Transmission deleted successfully.');
							refetchData();
						} else {
							toast.error(result?.message || 'Failed to delete.');
						}
					},
				},
				{ label: 'No' },
			],
		});
	};

	return (
		<tr>
			<td>{transmission.id}</td>
			<td>{transmission.transmission_option}</td>
			<td>
				<Link to={`/transmission/${transmission.id}`} className="btn btn-primary me-2">
					Detail
				</Link>
				{user?.role_id === 1 && (
					<>
						<Button as={Link} to={`/transmission/edit/${transmission.id}`} variant="warning" size="sm" className="me-2">
							Edit
						</Button>
						<Button onClick={handleDelete} variant="danger" size="sm">
							Delete
						</Button>
					</>
				)}
			</td>
		</tr>
	);
};

TransmissionItem.propTypes = {
	transmission: PropTypes.object.isRequired,
	refetchData: PropTypes.func.isRequired,
};

export default TransmissionItem;
