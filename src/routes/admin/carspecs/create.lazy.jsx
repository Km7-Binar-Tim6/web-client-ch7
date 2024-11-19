import { createLazyFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { toast } from "react-toastify";
import { createCarSpecs } from "../../../service/carspecs";
import { useMutation } from "@tanstack/react-query";

export const Route = createLazyFileRoute("/admin/carspecs/create")({
  component: CreateCarSpecs,
});

function CreateCarSpecs() {
  const navigate = useNavigate();

  const [specName, setSpecName] = useState("");

  const { mutate: create, isPending } = useMutation({
    mutationFn: (data) => {
      return createCarSpecs(data);
    },
    onSuccess: () => {
      navigate({ to: "/admin/carspecs" });
    },
    onError: (error) => {
      toast.error(error?.message);
    },
  });

  const onSubmit = async (event) => {
    event.preventDefault();
    const request = {
      spec_name: specName,
    };
    if (!specName) {
      toast.error("Spec name is required");
      return;
    }
    create(request);
  };

  return (
    <Row className="mt-5">
      <Col className="offset-md-3">
        <Card>
          <Card.Header className="text-center">
            Create Specification
          </Card.Header>
          <Card.Body>
            <Form onSubmit={onSubmit}>
              <Form.Group as={Row} className="mb-3" controlId="specName">
                <Form.Label column sm={3}>
                  Specification Name
                </Form.Label>
                <Col sm="9">
                  <Form.Control
                    type="text"
                    placeholder="Specification Name"
                    value={specName}
                    onChange={(event) => {
                      setSpecName(event.target.value);
                    }}
                  />
                </Col>
              </Form.Group>
              <Form.Group
                as={Row}
                className="mb-3"
                controlId="carSpecs"
              ></Form.Group>
              <div className="d-grid gap-2">
                <Button type="submit" variant="primary">
                  Create Specification
                </Button>
              </div>
            </Form>
          </Card.Body>
        </Card>
      </Col>
      <Col md={3}></Col>
    </Row>
  );
}
