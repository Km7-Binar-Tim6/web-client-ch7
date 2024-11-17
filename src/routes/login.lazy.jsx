import { createLazyFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { useDispatch, useSelector } from "react-redux";
import { setToken, setUser } from "../redux/slices/auth"; // pastikan Anda memiliki setUser
import { login } from "../service/auth";
import { toast } from "react-toastify";

export const Route = createLazyFileRoute("/login")({
  component: Login,
});

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { token, user } = useSelector((state) => state.auth); // Mengambil user dari Redux

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (token && user) {
      // Redirect berdasarkan role_id
      if (user.role_id === 1) {
        navigate({ to: "/admin" });
      } else if (user.role_id === 2) {
        navigate({ to: "/" });
      }
    }
  }, [navigate, token, user]);

  const onSubmit = async (event) => {
    event.preventDefault();

    const body = { email, password };
    const result = await login(body);
    if (result.success) {
      dispatch(setToken(result.data.token));
      dispatch(setUser(result.data.user)); // Simpan data user ke Redux
      navigate({ to: result.data.user.role_id === 1 ? "/admin" : "/" }); // Arahkan sesuai role_id
      return;
    }

    toast.error(result?.message);
  };

  return (
    <Row className="mt-5">
      <Col className="offset-md-3">
        <Card>
          <Card.Header className="text-center">Login</Card.Header>
          <Card.Body>
            <Form onSubmit={onSubmit}>
              <Form.Group as={Row} className="mb-3" controlId="email">
                <Form.Label column sm={3}>
                  Email
                </Form.Label>
                <Col sm="9">
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
                <Col sm="9">
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    required
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                  />
                </Col>
              </Form.Group>
              <div className="d-grid gap-2">
                <Button type="submit" variant="primary">
                  Login
                </Button>
              </div>
            </Form>
            <div className="text-center mt-3">
              <small>
                Tidak punya akun? <Link to="/register">daftar</Link>
              </small>
            </div>
          </Card.Body>
        </Card>
      </Col>
      <Col md={3}></Col>
    </Row>
  );
}

export default Login;
