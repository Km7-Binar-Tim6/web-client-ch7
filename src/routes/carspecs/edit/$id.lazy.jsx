import { createLazyFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { getDetailCarSpecs, updateCarSpecs } from "../../../service/carspecs";
import { toast } from "react-toastify";
import { FaArrowLeft } from "react-icons/fa";
export const Route = createLazyFileRoute('/carspecs/edit/$id')({
  component: CarSpecsEdit,
})

function CarSpecsEdit() {
  const {id} = Route.useParams();
  const navigate = useNavigate();

  const [specName, setSpecName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isNotFound, setIsNotFound] = useState(false);

  useEffect(() => {
    const getDetailCarSpecsData = async (id) => {
      setIsLoading(true);
      const result = await getDetailCarSpecs(id);
      if (result?.success) {
        setSpecName(result.data.spec_name);
        setIsNotFound(false);
      } else {
        setIsNotFound(true);
        navigate({to: "/carspecs"});
      }
      setIsLoading(false);
    }
    if (id) {
      getDetailCarSpecsData(id);
    }
  }, [id]);

  if (isNotFound) {
    navigate({to: "/carspecs"});
    return;
  }

  const onSubmit = async (event) => {
    event.preventDefault();
    const request = {
      spec_name: specName
    }
    const result = await updateCarSpecs(id, request);
    if (result?.success) {
      navigate({to: "/carspecs"});
      return;
    } 
    toast.error(result?.message);
  }

  return (
    <>
    <Row className="mt-3 mb-3">
        <Col>
            <Button
                variant="outline-secondary"
                onClick={() => navigate({ to: "/carspecs/$id" })}
                style={{
                    display: "flex",
                    alignItems: "center",
                }}
            >
                <FaArrowLeft style={{ marginRight: "8px" }} /> Back
            </Button>
        </Col>
    </Row>
      <Row className="mt-5">
        <Col className="offset-md-4">
          <Card style={{ border: "1px solid #E0E0E0", borderRadius: "8px", padding: "16px" }}>
          <Card.Body>
            <Form onSubmit={onSubmit}>
              <Form.Group className="mb-3">
                <Form.Label>Spec Name</Form.Label>
                <Form.Control 
                  type="text" 
                  value={specName} 
                  onChange={(event) => {
                    setSpecName(event.target.value);
                  }}
                />
              </Form.Group>
                <Button type="submit" variant="primary">Update</Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}></Col>
      </Row>
    </>
  );
}