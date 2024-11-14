import { createLazyFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import {
  getDetailManufacture,
  updateManufacture,
} from "../../../service/manufacture";
import ProtectedRoute from "../../../redux/slices/ProtectedRoute.js";

export const Route = createLazyFileRoute("/manufacture/edit/$id")({
  component: () => (
    <ProtectedRoute allowedRoles={[1]}>
      <EditManufacture />
    </ProtectedRoute>
  ),
});

function EditManufacture() {
  const { id } = Route.useParams();
  const navigate = useNavigate();

  const [name, setName] = useState(""); // To store the manufacture name
  const [isLoading, setIsLoading] = useState(true); // For loading state
  const [error, setError] = useState(null); // For handling errors

  useEffect(() => {
    const fetchManufacture = async () => {
      try {
        const result = await getDetailManufacture(id);
        if (result?.success && result.data) {
          setName(result.data.manufacture_name); // Set the correct field name (manufacture_name)
          setError(null); // Reset error if data is fetched successfully
        } else {
          setError("Failed to load manufacture details.");
        }
      } catch (error) {
        console.error("Error fetching manufacture details:", error);
        setError("An error occurred while fetching data.");
      } finally {
        setIsLoading(false); // End loading state
      }
    };

    if (id) {
      fetchManufacture();
    }
  }, [id]);

  const onSubmit = async (event) => {
    event.preventDefault();
    const request = { manufacture_name: name };

    const result = await updateManufacture(id, request);

    if (result?.success) {
      navigate({ to: `/manufacture/${id}` }); // Redirect to the manufacture detail page after update
    } else {
      alert(result?.message || "Failed to update manufacture");
    }
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

  if (error) {
    return (
      <Row className="mt-5">
        <Col className="text-center">
          <h1>{error}</h1>
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

              <Button variant="primary" type="submit" className="w-100 mt-3">
                Update Manufacture Name
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
}

export default EditManufacture;
