import { createLazyFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useQuery, useMutation } from "@tanstack/react-query";
import { getDetailModel, updateModel } from "../../../../service/model";
import ProtectedRoute from "../../../../redux/slices/ProtectedRoute.js";

export const Route = createLazyFileRoute("/admin/model/edit/$id")({
  component: () => (
    <ProtectedRoute allowedRoles={[1]}>
      <EditModel />
    </ProtectedRoute>
  ),
});

function EditModel() {
  const { id } = Route.useParams();
  const navigate = useNavigate();

  // TanStack Query to fetch model details
  const {
    data: model,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["model", id], // Cache the query based on model ID
    queryFn: () => getDetailModel(id), // Fetch model details function
    enabled: !!id, // Only fetch when ID is available
  });

  // Mutation for updating model
  const updateMutation = useMutation({
    mutationFn: (name) => updateModel(id, { model_name: name }), // Function to update model
    onSuccess: () => {
      navigate({ to: `/admin/model/${id}` }); // Redirect after success
    },
    onError: (error) => {
      alert(error?.message || "Failed to update model");
    },
  });

  const [name, setName] = useState("");

  // Set name from fetched data when the query is successful
  if (model && !name) {
    setName(model?.data?.model_name); // Set model name from fetched data
  }

  const onSubmit = async (event) => {
    event.preventDefault();
    updateMutation.mutate(name); // Trigger the mutation to update the model
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
          <h1>{error?.message || "Failed to load model details"}</h1>
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
                <Form.Label>Current Model Name</Form.Label>
                <Form.Control
                  type="text"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  placeholder="Enter new model name"
                  required
                />
              </Form.Group>

              <Button
                variant="primary"
                type="submit"
                className="w-100 mt-3"
                disabled={updateMutation.isLoading} // Disable button when mutation is in progress
              >
                {updateMutation.isLoading ? "Updating..." : "Update Model Name"}
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
}

export default EditModel;
