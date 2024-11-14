import PropTypes from "prop-types";
import { Link } from "@tanstack/react-router";
import Button from "react-bootstrap/Button";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { confirmAlert } from "react-confirm-alert";
import { deleteManufactureById } from "../../service/manufacture";

const ManufactureItem = ({ manufacture, refetchData }) => {
  const { user } = useSelector((state) => state.auth);

  const handleDelete = async (event) => {
    event.preventDefault();

    confirmAlert({
      title: "Confirm to delete",
      message: "Are you sure to delete this manufacture?",
      buttons: [
        {
          label: "Yes",
          onClick: async () => {
            const result = await deleteManufactureById(manufacture.id);
            if (result.success) {
              toast.success("Manufacture deleted successfully.");
              refetchData(); // Call refetchData to refresh the list
            } else {
              toast.error(result?.message || "Failed to delete.");
            }
          },
        },
        { label: "No" },
      ],
    });
  };

  return (
    <tr>
      <td>{manufacture.id}</td>
      <td>{manufacture.manufacture_name}</td>
      <td>
        <Link
          to={`/manufacture/${manufacture.id}`}
          className="btn btn-primary me-2"
        >
          Detail
        </Link>
        {user?.role_id === 1 && (
          <>
            <Button
              as={Link}
              href={`/manufacture/edit/${manufacture.id}`}
              variant="warning"
              size="sm"
              className="me-2"
            >
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

ManufactureItem.propTypes = {
  manufacture: PropTypes.object.isRequired,
  refetchData: PropTypes.func.isRequired, // Expect refetchData function prop
};

export default ManufactureItem;
