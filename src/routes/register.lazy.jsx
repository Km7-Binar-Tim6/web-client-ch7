import { createLazyFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { useSelector, useDispatch } from "react-redux";
import { useMutation } from "@tanstack/react-query";
import { register } from "../service/auth";
import { toast } from "react-toastify";
import { setToken, setUser } from "../redux/slices/auth";

export const Route = createLazyFileRoute("/register")({
  component: Register,
});

function Register() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [profilePicture, setProfilePicture] = useState(undefined);

  useEffect(() => {
    if (token) {
      navigate({ to: "/" });
    }
  }, [token, navigate]);

  // Mutation to handle registration
  const mutation = useMutation({
    mutationFn: async () => {
      if (password !== confirmPassword) {
        throw new Error("Password and password confirmation must be the same!");
      }

      const request = {
        name,
        email,
        password,
        profilePicture,
      };

      const result = await register(request);

      if (result.success) {
        localStorage.setItem("token", result.data.token);
        dispatch(setToken(result.data.token)); // Set token in Redux store
        dispatch(setUser(result.data.user)); // Set user in Redux store
        return result.data;
      } else {
        throw new Error(result.message);
      }
    },
    onSuccess: () => {
      // Redirect to home page after successful registration
      navigate({ to: "/" });
    },
    onError: (error) => {
      toast.error(error.message); // Display error toast
    },
  });

  const onSubmit = (event) => {
    event.preventDefault();
    mutation.mutate();
  };

  return (
    <Row className="mt-5">
      <Col className="offset-md-3">
        <Card>
          <Card.Header className="text-center">Register</Card.Header>
          <Card.Body>
            <Form onSubmit={onSubmit}>
              <Form.Group as={Row} className="mb-3" controlId="name">
                <Form.Label column sm="3">
                  Name
                </Form.Label>
                <Col sm="9">
                  <Form.Control
                    type="text"
                    placeholder="Name"
                    required
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                  />
                </Col>
              </Form.Group>

              <Form.Group as={Row} className="mb-3" controlId="email">
                <Form.Label column sm={3}>
                  Email
                </Form.Label>
                <Col sm={9}>
                  <Form.Control
                    type="email"
                    placeholder="Email"
                    required
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                  />
                </Col>
              </Form.Group>

              <Form.Group as={Row} className="mb-3" controlId="password">
                <Form.Label column sm={3}>
                  Password
                </Form.Label>
                <Col sm={9}>
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    required
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                  />
                </Col>
              </Form.Group>

              <Form.Group as={Row} className="mb-3" controlId="confirmPassword">
                <Form.Label column sm={3}>
                  Confirm Password
                </Form.Label>
                <Col sm={9}>
                  <Form.Control
                    type="password"
                    placeholder="Confirm Password"
                    required
                    value={confirmPassword}
                    onChange={(event) => setConfirmPassword(event.target.value)}
                  />
                </Col>
              </Form.Group>

              <Form.Group as={Row} className="mb-3" controlId="profilePicture">
                <Form.Label column sm={3}>
                  Profile Picture
                </Form.Label>
                <Col sm={9}>
                  <Form.Control
                    type="file"
                    placeholder="Choose File"
                    required
                    onChange={(event) =>
                      setProfilePicture(event.target.files[0])
                    }
                    accept=".jpg,.png"
                  />
                </Col>
              </Form.Group>

              <div className="d-grid gap-2">
                <Button
                  type="submit"
                  variant="primary"
                  disabled={mutation.isLoading}
                >
                  {mutation.isLoading ? "Registering..." : "Register"}
                </Button>
              </div>
            </Form>

            <div className="text-center mt-3">
              <small>
                Sudah punya akun? <Link to="/login">Masuk</Link>
              </small>
            </div>
          </Card.Body>
        </Card>
      </Col>
      <Col md={3}></Col>
    </Row>
  );
}

export default Register;
