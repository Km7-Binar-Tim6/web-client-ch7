import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookF,
  faTwitter,
  faInstagram,
  faLinkedinIn,
} from "@fortawesome/free-brands-svg-icons";
import BinarLogo from "../../assets/binar.svg";

export default function Footer() {
  return (
    <footer className="bg-light pt-5 pb-4">
      <div className="container">
        <div className="row">
          {/* Contact Information */}
          <div className="col-md-3 mb-4">
            <p className="text-muted mb-2">
              Jalan Suroyo No. 161 Mayangan Kota Probolonggo 672000
            </p>
            <p className="text-muted mb-2">binarcarrental@gmail.com</p>
            <p className="text-muted">081-233-334-808</p>
          </div>

          {/* Navigation Links */}
          <div className="col-md-3 mb-4">
            <h5 className="text-dark mb-3">Navigation</h5>
            <ul className="list-unstyled">
              <li>
                <a href="#" className="text-muted text-decoration-none">
                  Our Services
                </a>
              </li>
              <li>
                <a href="#" className="text-muted text-decoration-none">
                  Why Us
                </a>
              </li>
              <li>
                <a href="#" className="text-muted text-decoration-none">
                  Testimonial
                </a>
              </li>
              <li>
                <a href="#" className="text-muted text-decoration-none">
                  FAQ
                </a>
              </li>
            </ul>
          </div>

          {/* Social Media Icons */}
          <div className="col-md-3 mb-4">
            <h5 className="text-dark mb-3">Connect with Us</h5>
            <div className="d-flex gap-3">
              <FontAwesomeIcon
                icon={faFacebookF}
                className="text-muted fs-5 cursor-pointer"
              />
              <FontAwesomeIcon
                icon={faTwitter}
                className="text-muted fs-5 cursor-pointer"
              />
              <FontAwesomeIcon
                icon={faInstagram}
                className="text-muted fs-5 cursor-pointer"
              />
              <FontAwesomeIcon
                icon={faLinkedinIn}
                className="text-muted fs-5 cursor-pointer"
              />
            </div>
          </div>

          {/* Copyright and Logo */}
          <div className="col-md-3 mb-4 text-start">
            <p className="text-muted mb-3">Copyright Binar 2022</p>
            <img
              src={BinarLogo}
              alt="Binar Logo"
              className="img-fluid"
              style={{ width: "75px", height: "auto" }}
            />
          </div>
        </div>
      </div>
    </footer>
  );
}
