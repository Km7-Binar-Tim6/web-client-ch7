import PropTypes from "prop-types";
import { Link } from "@tanstack/react-router";
import Button from "react-bootstrap/Button";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { confirmAlert } from "react-confirm-alert";
import { deleteModelById } from "../../service/model";

const ModelItem = ({ model, refetchData }) => {
  const { user } = useSelector((state) => state.auth);

  const handleDelete = async (event) => {
    event.preventDefault();

    confirmAlert({
      title: "Confirm to delete",
      message: "Are you sure to delete this model?",
      buttons: [
        {
          label: "Yes",
          onClick: async () => {
            const result = await deleteModelById(model.id);
            if (result.success) {
              toast.success("Model deleted successfully.");
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
      <td>{model.id}</td>
      <td>{model.model_name}</td>
      <td>
        <Link to={`/model/${model.id}`} className="btn btn-primary me-2">
          Detail
        </Link>
        {user?.role_id === 1 && (
          <>
            <Button
              as={Link}
              href={`/model/edit/${model.id}`}
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

ModelItem.propTypes = {
  model: PropTypes.object.isRequired,
  refetchData: PropTypes.func.isRequired, // Expect refetchData function prop
};

export default ModelItem;
