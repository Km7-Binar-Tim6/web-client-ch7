import { createLazyFileRoute, useNavigate } from "@tanstack/react-router";
import { useSelector } from "react-redux";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import { FaPlus } from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";
import { getType } from "../../../service/type";
import TypeItem from "../../../components/Type/TypeItem";
import { useEffect } from "react";
import ProtectedRoute from "../../../redux/slices/ProtectedRoute";
export const Route = createLazyFileRoute("/admin/type/")({
  component: () => (
    <ProtectedRoute allowedRoles={[1]}>
      <Type />
    </ProtectedRoute>
  ),
});

function Type() {
  const navigate = useNavigate();
  const { token, user } = useSelector((state) => state.auth);

  // Use TanStack Query to fetch types
  const {
    data: types,
    isLoading,
    isError,
    refetch, // Function to manually refetch data if needed
  } = useQuery({
    queryKey: ["types"], // Unique query key
    queryFn: async () => {
      const result = await getType();
      return result; // result is already the data from getManufacture
    },
    enabled: !!token, // Fetch only if the token exists
  });

  // Redirect to login if the user is not authenticated
  useEffect(() => {
    if (!token) {
      navigate({ to: "/login" });
    }
  }, [token, navigate]);

  if (!token) {
    return null; // Prevent rendering until navigation completes
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
        <h1>Failed to load type data. Please try again later.</h1>
      </div>
    );
  }

  return (
    <>
      <div className="d-flex justify-content-between align-items-center mt-4">
        <h1>Type List</h1>
        {user && user.role_id === 1 && (
          <Button
            variant="primary"
            onClick={() => navigate({ to: "/admin/type/create" })}
            className="d-flex align-items-center"
          >
            <FaPlus className="me-2" />
            Create New Type
          </Button>
        )}
      </div>

      {types.length === 0 ? (
        <h1 className="mt-4">Type data is not found!</h1>
      ) : (
        <Table striped bordered hover className="mt-4">
          <thead>
            <tr>
              <th>ID</th>
              <th>Type Name</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {types.map((type) => (
              <TypeItem type={type} key={type?.id} refetchData={refetch} />
            ))}
          </tbody>
        </Table>
      )}
    </>
  );
}

export default Type;
