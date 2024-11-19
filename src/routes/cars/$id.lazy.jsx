import { createLazyFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query"; // Import useQuery
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { toast } from "react-toastify";
import { confirmAlert } from "react-confirm-alert";
import { useSelector } from "react-redux";
import { getDetailCar, deleteCar } from "../../service/car";
import { FaTrash, FaEdit, FaClock, FaArrowLeft } from "react-icons/fa";

export const Route = createLazyFileRoute("/cars/$id")({
  component: CarDetail,
});

function CarDetail() {
  const navigate = useNavigate();
  const { id } = Route.useParams();
  const { user } = useSelector((state) => state.auth);

  // Use useQuery to fetch car details
  const {
    data: car,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["carDetail", id],
    queryFn: async () => {
      const result = await getDetailCar(id);
      if (!result) {
        throw new Error("Car details are undefined");
      }
      return result;
    },
    enabled: !!id, // Ensure the query runs only if `id` is defined
  });

  const onDelete = async (event) => {
    event.preventDefault();
    confirmAlert({
      title: "Confirm to delete",
      message: "Are you sure to delete this data?",
      buttons: [
        {
          label: "Yes",
          onClick: async () => {
            const result = await deleteCar(id);
            if (result?.success) {
              navigate({ to: "/cars" });
              return;
            }
            toast.error(result?.message);
          },
        },
        {
          label: "No",
          onClick: () => {},
        },
      ],
    });
  };

  if (isLoading) {
    return (
      <Row className="mt-5">
        <Col>
          <h1 className="text-center">Loading...</h1>
        </Col>
      </Row>
    );
  }

  if (isError || !car) {
    return (
      <Row className="mt-5">
        <Col>
          <h1 className="text-center">Car is not found!</h1>
        </Col>
      </Row>
    );
  }

  return (
    <>
      <Row className="mt-3 mb-3">
        <Col>
          <Button
            variant="outline-secondary"
            onClick={() => navigate({ to: "/cars" })}
            style={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <FaArrowLeft style={{ marginRight: "8px" }} /> Back
          </Button>
        </Col>
      </Row>
      <Row className="mt-5">
        <Col className="offset-md-4">
          <Card
            style={{
              border: "1px solid #E0E0E0",
              borderRadius: "8px",
              padding: "16px",
            }}
          >
            <Card.Img
              variant="top"
              src={car?.image}
              style={{ borderRadius: "8px", marginBottom: "16px" }}
            />
            <Card.Body>
              <Card.Text style={{ fontSize: "16px", fontWeight: "bold" }}>
                {car?.model?.model_name} / {car?.type?.type_option}
              </Card.Text>
              <Card.Text style={{ fontSize: "16px", fontWeight: "bold" }}>
                Plate: {car?.plate}
              </Card.Text>
              <Card.Text style={{ fontSize: "16px", fontWeight: "bold" }}>
                Year: {car?.year}
              </Card.Text>
              <Card.Text
                style={{ color: "green", fontSize: "20px", fontWeight: "bold" }}
              >
                Rent per day: Rp {car?.rentperday.toLocaleString("id-ID")}
              </Card.Text>
              <Card.Text style={{ fontSize: "16px", fontWeight: "bold" }}>
                Capacity: {car?.capacity}
              </Card.Text>
              <Card.Text style={{ fontSize: "16px", fontWeight: "bold" }}>
                Description: {car?.description}
              </Card.Text>
              <Card.Text style={{ fontSize: "14px", color: "#828282" }}>
                <FaClock /> Updated at{" "}
                {new Date(car?.availableat).toLocaleString("id-ID", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                  hour: "numeric",
                  minute: "numeric",
                })}
              </Card.Text>
              <Card.Text style={{ fontSize: "16px", fontWeight: "bold" }}>
                Manufacture: {car?.manufacture?.manufacture_name}
              </Card.Text>
              <Card.Text style={{ fontSize: "16px", fontWeight: "bold" }}>
                Model: {car?.model?.model_name}
              </Card.Text>
              <Card.Text style={{ fontSize: "16px", fontWeight: "bold" }}>
                Transmission: {car?.transmission?.transmission_name}
              </Card.Text>
              <Card.Text style={{ fontSize: "16px", fontWeight: "bold" }}>
                Type: {car?.type?.type_option}
              </Card.Text>
              <Card.Text style={{ fontSize: "16px", fontWeight: "bold" }}>
                Specs:
                <ul>
                  {car?.specs?.map((spec, index) => (
                    <li key={spec?.id || `spec-${index}`}>
                      {spec?.carspecs?.spec_name}
                    </li>
                  ))}
                </ul>
              </Card.Text>
              <Card.Text style={{ fontSize: "16px", fontWeight: "bold" }}>
                Options:
                <ul>
                  {car?.options?.map((option, index) => (
                    <li key={option?.id || `option-${index}`}>
                      {option?.caroptions?.option_name}
                    </li>
                  ))}
                </ul>
              </Card.Text>
              <Card.Text style={{ color: car?.available ? "green" : "red" }}>
                {car?.available ? "Tersedia" : "Tidak Tersedia"}
              </Card.Text>
              {user && user?.role_id === 1 && (
                <div className="d-flex justify-content-between mt-3">
                  <Button
                    onClick={onDelete}
                    variant="outline-danger"
                    style={{ display: "flex", alignItems: "center" }}
                  >
                    <FaTrash style={{ marginRight: "8px" }} /> Delete
                  </Button>
                  <Button
                    as={Link}
                    to={"/cars/edit/$id"}
                    variant="outline-primary"
                    style={{ display: "flex", alignItems: "center" }}
                  >
                    <FaEdit style={{ marginRight: "8px" }} /> Edit
                  </Button>
                </div>
              )}
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}></Col>
      </Row>
    </>
  );
}
