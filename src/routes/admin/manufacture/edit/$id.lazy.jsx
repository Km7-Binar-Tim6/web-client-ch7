import { createLazyFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useQuery, useMutation } from "@tanstack/react-query";
import {
  getDetailManufacture,
  updateManufacture,
} from "../../../../service/manufacture";
import ProtectedRoute from "../../../../redux/slices/ProtectedRoute.js";

export const Route = createLazyFileRoute("/admin/manufacture/edit/$id")({
  component: () => (
    <ProtectedRoute allowedRoles={[1]}>
      <EditManufacture />
    </ProtectedRoute>
  ),
});

function EditManufacture() {
  const { id } = Route.useParams();
  const navigate = useNavigate();

  // TanStack Query to fetch manufacture details
  const {
    data: manufacture,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["manufacture", id], // Unique key for caching, including the ID
    queryFn: () => getDetailManufacture(id), // Function to fetch manufacture details
    enabled: !!id, // Only fetch if ID is available
  });

  // Mutation for updating manufacture
  const updateMutation = useMutation({
    mutationFn: (name) => updateManufacture(id, { manufacture_name: name }), // Function to update manufacture
    onSuccess: () => {
      navigate({ to: `/admin/manufacture/${id}` }); // Redirect after success
    },
    onError: (error) => {
      alert(error?.message || "Failed to update manufacture");
    },
  });

  const [name, setName] = useState("");

  // Set name from fetched data when the query is successful
  if (manufacture && !name) {
    setName(manufacture?.data?.manufacture_name);
  }

  const onSubmit = async (event) => {
    event.preventDefault();
    updateMutation.mutate(name); // Trigger the mutation
  };

  if (isLoading) {
    return (
      <Row className="mt-5">
        <Col className="text-center">
          <h1>Loading...</h1>
        </Col>
      </Row>
    );
  }

  if (isError) {
    return (
      <Row className="mt-5">
        <Col className="text-center">
          <h1>{error?.message || "Failed to load manufacture details"}</h1>
        </Col>
      </Row>
    );
  }

  return (
    <Row className="justify-content-center mt-4">
      <Col md={6}>
        <Card className="shadow-sm border-0">
          <Card.Body>
            <Form onSubmit={onSubmit}>
              <Form.Group className="mb-3" controlId="name">
                <Form.Label>Current Manufacture Name</Form.Label>
                <Form.Control
                  type="text"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  placeholder="Enter new manufacture name"
                  required
                />
              </Form.Group>

              <Button
                variant="primary"
                type="submit"
                className="w-100 mt-3"
                disabled={updateMutation.isLoading} // Disable button when mutation is in progress
              >
                {updateMutation.isLoading
                  ? "Updating..."
                  : "Update Manufacture Name"}
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
}

export default EditManufacture;
