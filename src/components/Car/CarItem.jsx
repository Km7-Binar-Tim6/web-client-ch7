import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import PropTypes from "prop-types";
import { Link } from "@tanstack/react-router";
import { useSelector } from "react-redux";
import { FaTrash, FaEdit, FaCalendarAlt, FaClock } from "react-icons/fa"; // Untuk icon yang mirip


const CarItem = ({ car }) => {
    const { user } = useSelector((state) => state.auth);
    return (
        <Col md={3}>
            <Card style={{ border: "1px solid #E0E0E0", borderRadius: "8px", padding: "16px" }}>
                <Card.Img variant="top" src={car?.image} style={{ borderRadius: "8px", marginBottom: "16px" }} />
                <Card.Body>
                    {/* Nama dan Tipe Mobil */}
                    <Card.Text style={{ fontSize: "16px", fontWeight: "bold" }}>
                        {car?.model?.model_name} / {car?.type?.type_option}
                    </Card.Text>
                    
                    {/* Harga Sewa per Hari */}
                    <Card.Text style={{ color: "green", fontSize: "20px", fontWeight: "bold" }}>
                        Rp {car?.rentperday.toLocaleString("id-ID")} / hari
                    </Card.Text>
                    
                    {/* Tanggal Mulai dan Selesai */}
                    <Card.Text style={{ fontSize: "14px", color: "#828282" }}>
                        <FaCalendarAlt /> Start rent - Finish rent
                    </Card.Text>
                    
                    {/* Waktu Update Terakhir */}
                    <Card.Text style={{ fontSize: "14px", color: "#828282" }}>
                        <FaClock /> Updated at {new Date(car?.availableat).toLocaleString("id-ID", {
                            day: "numeric", month: "short", year: "numeric", hour: "numeric", minute: "numeric"
                        })}
                    </Card.Text>
                    {/* Ketersediaan */}
                    <Card.Text style={{ color: car?.available ? "green" : "red" }}>
                        {car?.available ? "Tersedia" : "Tidak Tersedia"}
                    </Card.Text>

                    {user && user?.role_id === 1 && (
                        <>
                            {/* Tombol Delete dan Edit */}
                            <div className="d-flex justify-content-between mt-3">
                                <Button
                                    variant="outline-primary"
                                    as={Link}
                                    href={`/cars/${car?.id}`}
                                    style={{ display: "flex", alignItems: "center" }}
                                >
                                    Detail Car
                                </Button>
                            </div>
                        </>
                    )}
                </Card.Body>
            </Card>
        </Col>
    );
};

CarItem.propTypes = {
    car: PropTypes.object.isRequired
}

export default CarItem;
