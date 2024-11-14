import { createLazyFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { createManufacture } from "../../service/manufacture";
import { toast } from "react-toastify";
import ProtectedRoute from "../../redux/slices/ProtectedRoute.js";
export const Route = createLazyFileRoute("/manufacture/create")({
  component: () => (
    <ProtectedRoute allowedRoles={[1]}>
      <CreateManufacture />
    </ProtectedRoute>
  ),
});

function CreateManufacture() {
  const navigate = useNavigate();

  const [name, setName] = useState("");

  const onSubmit = async (event) => {
    event.preventDefault();

    const request = {
      manufacture_name: name,
    };

    const result = await createManufacture(request);
    if (result?.success) {
      navigate({ to: "/manufacture" });
      return;
    }

    toast.error(result?.message || "Failed to create manufacture");
  };

  return (
    <Row className="justify-content-center">
      <Col md={6}>
        <Card>
          <Card.Body>
            <Card.Title>Create a new manufacture</Card.Title>
            <Form onSubmit={onSubmit}>
              <Form.Group className="mb-3" controlId="email">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  value={name}
                  placeholder="Enter new manufacture"
                  onChange={(event) => setName(event.target.value)}
                />
              </Form.Group>

              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
}
