import { useEffect, useState } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import PropTypes from "prop-types";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Image from "react-bootstrap/Image";
import Dropdown from "react-bootstrap/Dropdown";
import { useDispatch, useSelector } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import { setToken, setUser } from "../../redux/slices/auth";
import { profile } from "../../service/auth";
import { FaBars } from "react-icons/fa";
import ThemeToggle from "./ThemeToggle";

const NavigationBar = ({ setSidebarOpen }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.auth);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  // Fetch profile data using TanStack Query
  const {
    data: user,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["profile"],
    queryFn: profile,
    enabled: !!token, // Only fetch if token exists
    onSuccess: (data) => dispatch(setUser(data.data)),
    onError: () => {
      dispatch(setUser(null));
      dispatch(setToken(null));
      navigate({ to: "/login" });
    },
  });

  // Handle screen resizing
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const logout = (event) => {
    event.preventDefault();
    dispatch(setUser(null));
    dispatch(setToken(null));

    navigate({ to: "/" });
  };

  if (!token) return null;

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand className="d-flex align-items-center">
          <FaBars
            style={{ marginRight: "10px", cursor: "pointer" }}
            onClick={() => setSidebarOpen((prev) => !prev)}
          />
        </Navbar.Brand>
        <Nav className="me-auto"></Nav>
        <Nav className="d-flex align-items-center">
          {isLoading ? (
            <Nav.Link>Loading...</Nav.Link>
          ) : isError ? (
            <Nav.Link>Error fetching profile</Nav.Link>
          ) : user ? (
            <Dropdown align="end">
              <Dropdown.Toggle
                as="a"
                className="nav-link"
                style={{ cursor: "pointer" }}
              >
                <Image
                  src={user.data?.profile_picture}
                  fluid
                  style={{
                    marginRight: "10px",
                    width: "30px",
                    height: "30px",
                    borderRadius: "50%",
                  }}
                />
                {user.data?.name}
              </Dropdown.Toggle>
              <Dropdown.Menu>
                {isMobile && (
                  <Dropdown.Item as="div">
                    <ThemeToggle />
                  </Dropdown.Item>
                )}
                <Dropdown.Item as={Link} to="/profile">
                  My Profile
                </Dropdown.Item>
                <Dropdown.Item as={Link} to="/settings">
                  Settings
                </Dropdown.Item>
                <Dropdown.Item onClick={logout}>Logout</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          ) : (
            <>
              <Nav.Link as={Link} to="/login">
                Login
              </Nav.Link>
              <Nav.Link as={Link} to="/register">
                Register
              </Nav.Link>
            </>
          )}
          {!isMobile && <ThemeToggle />}
        </Nav>
      </Container>
    </Navbar>
  );
};

NavigationBar.propTypes = {
  setSidebarOpen: PropTypes.func.isRequired,
};

export default NavigationBar;
