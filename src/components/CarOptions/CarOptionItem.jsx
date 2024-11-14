import PropTypes from 'prop-types';
import { Link } from '@tanstack/react-router';
import Button from 'react-bootstrap/Button';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { confirmAlert } from 'react-confirm-alert';
import { deleteCarOptionById } from '../../service/carOption';

const CarOptionItem = ({ carOption, refetchData }) => {
	const { user } = useSelector(state => state.auth);

	const handleDelete = async event => {
		event.preventDefault();

		confirmAlert({
			title: 'Confirm to delete',
			message: 'Are you sure to delete this car option?',
			buttons: [
				{
					label: 'Yes',
					onClick: async () => {
						const result = await deleteCarOptionById(carOption.id);
						if (result.success) {
							toast.success('Car option deleted successfully.');
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
			<td>{carOption.id}</td>
			<td>{carOption.option_name}</td>
			<td>
				<Link to={`/caroptions/${carOption.id}`} className="btn btn-primary me-2">
					Detail
				</Link>
				{user?.role_id === 1 && (
					<>
						<Button as={Link} to={`/caroptions/edit/${carOption.id}`} variant="warning" size="sm" className="me-2">
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

CarOptionItem.propTypes = {
	carOption: PropTypes.object.isRequired,
	refetchData: PropTypes.func.isRequired,
};

export default CarOptionItem;
