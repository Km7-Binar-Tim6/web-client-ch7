import { IoCheckmarkCircleSharp } from "react-icons/io5";
import ServiceImg from "../../assets/img_service.png";

const Services = () => {
  return (
    <div className="pt-5 pb-5 bg-light">
      <div className="container">
        <div className="row align-items-center">
          {/* Image Section */}
          <div className="col-md-6 text-center mb-4 mb-md-0">
            <img
              src={ServiceImg}
              alt="Car Service"
              className="img-fluid"
              style={{ maxWidth: "400px" }}
            />
          </div>

          {/* Content Section */}
          <div className="col-md-6">
            <h2 className="h4 fw-bold mb-3">
              Best Car Rental for any kind of trip in (Lokasimu)!
            </h2>
            <p className="text-muted mb-4">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>

            <ul className="list-unstyled">
              <li className="d-flex align-items-center mb-2">
                <IoCheckmarkCircleSharp
                  className="text-success me-2"
                  size={24}
                />
                Sewa Mobil Dengan Supir di Bali 12 Jam
              </li>
              <li className="d-flex align-items-center mb-2">
                <IoCheckmarkCircleSharp
                  className="text-success me-2"
                  size={24}
                />
                Sewa Mobil Lepas Kunci di Bali 24 Jam
              </li>
              <li className="d-flex align-items-center mb-2">
                <IoCheckmarkCircleSharp
                  className="text-success me-2"
                  size={24}
                />
                Sewa Mobil Jangka Panjang Bulanan
              </li>
              <li className="d-flex align-items-center mb-2">
                <IoCheckmarkCircleSharp
                  className="text-success me-2"
                  size={24}
                />
                Gratis Antar - Jemput Mobil di Bandara
              </li>
              <li className="d-flex align-items-center mb-2">
                <IoCheckmarkCircleSharp
                  className="text-success me-2"
                  size={24}
                />
                Layanan Airport Transfer / Drop In Out
              </li>
              <li className="d-flex align-items-center mb-2">
                <IoCheckmarkCircleSharp
                  className="text-success me-2"
                  size={24}
                />
                Tersedia berbagai tipe model mobil
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;
