import carImage from "../../assets/img_car.png";

const HeroCariMobil = () => {
  return (
    <section className="bg-light py-5">
      <div className="container min-vh-50 d-flex flex-column flex-md-row align-items-center justify-content-between">
        {/* Text Section */}
        <div className="col-md-6 mb-4">
          <h1 className="display-4 fw-bold text-dark mb-3">
            Sewa & Rental Mobil Terbaik di kawasan{" "}
            <span className="text-dark">(Lokasimu)</span>
          </h1>
          <p className="text-secondary">
            Selamat datang di Binar Car Rental. Kami menyediakan mobil kualitas
            terbaik dengan harga terjangkau. Selalu siap melayani kebutuhanmu
            untuk sewa mobil selama 24 jam.
          </p>
        </div>

        {/* Image Section */}
        <div className="col-md-6 text-center">
          <img
            src={carImage}
            alt="Car"
            className="img-fluid"
            style={{ maxHeight: "400px" }}
          />
        </div>
      </div>
    </section>
  );
};

export default HeroCariMobil;
