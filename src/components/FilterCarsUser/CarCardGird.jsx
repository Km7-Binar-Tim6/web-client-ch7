// src/components/filtercarsuser/carcardgrid

import PropTypes from "prop-types"; // Import PropTypes
import CarCard from "./CarsIndex";
import IconNoCars from "../../icons/IconNoCars";

const CarCardGrid = ({ filteredCars }) => {
  return (
    <div className="container py-4">
      {filteredCars.length === 0 ? (
        <div className="d-flex flex-column align-items-center justify-content-center text-center text-muted vh-100">
          <IconNoCars />
          <p className="mt-3">
            Tidak ada mobil yang cocok dengan pencarian Anda.
          </p>
        </div>
      ) : (
        <div className="row g-3 justify-content-center">
          {filteredCars.map((car) => (
            <div
              key={car.id}
              className="col-12 col-md-6 col-lg-4 d-flex justify-content-center"
            >
              <CarCard car={car} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// Add PropTypes validation
CarCardGrid.propTypes = {
  filteredCars: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      // Add other properties of car as required
    })
  ).isRequired,
};

export default CarCardGrid;
