import { useNavigate } from "@tanstack/react-router"; // Impor useNavigate

const PesanMobil = () => {
  const navigate = useNavigate(); // Hook untuk navigasi

  const handleClick = () => {
    navigate({ to: "/cars" }); // Navigasi ke halaman Carimobil
  };

  return (
    <section className="py-5 bg-light">
      <div className="container">
        {/* Sewa Mobil Section */}
        <div className="bg-primary text-white text-center rounded p-5">
          <h2 className="h3 fw-bold mb-4">Sewa Mobil di (Lokasimu) Sekarang</h2>
          <p className="mb-4">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
          <button
            onClick={handleClick}
            className="btn btn-success btn-lg px-4 py-3"
          >
            Mulai Sewa Mobil
          </button>
        </div>
      </div>
    </section>
  );
};

export default PesanMobil;
