import { createLazyFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { getDetailCarSpecs } from "../../../service/carspecs";

export const Route = createLazyFileRoute("/admin/carspecs/$id")({
  component: CarSpecsDetail,
});

function CarSpecsDetail() {
  const { id } = Route.useParams();
  const navigate = useNavigate();
  const [carSpecs, setCarSpecs] = useState(null);
  const [isNotFound, setIsNotFound] = useState(null);

  const { data, isSuccess, isPending } = useQuery({
    queryKey: ["carSpecs", id],
    queryFn: () => getDetailCarSpecs(id),
    enabled: !!id,
  });

  useEffect(() => {
    if (isSuccess) {
      setCarSpecs(data);
      setIsNotFound(false);
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

  if (isNotFound) {
    return (
      <Row className="mt-5">
        <Col>
          <h1 className="text-center">Car specs is not found!</h1>
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
              Car Specs Details
            </Card.Title>
            <Card.Text>
              <strong>ID:</strong> {id}
            </Card.Text>
            <Card.Text>
              <strong>Name:</strong>{" "}
              {carSpecs?.spec_name || "No name available"}
            </Card.Text>
            <Button
              variant="secondary"
              size="md"
              className="d-block mt-4 justcfl"
              onClick={() => navigate({ to: "/admin/carspecs" })}
            >
              Back to Car Specs List
            </Button>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
}
