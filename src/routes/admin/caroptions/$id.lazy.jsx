import { createLazyFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { getDetailCarOption } from "../../../service/carOption";
import { useQuery } from "@tanstack/react-query";
import ProtectedRoute from "../../../redux/slices/ProtectedRoute";

export const Route = createLazyFileRoute("/admin/caroptions/$id")({
  component: () => (
    <ProtectedRoute allowedRoles={[1]}>
      <CarOptionDetail />
    </ProtectedRoute>
  ),
});

function CarOptionDetail() {
  const { id } = Route.useParams();
  const navigate = useNavigate();
  const [carOption, setCarOption] = useState(null);

  const { data, isSuccess, isPending, isError } = useQuery({
    queryKey: ["carOptions", id],
    queryFn: () => getDetailCarOption(id),
    enabled: !!id,
  });

  useEffect(() => {
    if (isSuccess) {
      setCarOption(data);
    }
  }, [data, isSuccess]);

  if (isPending) {
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
          <h1 className="text-center">Car option not found!</h1>
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
              Car Option Details
            </Card.Title>
            <Card.Text>
              <strong>ID:</strong> {id}
            </Card.Text>
            <Card.Text>
              <strong>Name:</strong>{" "}
              {carOption?.option_name || "No option available"}
            </Card.Text>
            <Button
              variant="secondary"
              size="md"
              className="d-block mt-4"
              onClick={() => navigate({ to: "/admin/caroptions" })}
            >
              Back to Car Option List
            </Button>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
}

export default CarOptionDetail;
