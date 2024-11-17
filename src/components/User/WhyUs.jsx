import { GoThumbsup } from "react-icons/go";
import { GoTag } from "react-icons/go";
import { PiMedalLight } from "react-icons/pi";
import { FaRegClock } from "react-icons/fa";

const WhyUs = () => {
  const services = [
    {
      title: "Mobil Lengkap",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod",
      icon: <GoThumbsup className="text-white fs-2" />,
      bgColor: "bg-primary",
    },
    {
      title: "Harga Murah",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod",
      icon: <GoTag className="text-white fs-2" />,
      bgColor: "bg-success",
    },
    {
      title: "Layanan 24 Jam",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod",
      icon: <FaRegClock className="text-white fs-2" />,
      bgColor: "bg-danger",
    },
    {
      title: "Sopir Profesional",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod",
      icon: <PiMedalLight className="text-white fs-2" />,
      bgColor: "bg-warning",
    },
  ];

  return (
    <section className="py-5 bg-light">
      <div className="container">
        {/* Heading Section */}
        <div className="text-center mb-4">
          <h2 className="fw-bold">Why Us?</h2>
          <p className="text-muted">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod
          </p>
        </div>

        {/* Card Section */}
        <div className="row g-4">
          {services.map((service, index) => (
            <div className="col-md-6 col-lg-3" key={index}>
              <div className="card border-0 shadow-sm h-100">
                <div
                  className={`d-flex align-items-center justify-content-center ${service.bgColor} rounded-circle mx-auto mt-3`}
                  style={{ width: "60px", height: "60px" }}
                >
                  {service.icon}
                </div>
                <div className="card-body text-center">
                  <h5 className="card-title fw-bold">{service.title}</h5>
                  <p className="card-text text-muted">{service.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyUs;
