import { createLazyFileRoute, useNavigate } from '@tanstack/react-router'
import { useState } from 'react'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { createCarOption } from '../../service/carOption'
import { toast } from 'react-toastify'
import ProtectedRoute from '../../redux/slices/ProtectedRoute.js'

export const Route = createLazyFileRoute('/caroptions/create')({
  component: () => (
    <ProtectedRoute allowedRoles={[1]}>
      <CreateCarOption />
    </ProtectedRoute>
  ),
})

function CreateCarOption() {
  const navigate = useNavigate()

  const [option, setOption] = useState('')

  const onSubmit = async (event) => {
    event.preventDefault()

    const request = {
      option_name: option,
    }

    const result = await createCarOption(request)
    if (result?.success) {
      navigate({ to: '/caroptions' })
      return
    }

    toast.error(result?.message || 'Failed to create car option')
  }

  return (
    <Row className="justify-content-center">
      <Col md={6}>
        <Card>
          <Card.Body>
            <Card.Title>Create a new car option</Card.Title>
            <Form onSubmit={onSubmit}>
              <Form.Group className="mb-3" controlId="carOption">
                <Form.Label>Option</Form.Label>
                <Form.Control
                  type="text"
                  value={option}
                  placeholder="Enter new car option"
                  onChange={(event) => setOption(event.target.value)}
                />
              </Form.Group>

              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  )
}

export default CreateCarOption
