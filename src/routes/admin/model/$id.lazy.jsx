import { createLazyFileRoute, useNavigate } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { getDetailModel } from "../../../service/model";
import ProtectedRoute from "../../../redux/slices/ProtectedRoute";
export const Route = createLazyFileRoute("/admin/model/$id")({
  component: () => (
    <ProtectedRoute allowedRoles={[1]}>
      <ModelDetail />
    </ProtectedRoute>
  ),
});

function ModelDetail() {
  const { id } = Route.useParams();
  const navigate = useNavigate();

  // TanStack Query to fetch model details based on id
  const {
    data: model,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["model", id], // Cache key based on model ID
    queryFn: () => getDetailModel(id), // Fetch model details
    enabled: !!id, // Only run query when id is available
  });

  if (isLoading) {
    return (
      <Row className="mt-5">
        <Col>
          <h1 className="text-center">Loading...</h1>
        </Col>
      </Row>
    );
  }

  if (isError) {
    return (
      <Row className="mt-5">
        <Col>
          <h1 className="text-center">
            {error?.message || "Error fetching model details"}
          </h1>
        </Col>
      </Row>
    );
  }

  if (!model) {
    return (
      <Row className="mt-5">
        <Col>
          <h1 className="text-center">Model not found!</h1>
        </Col>
      </Row>
    );
  }

  return (
    <Row className="mt-5">
      <Col md={{ span: 6, offset: 3 }}>
        <Card className="shadow-sm">
          <Card.Body>
            <Card.Title className="text-center mb-4">Model Details</Card.Title>
            <Card.Text>
              <strong>ID:</strong> {id}
            </Card.Text>
            <Card.Text>
              <strong>Name:</strong>{" "}
              {model?.data?.model_name || "No name available"}
            </Card.Text>
            <Button
              variant="secondary"
              size="md"
              className="d-block mt-4 justcfl"
              onClick={() => navigate({ to: "/admin/model" })}
            >
              Back to Model List
            </Button>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
}

export default ModelDetail;
