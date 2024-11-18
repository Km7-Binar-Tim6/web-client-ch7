import { createLazyFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useMutation } from "@tanstack/react-query";
import { createModel } from "../../../service/model";
import { toast } from "react-toastify";
import ProtectedRoute from "../../../redux/slices/ProtectedRoute.js";

export const Route = createLazyFileRoute("/admin/model/create")({
  component: () => (
    <ProtectedRoute allowedRoles={[1]}>
      <CreateModel />
    </ProtectedRoute>
  ),
});

function CreateModel() {
  const navigate = useNavigate();
  const [name, setName] = useState("");

  // Using useMutation to handle the createModel API call
  const mutation = useMutation({
    mutationFn: (newModel) => createModel(newModel), // The function that will call the API
    onSuccess: () => {
      toast.success("Model created successfully");
      navigate({ to: "/admin/model" }); // Navigate after successful creation
    },
    onError: (error) => {
      toast.error(error?.message || "Failed to create model");
    },
  });

  const onSubmit = async (event) => {
    event.preventDefault();

    const request = {
      model_name: name,
    };

    // Trigger the mutation
    mutation.mutate(request);
  };

  return (
    <Row className="justify-content-center">
      <Col md={6}>
        <Card>
          <Card.Body>
            <Card.Title>Create a new model</Card.Title>
            <Form onSubmit={onSubmit}>
              <Form.Group className="mb-3" controlId="email">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  value={name}
                  placeholder="Enter new model"
                  onChange={(event) => setName(event.target.value)}
                />
              </Form.Group>

              <Button
                variant="primary"
                type="submit"
                disabled={mutation.isLoading} // Disable submit button while creating
              >
                {mutation.isLoading ? "Submitting..." : "Submit"}
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
}

export default CreateModel;
