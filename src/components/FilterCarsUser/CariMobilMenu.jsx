import { useState } from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const CariMobilMenu = ({ onSearch, onFilterChange }) => {
  const { token } = useSelector((state) => state.auth); // Akses status login
  const [rentperday, setRentperday] = useState(""); // Filter harga sewa
  const [capacity, setCapacity] = useState(""); // Filter kapasitas

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!token) {
      // Tampilkan toast jika belum login
      toast.warning("Silahkan login terlebih dahulu!");
      return;
    }
    // Kirim nilai filter ke parent
    onFilterChange({ rentperday, capacity });
    // Panggil fungsi search
    onSearch();
  };

  // Handler untuk memastikan nilai tidak kurang dari 1
  const handleRentperdayChange = (e) => {
    const value = Number(e.target.value);
    setRentperday(value >= 1 ? value : 1); // Minimal 1
  };

  const handleCapacityChange = (e) => {
    const value = Number(e.target.value);
    setCapacity(value >= 1 ? value : 1); // Minimal 1
  };

  // Validasi untuk tombol disable
  const isButtonDisabled = rentperday === "" || capacity === "";

  return (
    <div className="container position-relative d-flex justify-content-center mt-4">
      <div className="bg-white p-4 rounded shadow-lg w-100 mx-2 max-w-960">
        <form className="row g-3" onSubmit={handleSubmit}>
          <div className="col-md-6">
            <label htmlFor="rentperday" className="form-label">
              Harga Sewa per Hari
            </label>
            <input
              type="number"
              className="form-control"
              id="rentperday"
              value={rentperday}
              placeholder="Masukkan harga sewa minimal"
              min="1" // Set nilai minimum pada input
              onChange={handleRentperdayChange}
            />
          </div>
          <div className="col-md-6">
            <label htmlFor="capacity" className="form-label">
              Kapasitas Penumpang
            </label>
            <input
              type="number"
              className="form-control"
              id="capacity"
              value={capacity}
              placeholder="Masukkan kapasitas minimal"
              min="1" // Set nilai minimum pada input
              onChange={handleCapacityChange}
            />
          </div>
          <div className="col-12 text-end">
            <button
              type="submit"
              className="btn btn-success px-4 py-2"
              disabled={isButtonDisabled} // Tombol disable berdasarkan validasi
            >
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
  onFilterChange: PropTypes.func.isRequired, // Tambahkan prop untuk handle perubahan filter
};

export default CariMobilMenu;
