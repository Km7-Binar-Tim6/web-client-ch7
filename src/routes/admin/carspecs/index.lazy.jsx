import { createLazyFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import CarSpecsItem from "../../../components/CarSpecs/CarSpecsitem";
import { getCarSpecs } from "../../../service/carspecs";
import { FaPlus } from "react-icons/fa";
import { useQuery, useQueryClient } from "@tanstack/react-query";

export const Route = createLazyFileRoute("/admin/carspecs/")({
  component: Index,
});

function Index() {
  const navigate = useNavigate();
  const { token, user } = useSelector((state) => state.auth);

  const [carSpecs, setCarSpecs] = useState([]);

  const queryClient = useQueryClient();

  const { data, isSuccess, isPending } = useQuery({
    queryKey: ["carSpecs"],
    queryFn: () => getCarSpecs(),
    enabled: !!token,
  });

  const sortedCarSpecs = data?.sort((a, b) => a.id - b.id);

  const refetchData = async () => {
    await queryClient.invalidateQueries({ queryKey: ["carSpecs"] });
  }

  useEffect(() => {
    if (isSuccess) {
      setCarSpecs(sortedCarSpecs);
    }
  }, [data, isSuccess]);


  if (!token) {
    return (
      <Row className="mt-4">
        <Col>
          <h1 className="text-center">
            Please login first to get specification data!
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
        <h1>Car Specs List</h1>
        {user && user.role_id === 1 && (
          <Button
            variant="primary"
            onClick={() => navigate({ to: "/admin/carspecs/create" })}
            className="d-flex align-items-center"
          >
            <FaPlus className="me-2" />
            Create New Car Specs
          </Button>
        )}
      </div>

      {carSpecs.length === 0 ? (
        <h1 className="mt-4">Car specs data is not found!</h1>
      ) : (
        <Table striped bordered hover className="mt-4">
          <thead>
            <tr>
              <th >ID</th> 
              <th>Spec Name</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {carSpecs.map((carSpecs) => (
              <CarSpecsItem
                carSpecs={carSpecs}
                key={carSpecs?.id}
                refetchData={refetchData} // Pass refetchData to each ManufactureItem
              />
            ))}
          </tbody>
        </Table>
      )}
    </>
  );
}
