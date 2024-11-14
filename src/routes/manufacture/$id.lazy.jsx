import { createLazyFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { getDetailManufacture } from "../../service/manufacture";

export const Route = createLazyFileRoute("/manufacture/$id")({
  component: ManufacturesDetail,
});

function ManufacturesDetail() {
  const { id } = Route.useParams();
  const navigate = useNavigate();

  const [manufacture, setManufacture] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isNotFound, setIsNotFound] = useState(false);

  useEffect(() => {
    const getDetailManufacturesData = async () => {
      if (!id) return;

      setIsLoading(true);
      try {
        const result = await getDetailManufacture(id);
        if (result.success && result.data) {
          setManufacture(result.data);
          setIsNotFound(false);
        } else {
          setIsNotFound(true);
        }
      } catch (error) {
        console.error("Error fetching manufacture details:", error);
        setIsNotFound(true);
      } finally {
        setIsLoading(false);
      }
    };
    getDetailManufacturesData();
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
              {manufacture.manufacture_name || "No name available"}
            </Card.Text>
            <Button
              variant="secondary"
              size="md"
              className="d-block mt-4 justcfl"
              onClick={() => navigate({ to: "/manufacture" })}
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
