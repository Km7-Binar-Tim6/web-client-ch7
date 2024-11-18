import { createLazyFileRoute, useNavigate } from "@tanstack/react-router";
import { useSelector } from "react-redux";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import { FaPlus } from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";
import { getType } from "../../../service/type";
import TypeItem from "../../../components/Type/TypeItem";

export const Route = createLazyFileRoute("/admin/type/")({
  component: Type,
});

function Type() {
  const navigate = useNavigate();
  const { token, user } = useSelector((state) => state.auth);

  // Use TanStack Query to fetch types
  const {
    data: types, // Default to empty array for initial render
    isLoading,
    isError,
    refetch, // Refetch function exposed by TanStack Query
  } = useQuery({
    queryKey: ["types"], // Unique key for caching
    queryFn: async () => {
      const result = await getType();
      if (result.success) {
        return result.data; // Return only the data on success
      }
      throw new Error("Failed to fetch types"); // Handle failure cases
    },
    enabled: !!token, // Prevent fetching if no token
  });

  // Redirect to login if the user is not authenticated
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
