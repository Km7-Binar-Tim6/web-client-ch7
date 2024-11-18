import { createLazyFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { FaPlus } from "react-icons/fa";
import { getCars } from "../../../service/car";
import CarItem from "../../../components/Car/CarItem";
import { useQuery } from "@tanstack/react-query";

export const Route = createLazyFileRoute("/admin/cars/")({
  component: Index,
});

function Index() {
  const navigate = useNavigate();
  const { token, user } = useSelector((state) => state.auth);

  const [cars, setCars] = useState([]);

  const { data, isSuccess, isPending } = useQuery({
    queryKey: ["cars"],
    queryFn: () => getCars(),
    enabled: !!token,
  })

  useEffect(() => {
    if (isSuccess) {
      setCars(data);
    }
  }, [data, isSuccess]);

  if (!token) {
    return (
      <Row className="mt-4">
        <Col>
          <h1 className="text-center">
            Please login first to get student data!
          </h1>
        </Col>
      </Row>
    );
  }
  if (isPending) {
    return (
      <Row className="mt-4">
        <h1>Loading...</h1>
      </Row>
    );
  }

  return (
    <>
      <div className="d-flex justify-content-between align-items-center mt-4">
        <h1>Car List</h1>
        {user && user.role_id === 1 && (
          <Button
            variant="primary"
            onClick={() => navigate({ to: "/admin/cars/create" })}
            className="d-flex align-items-center"
          >
            <FaPlus className="me-2" />
            Create New Car
          </Button>
        )}
      </div>
      <Row className="mt-4">
        {cars.length === 0 ? (
          <h1>Car data is not found!</h1>
        ) : (
          cars.map((car) => <CarItem car={car} key={car?.id} />)
        )}
      </Row>
    </>
  );
}