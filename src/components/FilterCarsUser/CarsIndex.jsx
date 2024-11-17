import { useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { useSelector } from "react-redux";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import { FaPlus } from "react-icons/fa";
import CarItem from "../../components/FilterCarsUser/CarItem";
import PropTypes from "prop-types"; // Import PropTypes

function CarsIndex({ cars }) {
  // Add cars as a prop
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const [isLoading] = useState(false);

  if (isLoading) {
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
            onClick={() => navigate({ to: "/cars/create" })}
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

// Prop validation for cars
CarsIndex.propTypes = {
  cars: PropTypes.array.isRequired,
};

export default CarsIndex;
