import { useState } from "react";
import img1 from "../../assets/Ellipse 10.png";
import img2 from "../../assets/Ellipse 101.png";

const testimonials = [
  {
    id: 1,
    name: "John Dee",
    age: 32,
    location: "Bromo",
    feedback:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod.",
    image: img1,
  },
  {
    id: 2,
    name: "Jane Smith",
    age: 28,
    location: "Bromo",
    feedback:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod.",
    image: img2,
  },
  {
    id: 3,
    name: "Mike Johnson",
    age: 45,
    location: "Bromo",
    feedback:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod.",
    image: img1,
  },
];

export default function Testimonial() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="container my-5">
      <h2 className="text-center fw-bold mb-4">Testimonial</h2>
      <p className="text-center text-muted mb-5">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
      </p>

      <div className="d-flex align-items-center justify-content-center">
        <button
          onClick={handlePrev}
          className="btn btn-outline-secondary rounded-circle me-3"
        >
          ❮
        </button>

        <div
          className="card text-center bg-light border-0 shadow p-4"
          style={{ maxWidth: "400px" }}
        >
          <img
            className="card-img-top rounded-circle mx-auto mb-3"
            src={testimonials[currentIndex].image}
            alt={testimonials[currentIndex].name}
            style={{ width: "100px", height: "100px", objectFit: "cover" }}
          />
          <div className="card-body">
            <p className="card-text fst-italic">
              &ldquo;{testimonials[currentIndex].feedback}&rdquo;
            </p>
            <h5 className="card-title mt-3">
              {testimonials[currentIndex].name},{" "}
              {testimonials[currentIndex].age}
            </h5>
            <p className="text-muted small">
              {testimonials[currentIndex].location}
            </p>
          </div>
        </div>

        <button
          onClick={handleNext}
          className="btn btn-outline-secondary rounded-circle ms-3"
        >
          ❯
        </button>
      </div>
    </div>
  );
}
