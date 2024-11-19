import { createLazyFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useMutation } from "@tanstack/react-query";
import { createType } from "../../../service/type";
import { toast } from "react-toastify";
import ProtectedRoute from "../../../redux/slices/ProtectedRoute.js";

export const Route = createLazyFileRoute("/admin/type/create")({
  component: () => (
    <ProtectedRoute allowedRoles={[1]}>
      <CreateType />
    </ProtectedRoute>
  ),
});

function CreateType() {
  const navigate = useNavigate();
  const [name, setName] = useState("");

  // UseMutation to handle type creation
  const { mutate, isLoading } = useMutation({
    mutationFn: async (newType) => {
      const result = await createType(newType);
      if (!result?.success) {
        throw new Error(result?.message || "Failed to create type");
      }
      return result;
    },
    onSuccess: () => {
      toast.success("Type created successfully");
      navigate({ to: "/admin/type" });
    },
    onError: (error) => {
      toast.error(error.message || "An error occurred while creating type");
    },
  });

  const onSubmit = (event) => {
    event.preventDefault();
    mutate({ type_option: name }); // Trigger mutation with the form data
  };

  return (
    <Row className="justify-content-center">
      <Col md={6}>
        <Card>
          <Card.Body>
            <Card.Title>Create a new Type</Card.Title>
            <Form onSubmit={onSubmit}>
              <Form.Group className="mb-3" controlId="typeName">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  value={name}
                  placeholder="Enter new type"
                  onChange={(event) => setName(event.target.value)}
                  disabled={isLoading}
                />
              </Form.Group>

              <Button variant="primary" type="submit" disabled={isLoading}>
                {isLoading ? "Submitting..." : "Submit"}
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
}

export default CreateType;
