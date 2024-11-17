import { useState } from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const CariMobilMenu = ({ onSearch }) => {
  const { token } = useSelector((state) => state.auth); // Akses status login

  const [filters, setFilters] = useState({
    rentperday: "",
    capacity: "",
    availableat: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!token) {
      toast.warning("Silahkan login terlebih dahulu!");
      return;
    }
    // Panggil fungsi onSearch dengan parameter filter
    onSearch(filters);
  };

  return (
    <div className="container position-relative d-flex justify-content-center mt-4">
      <div className="bg-white p-4 rounded shadow-lg w-100 mx-2 max-w-960">
        <form className="row g-3" onSubmit={handleSubmit}>
          <div className="col-md-4">
            <label htmlFor="rentperday" className="form-label">
              Rent per Day
            </label>
            <input
              type="number"
              className="form-control"
              id="rentperday"
              name="rentperday"
              value={filters.rentperday}
              onChange={handleChange}
              placeholder="Rent per Day"
            />
          </div>
          <div className="col-md-4">
            <label htmlFor="capacity" className="form-label">
              Capacity
            </label>
            <input
              type="number"
              className="form-control"
              id="capacity"
              name="capacity"
              value={filters.capacity}
              onChange={handleChange}
              placeholder="Capacity"
            />
          </div>
          <div className="col-md-4">
            <label htmlFor="availableat" className="form-label">
              Available At
            </label>
            <input
              type="date"
              className="form-control"
              id="availableat"
              name="availableat"
              value={filters.availableat}
              onChange={handleChange}
            />
          </div>
          <div className="col-12 text-end">
            <button type="submit" className="btn btn-success px-4 py-2">
              Cari Mobil
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Validasi props menggunakan PropTypes
CariMobilMenu.propTypes = {
  onSearch: PropTypes.func.isRequired,
};

export default CariMobilMenu;
