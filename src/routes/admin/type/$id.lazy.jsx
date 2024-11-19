import { createLazyFileRoute, useNavigate } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { getDetailType } from "../../../service/type";
import ProtectedRoute from "../../../redux/slices/ProtectedRoute";
export const Route = createLazyFileRoute("/admin/type/$id")({
  component: () => (
    <ProtectedRoute allowedRoles={[1]}>
      <TypeDetail />
    </ProtectedRoute>
  ),
});

function TypeDetail() {
  const { id } = Route.useParams();
  const navigate = useNavigate();

  // Fetch type details using TanStack Query
  const {
    data: typeData,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["type", id], // Unique cache key for this query
    queryFn: () => getDetailType(id), // Fetch function
    enabled: !!id, // Only fetch if ID is available
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
            {error?.message || "Error fetching type details"}
          </h1>
        </Col>
      </Row>
    );
  }

  if (!typeData?.success || !typeData?.data) {
    return (
      <Row className="mt-5">
        <Col>
          <h1 className="text-center">Type not found!</h1>
        </Col>
      </Row>
    );
  }

  const type = typeData.data;

  return (
    <Row className="mt-5">
      <Col md={{ span: 6, offset: 3 }}>
        <Card className="shadow-sm">
          <Card.Body>
            <Card.Title className="text-center mb-4">Type Details</Card.Title>
            <Card.Text>
              <strong>ID:</strong> {id}
            </Card.Text>
            <Card.Text>
              <strong>Name:</strong> {type.type_option || "No name available"}
            </Card.Text>
            <Button
              variant="secondary"
              size="md"
              className="d-block mt-4 justcfl"
              onClick={() => navigate({ to: "/admin/type" })}
            >
              Back to Type List
            </Button>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
}

export default TypeDetail;
