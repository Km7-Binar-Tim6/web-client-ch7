import PropTypes from "prop-types";
import { Link, useNavigate } from "@tanstack/react-router";
import Button from "react-bootstrap/Button";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { confirmAlert } from "react-confirm-alert";
import { deleteCarSpecs } from "../../service/carspecs";
import { useMutation } from "@tanstack/react-query";

const CarSpecsItem = ({ carSpecs, refetchData }) => {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const { mutate: deleting, isPending: isDeleting } = useMutation({
    mutationFn: (id) => deleteCarSpecs(id),
    onSuccess: () => {
      refetchData();
    },
    onError: (error) => {
      toast.error(error?.message);
    },
  });

  const handleDelete = async (event) => {
    event.preventDefault();

    confirmAlert({
      title: "Confirm to delete",
      message: "Are you sure to delete this car option?",
      buttons: [
        {
          label: "Yes",
          onClick: async () => {
            deleting(carSpecs.id);
          },
        },
        { label: "No" },
      ],
    });
  };

  return (
    <tr>
      <td>{carSpecs.id}</td>
      <td>{carSpecs.spec_name}</td>
      <td>
        <Link
          to={`/admin/carspecs/${carSpecs.id}`}
          className="btn btn-primary me-2"
        >
          Detail
        </Link>
        {user?.role_id === 1 && (
          <>
            <Button
              as={Link}
              to={`/admin/carspecs/edit/${carSpecs.id}`}
              variant="warning"
              size="sm"
              className="me-2"
              disabled={isDeleting}
            >
              Edit
            </Button>
            <Button
              onClick={handleDelete}
              variant="danger"
              size="sm"
              disabled={isDeleting}
            >
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
