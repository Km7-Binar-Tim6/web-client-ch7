import { useState } from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const CariMobilMenu = ({ onSearch }) => {
  const [tanggal, setTanggal] = useState("");
  const [capacity, setCapacity] = useState(1);
  const [rentperday, setRentPerDay] = useState("");

  const { token } = useSelector((state) => state.auth); // Akses status login

  const isFormValid = tanggal && capacity > 0 && rentperday >= 0; // Validasi semua field

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!token) {
      // Tampilkan toast jika belum login
      toast.warning("Silahkan login terlebih dahulu!");
      return;
    }
    // Panggil fungsi onSearch jika login dan semua validasi terpenuhi
    onSearch({
      rentperday: rentperday ? Number(rentperday) : Infinity, // Harga maksimum
      capacity: capacity || 1, // Kapasitas default ke 1
      availableat: tanggal ? `${tanggal}T00:00:00` : new Date().toISOString(), // Default ke sekarang
    });
  };

  return (
    <div className="container position-relative d-flex justify-content-center mt-4">
      <div className="bg-white p-4 rounded shadow-lg w-100 mx-2 max-w-960">
        <form className="row g-3" onSubmit={handleSubmit}>
          <div className="col-md-4">
            <label htmlFor="capacity" className="form-label">
              Jumlah Penumpang
            </label>
            <input
              type="number"
              id="capacity"
              name="capacity"
              className="form-control"
              value={capacity}
              onChange={(e) => setCapacity(Number(e.target.value))}
              min={1}
            />
          </div>
          <div className="col-md-4">
            <label htmlFor="tanggal" className="form-label">
              Tanggal Jemput
            </label>
            <input
              type="date"
              id="tanggal"
              name="tanggal"
              className="form-control"
              value={tanggal}
              onChange={(e) => setTanggal(e.target.value)}
            />
          </div>
          <div className="col-md-4">
            <label htmlFor="rentperday" className="form-label">
              Harga Maks (Rent per Day)
            </label>
            <input
              type="number"
              id="rentperday"
              name="rentperday"
              className="form-control"
              value={rentperday}
              onChange={(e) => setRentPerDay(Number(e.target.value))}
              min={0} // Minimum harga sewa
            />
          </div>
          <div className="col-12 text-end">
            <button
              type="submit"
              className="btn btn-success px-4 py-2"
              disabled={!isFormValid} // Nonaktifkan jika form tidak valid
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
};

export default CariMobilMenu;
