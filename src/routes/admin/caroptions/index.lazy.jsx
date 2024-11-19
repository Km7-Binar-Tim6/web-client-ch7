<<<<<<< HEAD
import { createLazyFileRoute, useNavigate } from '@tanstack/react-router';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/esm/Col';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import { FaPlus } from 'react-icons/fa';
import { getCarOptions } from '../../../service/carOption';
import CarOptionItem from '../../../components/CarOptions/CarOptionItem';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import ProtectedRoute from '../../../redux/slices/ProtectedRoute';
=======
import { createLazyFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import { FaPlus } from "react-icons/fa";
import { getCarOptions } from "../../../service/carOption";
import CarOptionItem from "../../../components/CarOptions/CarOptionItem";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import ProtectedRoute from "../../../redux/slices/ProtectedRoute";
>>>>>>> 3343cb09114fd2288303077b1d753db6a2610d41

export const Route = createLazyFileRoute("/admin/caroptions/")({
  component: () => (
    <ProtectedRoute allowedRoles={[1]}>
      <CarOption />
    </ProtectedRoute>
  ),
});

function CarOption() {
  const navigate = useNavigate();
  const { token, user } = useSelector((state) => state.auth);

  const [carOptions, setCarOptions] = useState([]);

  const queryClient = useQueryClient();

  const { data, isSuccess, isPending } = useQuery({
    queryKey: ["carOptions"],
    queryFn: getCarOptions,
    enabled: !!token,
  });

  const sortedCarOptions = data?.sort((a, b) => a.id - b.id);

  const refetchData = async () => {
    await queryClient.invalidateQueries({ queryKey: ["carOptions"] });
  };

  useEffect(() => {
    if (isSuccess) {
      setCarOptions(sortedCarOptions);
    }
  }, [data, isSuccess]);

  if (!token) {
    return (
      <Row className="mt-4">
        <Col>
          <h1 className="text-center">
            Please login first to get car options data!
          </h1>
        </Col>
      </Row>
    );
  }

  if (isPending) {
    return (
      <div className="mt-4">
        <h1>Loading...</h1>
      </div>
    );
  }

  return (
    <>
      <div className="d-flex justify-content-between align-items-center mt-4">
        <h1>Car Options List</h1>
        {user && user.role_id === 1 && (
          <Button
            variant="primary"
            onClick={() => navigate({ to: "/admin/caroptions/create" })}
            className="d-flex align-items-center"
          >
            <FaPlus className="me-2" />
            Create New Car Option
          </Button>
        )}
      </div>

      {carOptions.length === 0 ? (
        <h1 className="mt-4">Car option data is not found!</h1>
      ) : (
        <Table striped bordered hover className="mt-4">
          <thead>
            <tr>
              <th>ID</th>
              <th>Car Option Name</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {carOptions.map((carOption) => (
              <CarOptionItem
                carOption={carOption}
                key={carOption?.id}
                refetchData={refetchData}
              />
            ))}
          </tbody>
        </Table>
      )}
    </>
  );
}
