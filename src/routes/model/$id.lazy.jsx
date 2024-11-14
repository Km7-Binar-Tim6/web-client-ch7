import { createLazyFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { getDetailModel } from "../../service/model";

export const Route = createLazyFileRoute("/model/$id")({
  component: ModelDetail,
});

function ModelDetail() {
  const { id } = Route.useParams();
  const navigate = useNavigate();

  const [model, setModel] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isNotFound, setIsNotFound] = useState(false);

  useEffect(() => {
    const getDetailModelData = async () => {
      if (!id) return;

      setIsLoading(true);
      try {
        const result = await getDetailModel(id);
        if (result.success && result.data) {
          setModel(result.data);
          setIsNotFound(false);
        } else {
          setIsNotFound(true);
        }
      } catch (error) {
        console.error("Error fetching model details:", error);
        setIsNotFound(true);
      } finally {
        setIsLoading(false);
      }
    };
    getDetailModelData();
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
              <strong>Name:</strong> {model.model_name || "No name available"}
            </Card.Text>
            <Button
              variant="secondary"
              size="md"
              className="d-block mt-4 justcfl"
              onClick={() => navigate({ to: "/model" })}
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
