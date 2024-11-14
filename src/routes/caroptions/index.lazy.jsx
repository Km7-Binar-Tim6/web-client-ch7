import { createLazyFileRoute, useNavigate } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button'
import { FaPlus } from 'react-icons/fa'
import { getCarOptions } from '../../service/carOption'
import CarOptionItem from '../../components/CarOptions/CarOptionItem'

export const Route = createLazyFileRoute('/caroptions/')({
  component: CarOption,
})

function CarOption() {
  const navigate = useNavigate()
  const { token, user } = useSelector((state) => state.auth)

  const [carOptions, setCarOptions] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  const getCarOptionsData = async () => {
    setIsLoading(true)
    const result = await getCarOptions()
    if (result.success) {
      setCarOptions(result.data)
    }
    setIsLoading(false)
  }

  const refetchData = async () => {
    await getCarOptionsData()
  }

  useEffect(() => {
    const getCarOptionsData = async () => {
      setIsLoading(true)
      const result = await getCarOptions()
      if (result.success) {
        setCarOptions(result.data)
      }
      setIsLoading(false)
    }

    if (token) {
      getCarOptionsData()
    } else {
      navigate({ to: '/login' })
    }
  }, [token, navigate])

  if (!token) {
    return null
  }

  if (isLoading) {
    return (
      <div className="mt-4">
        <h1>Loading...</h1>
      </div>
    )
  }

  return (
    <>
      <div className="d-flex justify-content-between align-items-center mt-4">
        <h1>Car Options List</h1>
        {user && user.role_id === 1 && (
          <Button
            variant="primary"
            onClick={() => navigate({ to: '/caroptions/create' })}
            className="d-flex align-items-center"
          >
            <FaPlus className="me-2" />
            Create New Car Option
          </Button>
        )}
      </div>

      {carOptions.length === 0 ? (
        <h1 className="mt-4">Car option data is not found!</h1>
      ) : (
        <Table striped bordered hover className="mt-4">
          <thead>
            <tr>
              <th>ID</th>
              <th>Car Option Name</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {carOptions.map((carOption) => (
              <CarOptionItem
                carOption={carOption}
                key={carOption?.id}
                refetchData={refetchData}
              />
            ))}
          </tbody>
        </Table>
      )}
    </>
  )
}

export default CarOption
