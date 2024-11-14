import PropTypes from 'prop-types';
import { Link } from '@tanstack/react-router';
import Button from 'react-bootstrap/Button';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { confirmAlert } from 'react-confirm-alert';
import { deleteCarSpecs } from '../../service/carspecs';

const CarSpecsItem = ({ carSpecs, refetchData }) => {
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
						const result = await deleteCarSpecs(carSpecs.id);
						if (result.success) {
							toast.success('Car specs deleted successfully.');
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
			<td>{carSpecs.id}</td>
			<td>{carSpecs.spec_name}</td>
			<td>
				<Link to={`/carspecs/${carSpecs.id}`} className="btn btn-primary me-2">
					Detail
				</Link>
				{user?.role_id === 1 && (
					<>
						<Button as={Link} to={`/carspecs/edit/${carSpecs.id}`} variant="warning" size="sm" className="me-2">
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

CarSpecsItem.propTypes = {
	carSpecs: PropTypes.object.isRequired,
	refetchData: PropTypes.func.isRequired,
};

export default CarSpecsItem;
