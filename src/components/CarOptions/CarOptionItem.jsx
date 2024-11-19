import PropTypes from 'prop-types';
import { Link, useNavigate } from '@tanstack/react-router';
import Button from 'react-bootstrap/Button';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { confirmAlert } from 'react-confirm-alert';
import { deleteCarOptionById } from '../../service/caroption';
import { useMutation } from '@tanstack/react-query';

const CarOptionItem = ({ carOption, refetchData }) => {
	const { user } = useSelector(state => state.auth);
	const navigate = useNavigate();

	const { mutate: deleting, isPending: isDeleting } = useMutation({
		mutationFn: id => {
			console.log('Deleting car option with ID:', id);
			return deleteCarOptionById(id);
		},
		onSuccess: () => {
			refetchData();
			toast.success('Car option deleted successfully!');
		},
		onError: error => {
			toast.error('Failed to delete car option: ' + error?.message);
		},
	});

	const handleDelete = async event => {
		event.preventDefault();

		confirmAlert({
			title: 'Confirm to delete',
			message: 'Are you sure you want to delete this car option?\nData in use cannot be deleted.',
			buttons: [
				{
					label: 'Yes',
					onClick: async () => {
						deleting(carOption.id);
					},
				},
				{ label: 'No' },
			],
		});
	};

	return (
		<tr>
			<td>{carOption.id}</td>
			<td>{carOption.option_name}</td>
			<td>
				<Link to={`/admin/caroptions/${carOption.id}`} className="btn btn-primary me-2">
					Detail
				</Link>
				{user?.role_id === 1 && (
					<>
						<Button as={Link} to={`/admin/caroptions/edit/${carOption.id}`} variant="warning" size="sm" className="me-2" disabled={isDeleting}>
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

CarOptionItem.propTypes = {
	carOption: PropTypes.object.isRequired,
	refetchData: PropTypes.func.isRequired,
};

export default CarOptionItem;
