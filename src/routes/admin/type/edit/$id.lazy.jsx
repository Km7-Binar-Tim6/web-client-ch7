import { createLazyFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useQuery, useMutation } from "@tanstack/react-query";
import { getDetailType, updateType } from "../../../../service/type";
import ProtectedRoute from "../../../../redux/slices/ProtectedRoute.js";

export const Route = createLazyFileRoute("/admin/type/edit/$id")({
  component: () => (
    <ProtectedRoute allowedRoles={[1]}>
      <EditType />
    </ProtectedRoute>
  ),
});

function EditType() {
  const { id } = Route.useParams();
  const navigate = useNavigate();

  // Fetch type details using useQuery
  const {
    data: type,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["type", id],
    queryFn: () => getDetailType(id),
    enabled: !!id,
  });

  // Mutation for updating the type
  const updateMutation = useMutation({
    mutationFn: (type_option) => updateType(id, { type_option }),
    onSuccess: () => {
      navigate({ to: `/admin/type/${id}` }); // Redirect on success
    },
    onError: (error) => {
      alert(error?.message || "Failed to update type");
    },
  });

  const [name, setName] = useState("");

  // Set the initial name when type data is available
  if (type && !name) {
    setName(type?.data?.type_option);
  }

  const onSubmit = async (event) => {
    event.preventDefault();
    updateMutation.mutate(name);
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
          <h1>{error?.message || "Failed to load type details"}</h1>
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
                <Form.Label>Current Type Name</Form.Label>
                <Form.Control
                  type="text"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  placeholder="Enter new type name"
                  required
                />
              </Form.Group>

              <Button
                variant="primary"
                type="submit"
                className="w-100 mt-3"
                disabled={updateMutation.isLoading}
              >
                {updateMutation.isLoading ? "Updating..." : "Update Type Name"}
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
}

export default EditType;
