import { createLazyFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { createManufacture } from "../../../service/manufacture";
import { toast } from "react-toastify";
import ProtectedRoute from "../../../redux/slices/ProtectedRoute.js";
import { useMutation } from "@tanstack/react-query";

export const Route = createLazyFileRoute("/admin/manufacture/create")({
  component: () => (
    <ProtectedRoute allowedRoles={[1]}>
      <CreateManufacture />
    </ProtectedRoute>
  ),
});

function CreateManufacture() {
  const navigate = useNavigate();
  const [name, setName] = useState("");

  // Using useMutation to handle creation
  const mutation = useMutation({
    mutationFn: createManufacture,
    onSuccess: (data) => {
      if (data?.success) {
        toast.success("Manufacture created successfully");
        navigate({ to: "/admin/manufacture" });
      } else {
        toast.error(data?.message || "Failed to create manufacture");
      }
    },
    onError: (error) => {
      toast.error(
        error?.message || "An error occurred while creating the manufacture"
      );
    },
  });

  const onSubmit = (event) => {
    event.preventDefault();

    // Use mutation to handle the API request
    mutation.mutate({ manufacture_name: name });
  };

  return (
    <Row className="justify-content-center">
      <Col md={6}>
        <Card>
          <Card.Body>
            <Card.Title>Create a new manufacture</Card.Title>
            <Form onSubmit={onSubmit}>
              <Form.Group className="mb-3" controlId="name">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  value={name}
                  placeholder="Enter new manufacture"
                  onChange={(event) => setName(event.target.value)}
                />
              </Form.Group>

              <Button
                variant="primary"
                type="submit"
                disabled={mutation.isLoading}
              >
                {mutation.isLoading ? "Creating..." : "Submit"}
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
}
