import { createLazyFileRoute, useNavigate } from "@tanstack/react-router";
import { useSelector } from "react-redux";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import { FaPlus } from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";
import { getModel } from "../../../service/model";
import ModelItem from "../../../components/Model/ModelItem";
import { useEffect } from "react";
import ProtectedRoute from "../../../redux/slices/ProtectedRoute";
export const Route = createLazyFileRoute("/admin/model/")({
  component: () => (
    <ProtectedRoute allowedRoles={[1]}>
      <Model />
    </ProtectedRoute>
  ),
});

function Model() {
  const navigate = useNavigate();
  const { token, user } = useSelector((state) => state.auth);

  // Fetch models using TanStack Query
  const {
    data: models, // Default to an empty array to prevent undefined errors
    isLoading,
    isError,
    refetch, // Expose refetch to manually refresh data
  } = useQuery({
    queryKey: ["models"], // Unique key for caching
    queryFn: async () => {
      const result = await getModel();
      if (result.success) {
        return result.data; // Return only the relevant data
      }
      throw new Error("Failed to fetch models data");
    },
    enabled: !!token, // Enable fetching only if the token exists
  });

  // Redirect to login if no token
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
        <h1>Failed to load model data. Please try again later.</h1>
      </div>
    );
  }

  return (
    <>
      <div className="d-flex justify-content-between align-items-center mt-4">
        <h1>Model List</h1>
        {user && user.role_id === 1 && (
          <Button
            variant="primary"
            onClick={() => navigate({ to: "/admin/model/create" })}
            className="d-flex align-items-center"
          >
            <FaPlus className="me-2" />
            Create New Model
          </Button>
        )}
      </div>

      {models.length === 0 ? (
        <h1 className="mt-4">Model data is not found!</h1>
      ) : (
        <Table striped bordered hover className="mt-4">
          <thead>
            <tr>
              <th>ID</th>
              <th>Model Name</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {models.map((model) => (
              <ModelItem
                model={model}
                key={model?.id}
                refetchData={refetch} // Pass refetch to manually refresh data
              />
            ))}
          </tbody>
        </Table>
      )}
    </>
  );
}

export default Model;
