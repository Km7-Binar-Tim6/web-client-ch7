import PropTypes from 'prop-types';
import { Link, useNavigate } from '@tanstack/react-router';
import Button from 'react-bootstrap/Button';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { confirmAlert } from 'react-confirm-alert';
import { deleteTransmissionById } from '../../service/transmission';
import { useMutation } from '@tanstack/react-query';

const TransmissionItem = ({ transmission, refetchData }) => {
	const { user } = useSelector(state => state.auth);
	const navigate = useNavigate();

	const { mutate: deleting, isPending: isDeleting } = useMutation({
		mutationFn: id => {
			console.log('Deleting transmission with ID:', id);
			return deleteTransmissionById(id);
		},
		onSuccess: () => {
			refetchData();
			toast.success('Transmission deleted successfully!');
		},
		onError: error => {
			toast.error('Failed to delete transmission: ' + error?.message);
		},
	});

	const handleDelete = async event => {
		event.preventDefault();

		confirmAlert({
			title: 'Confirm Deletion',
			message: 'Are you sure you want to delete this transmission?\nData in use cannot be deleted.',
			buttons: [
				{
					label: 'Yes',
					onClick: async () => {
						deleting(transmission.id);
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
				<Link to={`/admin/transmission/${transmission.id}`} className="btn btn-primary me-2">
					Detail
				</Link>
				{user?.role_id === 1 && (
					<>
						<Button as={Link} to={`/admin/transmission/edit/${transmission.id}`} variant="warning" size="sm" className="me-2" disabled={isDeleting}>
							Edit
						</Button>
						<Button onClick={handleDelete} variant="danger" size="sm" disabled={isDeleting}>
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
