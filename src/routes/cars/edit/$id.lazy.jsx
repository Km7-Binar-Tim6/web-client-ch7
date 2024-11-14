import { createLazyFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";
import { getDetailCar, updateCar } from "../../../service/car";
import { getManufacture } from "../../../service/manufacture";
import { getCarOptions } from "../../../service/carOption";
import { getCarSpecs } from "../../../service/carspecs";
import { getTransmission } from "../../../service/transmission";
import { getType } from "../../../service/type";
import { getModel } from "../../../service/model";
import { toast } from "react-toastify";
import ProtectedRoute from "../../../redux/slices/ProtectedRoute.js";

export const Route = createLazyFileRoute("/cars/edit/$id")({
  component: () => (
    <ProtectedRoute allowedRoles={[1]}>
      <EditCar />
    </ProtectedRoute>
  ),
});

function EditCar() {
  const { id } = Route.useParams();
  const navigate = useNavigate();
  const [isNotFound, setIsNotFound] = useState(false);

  const [plate, setPlate] = useState("");
  const [rentPerDay, setRentPerDay] = useState("");
  const [capacity, setCapacity] = useState("");
  const [description, setDescription] = useState("");
  const [availableAt, setAvailableAt] = useState("");
  const [available, setAvailable] = useState("");
  const [year, setYear] = useState("");
  const [image, setImage] = useState(null);
  const [currentImage, setCurrentImage] = useState("");

  const [manufactureId, setManufactureId] = useState("");
  const [manufactures, setManufactures] = useState([]);

  const [carOptionId, setCarOptionId] = useState([]);
  const [carOptions, setCarOptions] = useState([]);

  const [carSpecId, setCarSpecId] = useState([]);
  const [carSpecs, setCarSpecs] = useState([]);

  const [transmissionId, setTransmissionId] = useState("");
  const [transmissions, setTransmissions] = useState([]);

  const [typeCarId, setTypeCarId] = useState("");
  const [typeCars, setTypeCars] = useState([]);

  const [modelId, setModelId] = useState("");
  const [models, setModels] = useState([]);

  useEffect(() => {
    const getManufacturesData = async () => {
      const result = await getManufacture();
      if (result?.success) {
        setManufactures(result?.data);
      }
    };
    const getCarOptionsData = async () => {
      const result = await getCarOptions();
      if (result?.success) {
        setCarOptions(result?.data);
      }
    };
    const getCarSpecsData = async () => {
      const result = await getCarSpecs();
      if (result?.success) {
        setCarSpecs(result?.data);
      }
    };
    const getTransmissionsData = async () => {
      const result = await getTransmission();
      if (result?.success) {
        setTransmissions(result?.data);
      }
    };
    const getTypeCarsData = async () => {
      const result = await getType();
      if (result?.success) {
        setTypeCars(result?.data);
      }
    };
    const getModelsData = async () => {
      const result = await getModel();
      if (result?.success) {
        setModels(result?.data);
      }
    };

    getManufacturesData();
    getCarOptionsData();
    getCarSpecsData();
    getTransmissionsData();
    getTypeCarsData();
    getModelsData();
  }, []);

  useEffect(() => {
    const getCarData = async (id) => {
      const result = await getDetailCar(id);
      if (result?.success) {
        setPlate(result?.data?.plate);
        setRentPerDay(result?.data?.rentperday);
        setCapacity(result?.data?.capacity);
        setDescription(result?.data?.description);
        setAvailableAt(result?.data?.availableat);
        setAvailable(result?.data?.available);
        setYear(result?.data?.year);
        setManufactureId(result?.data?.manufacture_id);
        setTransmissionId(result?.data?.transmission_id);
        setTypeCarId(result?.data?.type_id);
        setModelId(result?.data?.model_id);
        setCarOptionId(result?.data?.option_id || []);
        setCarSpecId(result?.data?.spec_id || []);
        setCurrentImage(result?.data?.image);
        setIsNotFound(false);
      } else {
        setIsNotFound(true);
        navigate({ to: "/cars" });
      }
    };
    if (id) {
      getCarData(id);
    }
  }, [id]);

  if (isNotFound) {
    navigate({ to: "/cars" });
    return;
  }

  const handleCarOptionId = (e) => {
    const optionId = parseInt(e.target.value, 10);
    setCarOptionId((prev) =>
      prev.includes(optionId)
        ? prev.filter((id) => id !== optionId)
        : [...prev, optionId]
    );
  };

  const handleCarSpecId = (e) => {
    const specId = parseInt(e.target.value, 10);
    setCarSpecId((prev) =>
      prev.includes(specId)
        ? prev.filter((id) => id !== specId)
        : [...prev, specId]
    );
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    const request = {
      plate,
      rentPerDay,
      capacity,
      description,
      availableAt,
      available,
      year,
      image,
      manufactureId,
      transmissionId,
      typeCarId,
      modelId,
      optionIds: carOptionId || [],
      specIds: carSpecId || [],
    };

    if (carOptionId.length < 2 || carSpecId.length < 2) {
      toast.error("Option and Spec are required minimum 2");
      return;
    }

    const result = await updateCar(id, request);
    if (result?.success) {
      navigate({ to: `/cars/${id}` });
      return;
    }
    toast.error(result.message);
  };

  return (
    <Row className="mt-3 justify-content-center">
      <Col md={6}>
        <Card>
          <Card.Header className="text-center">Create Car</Card.Header>
          <Card.Body>
            <Form onSubmit={onSubmit}>
              <Row>
                <Col md={6}>
                  <Form.Group controlId="plate">
                    <Form.Label>Plate</Form.Label>
                    <Form.Control
                      type="text"
                      value={plate}
                      onChange={(e) => setPlate(e.target.value)}
                      required
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group controlId="rentperday">
                    <Form.Label>Rent per Day (IDR)</Form.Label>
                    <Form.Control
                      type="number"
                      value={rentPerDay}
                      onChange={(e) => setRentPerDay(e.target.value)}
                      required
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Row>
                <Col md={6}>
                  <Form.Group controlId="capacity">
                    <Form.Label>Capacity</Form.Label>
                    <Form.Control
                      type="number"
                      value={capacity}
                      onChange={(e) => setCapacity(e.target.value)}
                      required
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group controlId="year">
                    <Form.Label>Year</Form.Label>
                    <Form.Control
                      type="number"
                      value={year}
                      onChange={(e) => setYear(e.target.value)}
                      required
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Form.Group controlId="description">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </Form.Group>

              <Form.Group controlId="availableat">
                <Form.Label>Available At</Form.Label>
                <Form.Control
                  type="datetime-local"
                  value={availableAt}
                  onChange={(e) => setAvailableAt(e.target.value)}
                  required
                />
              </Form.Group>

              <Form.Group controlId="available">
                <Form.Check
                  type="checkbox"
                  label="Available"
                  checked={available}
                  onChange={(e) => setAvailable(e.target.checked)}
                />
              </Form.Group>

              <Form.Group controlId="image">
                <Form.Label>Image URL</Form.Label>
                <img
                  src={currentImage}
                  alt="profile"
                  style={{
                    width: "100px",
                    height: "100px",
                    display: "block",
                    margin: "auto",
                  }}
                />
                <Form.Control
                  type="file"
                  onChange={(e) => {
                    setImage(e.target.files[0]);
                    setCurrentImage(URL.createObjectURL(e.target.files[0]));
                  }}
                  accept="image/*"
                />
              </Form.Group>

              <Form.Group controlId="manufactureid">
                <Form.Label>Manufacture</Form.Label>
                <Form.Control
                  as="select"
                  value={manufactureId}
                  onChange={(e) => setManufactureId(e.target.value)}
                  required
                >
                  <option value="">Select Manufacture</option>
                  {manufactures.length > 0 &&
                    manufactures.map((manufacture) => (
                      <option key={manufacture.id} value={manufacture.id}>
                        {manufacture.manufacture_name}
                      </option>
                    ))}
                </Form.Control>
              </Form.Group>

              <Form.Group controlId="transmissionid">
                <Form.Label>Transmission</Form.Label>
                <Form.Control
                  as="select"
                  value={transmissionId}
                  onChange={(e) => setTransmissionId(e.target.value)}
                  required
                >
                  <option value="">Select Car Option</option>
                  {transmissions.map((transmission) => (
                    <option key={transmission.id} value={transmission.id}>
                      {transmission.transmission_option}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>

              <Form.Group controlId="typecarid">
                <Form.Label>Type Car</Form.Label>
                <Form.Control
                  as="select"
                  value={typeCarId}
                  onChange={(e) => setTypeCarId(e.target.value)}
                  required
                >
                  <option value="">Select Type Car</option>
                  {typeCars.length > 0 &&
                    typeCars.map((typeCar) => (
                      <option key={typeCar.id} value={typeCar.id}>
                        {typeCar.type_option}
                      </option>
                    ))}
                </Form.Control>
              </Form.Group>

              <Form.Group controlId="modelid">
                <Form.Label>Model</Form.Label>
                <Form.Control
                  as="select"
                  value={modelId}
                  onChange={(e) => setModelId(e.target.value)}
                  required
                >
                  <option value="">Select Model</option>
                  {models.length > 0 &&
                    models.map((model) => (
                      <option key={model.id} value={model.id}>
                        {model.model_name}
                      </option>
                    ))}
                </Form.Control>
              </Form.Group>

              <Form.Group as={Row} className="mb-3" controlId="option_id">
                <Form.Label column sm={3}>
                  Option
                </Form.Label>
                <Col sm="9">
                  {carOptions.map((option) => (
                    <Form.Check
                      type="checkbox"
                      key={option.id}
                      label={option.option_name}
                      value={option.id}
                      checked={carOptionId.includes(option.id)}
                      onChange={handleCarOptionId}
                    />
                  ))}
                </Col>
              </Form.Group>

              <Form.Group as={Row} className="mb-3" controlId="spec_id">
                <Form.Label column sm={3}>
                  Spec
                </Form.Label>
                <Col sm="9">
                  {carSpecs.map((spec) => (
                    <Form.Check
                      type="checkbox"
                      key={spec.id}
                      label={spec.spec_name}
                      value={spec.id}
                      checked={carSpecId.includes(spec.id)}
                      onChange={handleCarSpecId}
                    />
                  ))}
                </Col>
              </Form.Group>

              <Button variant="primary" type="submit" className="mt-3">
                Edit Car
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
}

export default EditCar;
