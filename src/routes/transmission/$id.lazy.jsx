import { createLazyFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { getDetailTransmission } from "../../service/transmission";

export const Route = createLazyFileRoute("/transmission/$id")({
  component: TransmissionDetail,
});

function TransmissionDetail() {
  const { id } = Route.useParams();
  const navigate = useNavigate();

  const [transmission, setTransmission] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isNotFound, setIsNotFound] = useState(false);

  useEffect(() => {
    const getDetailTransmissionData = async () => {
      if (!id) return;

      setIsLoading(true);
      try {
        const result = await getDetailTransmission(id); 
        if (result.success && result.data) {
          setTransmission(result.data);
          setIsNotFound(false);
        } else {
          setIsNotFound(true);
        }
      } catch (error) {
        console.error("Error fetching transmission details:", error);
        setIsNotFound(true);
      } finally {
        setIsLoading(false);
      }
    };
    getDetailTransmissionData();
  }, [id]);

  if (isLoading) {
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
          <h1 className="text-center">Transmission not found!</h1>
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
              Transmission Details
            </Card.Title>
            <Card.Text>
              <strong>ID:</strong> {id}
            </Card.Text>
            <Card.Text>
              <strong>Name:</strong>{" "}
              {transmission.transmission_option || "No option available"}
            </Card.Text>
            <Button
              variant="secondary"
              size="md"
              className="d-block mt-4"
              onClick={() => navigate({ to: "/transmission" })}
            >
              Back to Transmission List
            </Button>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
}

export default TransmissionDetail;
