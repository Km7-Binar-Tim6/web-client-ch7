import { createLazyFileRoute, useNavigate } from "@tanstack/react-router";
import { useSelector } from "react-redux";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Card from "react-bootstrap/Card";
import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import Button from "react-bootstrap/Button";
import { FaArrowLeft } from "react-icons/fa"; // Untuk icon yang mirip

import { profile } from "../service/auth"; // Assuming profile function is in src/service/auth

export const Route = createLazyFileRoute("/profile")({
  component: Profile,
});

function Profile() {
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.auth);

  // Use TanStack Query to fetch profile data
  const {
    data: user,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["profile"], // Unique key for caching
    queryFn: profile, // Function to fetch profile data
    enabled: !!token, // Only fetch if token is available
  });

  useEffect(() => {
    if (!token) {
      navigate({ to: "/login" });
    }
  }, [navigate, token]);

  if (!token) return null;

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError) {
    console.log("Error fetching profile");
    return <p>Failed to load profile. Please try again.</p>;
  }

  if (!user) {
    console.log("No user data available");
    return <p>No user data available</p>;
  }

  return (
    <Row className="mt-5">
      <Col className="offset-md-3">
        <Button
          variant="outline-secondary"
          onClick={() => navigate({ to: "/admin" })}
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "4px",
          }}
        >
          <FaArrowLeft style={{ marginRight: "8px" }} /> Back
        </Button>
        <Card>
          <Card.Img variant="top" src={user.data?.profile_picture} />
          <Card.Body>
            <Card.Title>{user.data?.name}</Card.Title>
            <Card.Text>{user.data?.email}</Card.Text>
          </Card.Body>
        </Card>
      </Col>
      <Col md={3}></Col>
    </Row>
  );
}
