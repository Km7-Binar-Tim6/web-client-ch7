import { createLazyFileRoute, useNavigate } from "@tanstack/react-router";
import { useSelector } from "react-redux";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import { FaPlus } from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";
import { getManufacture } from "../../../service/manufacture";
import ManufactureItem from "../../../components/Manufacture/ManufactureItem";

export const Route = createLazyFileRoute("/admin/manufacture/")({
  component: Manufacture,
});

function Manufacture() {
  const navigate = useNavigate();
  const { token, user } = useSelector((state) => state.auth);

  // Fetch data using TanStack Query
  const {
    data: manufactures,
    isLoading,
    isError,
    refetch, // Function to manually refetch data if needed
  } = useQuery({
    queryKey: ["manufactures"], // Unique query key
    queryFn: async () => {
      const result = await getManufacture();
      return result; // result is already the data from getManufacture
    },
    enabled: !!token, // Fetch only if the token exists
  });

  // Redirect to login if no token
  if (!token) {
    navigate({ to: "/login" });
    return null;
  }

  if (isLoading) {
    return (
      <div className="mt-4">
        <h1>Loading...</h1>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="mt-4">
        <h1>Failed to load manufacture data. Please try again later.</h1>
      </div>
    );
  }

  return (
    <>
      <div className="d-flex justify-content-between align-items-center mt-4">
        <h1>Manufacture List</h1>
        {user && user.role_id === 1 && (
          <Button
            variant="primary"
            onClick={() => navigate({ to: "/admin/manufacture/create" })}
            className="d-flex align-items-center"
          >
            <FaPlus className="me-2" />
            Create New Manufacture
          </Button>
        )}
      </div>

      {manufactures.length === 0 ? (
        <h1 className="mt-4">Manufacture data is not found!</h1>
      ) : (
        <Table striped bordered hover className="mt-4">
          <thead>
            <tr>
              <th>ID</th>
              <th>Manufacture Name</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {manufactures.map((manufacture) => (
              <ManufactureItem
                manufacture={manufacture}
                key={manufacture?.id}
                refetchData={refetch} // Pass refetch from useQuery
              />
            ))}
          </tbody>
        </Table>
      )}
    </>
  );
}

export default Manufacture;
