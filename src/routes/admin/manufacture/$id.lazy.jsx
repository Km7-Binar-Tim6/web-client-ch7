import { createLazyFileRoute, useNavigate } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query"; // Import useQuery from TanStack Query
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { getDetailManufacture } from "../../../service/manufacture";

export const Route = createLazyFileRoute("/admin/manufacture/$id")({
  component: ManufacturesDetail,
});

function ManufacturesDetail() {
  const { id } = Route.useParams();
  const navigate = useNavigate();

  // Use TanStack Query to fetch manufacture data
  const {
    data: manufacture,
    isLoading,
    isError,
    isSuccess,
  } = useQuery({
    queryKey: ["manufacture", id], // Key should include the id to cache it correctly
    queryFn: () => getDetailManufacture(id), // Fetch data with the id
    enabled: !!id, // Only fetch if id is available
  });

  // If loading, show loading state
  if (isLoading) {
    return (
      <Row className="mt-5">
        <Col>
          <h1 className="text-center">Loading...</h1>
        </Col>
      </Row>
    );
  }

  // If the request has failed
  if (isError) {
    return (
      <Row className="mt-5">
        <Col>
          <h1 className="text-center">Error fetching manufacture details!</h1>
        </Col>
      </Row>
    );
  }

  // If the manufacture is not found
  if (!isSuccess || !manufacture?.data) {
    return (
      <Row className="mt-5">
        <Col>
          <h1 className="text-center">Manufacture not found!</h1>
        </Col>
      </Row>
    );
  }

  return (
    <Row className="mt-5">
      <Col md={{ span: 6, offset: 3 }}>
        <Card className="shadow-sm">
          <Card.Body>
            <Card.Title className="text-center mb-4">
              Manufacture Details
            </Card.Title>
            <Card.Text>
              <strong>ID:</strong> {id}
            </Card.Text>
            <Card.Text>
              <strong>Name:</strong>{" "}
              {manufacture?.data?.manufacture_name || "No name available"}
            </Card.Text>
            <Button
              variant="secondary"
              size="md"
              className="d-block mt-4"
              onClick={() => navigate({ to: "/admin/manufacture" })}
            >
              Back to Manufacture List
            </Button>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
}

export default ManufacturesDetail;
