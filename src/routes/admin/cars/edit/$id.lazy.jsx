import { createLazyFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { getDetailCar, updateCar } from "../../../../service/car";
import { getManufacture } from "../../../../service/manufacture";
import { getCarOptions } from "../../../../service/carOption";
import { getCarSpecs } from "../../../../service/carspecs";
import { getTransmission } from "../../../../service/transmission";
import { getType } from "../../../../service/type";
import { getModel } from "../../../../service/model";
import { toast } from "react-toastify";
import { useQuery, useMutation } from "@tanstack/react-query";
import ProtectedRoute from "../../../../redux/slices/ProtectedRoute.js";

export const Route = createLazyFileRoute("/admin/cars/edit/$id")({
  component: () => (
    <ProtectedRoute allowedRoles={[1]}>
      <EditCar />
    </ProtectedRoute>
  ),
});

function EditCar() {
  const { id } = Route.useParams();
  const navigate = useNavigate();

  const [plate, setPlate] = useState("");
  const [rentPerDay, setRentPerDay] = useState("");
  const [capacity, setCapacity] = useState("");
  const [description, setDescription] = useState("");
  const [availableAt, setAvailableAt] = useState("");
  const [available, setAvailable] = useState("");
  const [year, setYear] = useState("");
  const [image, setImage] = useState(undefined);
  const [currentImage, setCurrentImage] = useState(undefined);

  const [manufactureId, setManufactureId] = useState(0);
  const [transmissionId, setTransmissionId] = useState(0);
  const [typeCarId, setTypeCarId] = useState(0); 
  const [modelId, setModelId] = useState(0);

  const [carOptionId, setCarOptionId] = useState([]);

  const [carSpecId, setCarSpecId] = useState([]);

  const { data: manufactures } = useQuery({
    queryKey: ["manufactures"],
    queryFn: () => getManufacture(),
    enabled: !!id,
  });

  const { data: transmissions } = useQuery({
    queryKey: ["transmissions"],
    queryFn: () => getTransmission(),
    enabled: !!id,
  });

  const { data: typeCars } = useQuery({
    queryKey: ["typeCars"],
    queryFn: () => getType(),
    enabled: !!id,
  });

  const { data: models } = useQuery({
    queryKey: ["models"],
    queryFn: () => getModel(),
    enabled: !!id,
  });

  const { data: carOptions } = useQuery({
    queryKey: ["carOptions"],
    queryFn: () => getCarOptions(),
    enabled: !!id,
  });

  const { data: carSpecs } = useQuery({
    queryKey: ["carSpecs"],
    queryFn: () => getCarSpecs(),
    enabled: !!id,
  });

  const { data: car, isSuccess, isPending, isError } = useQuery({
    queryKey: ["car", id],
    queryFn: () => getDetailCar(id),
    enabled: !!id,
  });

  const { mutate: updating, isPending: isUpdating } = useMutation({
    mutationFn: (request) => updateCar(id, request),
    onSuccess: () => {
      navigate({ to: `/admin/cars/${id}` });
    },
    onError: (error) => {
      toast.error(error?.message);
    },
  });

  useEffect(() => {
    if (isSuccess) {
      setPlate(car?.plate);
      setRentPerDay(car?.rentperday);
      setCapacity(car?.capacity);
      setDescription(car?.description);
      setAvailableAt(car?.availableat);
      setAvailable(car?.available);
      setYear(car?.year);
      setManufactureId(car?.manufacture_id);
      setTransmissionId(car?.transmission_id);
      setTypeCarId(car?.type_id);
      setModelId(car?.model_id);
      setCarOptionId(car?.option_id || []);
      setCarSpecId(car?.spec_id || []);
      setCurrentImage(car?.image);
    }
  }, [car, isSuccess]);

  if (isError) {
    navigate({ to: "/admin/cars" });
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
    updating(request);
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
                  {manufactures && manufactures?.length > 0 &&
                    manufactures?.map((manufacture) => (
                      <option key={manufacture?.id} value={manufacture?.id}>
                        {manufacture?.manufacture_name}
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
                  {transmissions && transmissions?.length > 0 &&
                    transmissions?.map((transmission) => (
                      <option key={transmission?.id} value={transmission?.id}>
                        {transmission?.transmission_option}
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
                  {typeCars && typeCars?.length > 0 &&
                    typeCars?.map((typeCar) => (
                      <option key={typeCar?.id} value={typeCar?.id}>
                        {typeCar?.type_option}
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
                  {models && models?.length > 0 &&
                    models?.map((model) => (
                      <option key={model?.id} value={model?.id}>
                        {model?.model_name}
                      </option>
                    ))}
                </Form.Control>
              </Form.Group>

              <Form.Group as={Row} className="mb-3" controlId="option_id">
                <Form.Label column sm={3}>
                  Option
                </Form.Label>
                <Col sm="9">
                  {carOptions && carOptions?.length > 0 &&
                    carOptions?.map((option) => (
                      <Form.Check
                        type="checkbox"
                      key={option?.id}
                      label={option?.option_name}
                      value={option?.id}
                      checked={carOptionId.includes(option?.id)}
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
                  {carSpecs && carSpecs?.length > 0 &&
                    carSpecs?.map((spec) => (
                      <Form.Check
                        type="checkbox"
                        key={spec?.id}
                        label={spec?.spec_name}
                        value={spec?.id}
                        checked={carSpecId.includes(spec?.id)}
                        onChange={handleCarSpecId}
                    />
                  ))}
                </Col>
              </Form.Group>

              <Button
                variant="primary"
                type="submit"
                className="mt-3"
                disabled={isUpdating}
              >
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
