import PropTypes from "prop-types";
import { Link } from "@tanstack/react-router";
import Button from "react-bootstrap/Button";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { confirmAlert } from "react-confirm-alert";
import { deleteTypeById } from "../../service/type";

const TypeItem = ({ type, refetchData }) => {
  const { user } = useSelector((state) => state.auth);

  const handleDelete = async (event) => {
    event.preventDefault();

    confirmAlert({
      title: "Confirm to delete",
      message: "Are you sure to delete this type?",
      buttons: [
        {
          label: "Yes",
          onClick: async () => {
            const result = await deleteTypeById(type.id);
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
      <td>{type.id}</td>
      <td>{type.type_option}</td>
      <td>
        <Link to={`/type/${type.id}`} className="btn btn-primary me-2">
          Detail
        </Link>
        {user?.role_id === 1 && (
          <>
            <Button
              as={Link}
              href={`/type/edit/${type.id}`}
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

TypeItem.propTypes = {
  type: PropTypes.object.isRequired,
  refetchData: PropTypes.func.isRequired, // Expect refetchData function prop
};

export default TypeItem;
