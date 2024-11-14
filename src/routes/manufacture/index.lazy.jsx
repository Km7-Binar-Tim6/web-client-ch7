import { createLazyFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import { FaPlus } from "react-icons/fa";
import { getManufacture } from "../../service/manufacture";
import ManufactureItem from "../../components/Manufacture/ManufactureItem";

export const Route = createLazyFileRoute("/manufacture/")({
  component: Manufacture,
});

function Manufacture() {
  const navigate = useNavigate();
  const { token, user } = useSelector((state) => state.auth);

  const [manufactures, setManufactures] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getManufactureData = async () => {
    setIsLoading(true);
    const result = await getManufacture();
    if (result.success) {
      setManufactures(result.data);
    }
    setIsLoading(false);
  };

  const refetchData = async () => {
    await getManufactureData();
  };

  useEffect(() => {
    const getManufactureData = async () => {
      setIsLoading(true);
      const result = await getManufacture();
      if (result.success) {
        setManufactures(result.data);
      }
      setIsLoading(false);
    };

    if (token) {
      getManufactureData();
    } else {
      navigate({ to: "/login" });
    }
  }, [token, navigate]);

  if (!token) {
    return null;
  }

  if (isLoading) {
    return (
      <div className="mt-4">
        <h1>Loading...</h1>
      </div>
    );
  }

  return (
    <>
      <div className="d-flex justify-content-between align-items-center mt-4">
        <h1>Manufacture List</h1>
        {user && user.role_id === 1 && (
          <Button
            variant="primary"
            onClick={() => navigate({ to: "/manufacture/create" })}
            className="d-flex align-items-center"
          >
            <FaPlus className="me-2" />
            Create New Manufacture
          </Button>
        )}
      </div>

      {manufactures.length === 0 ? (
        <h1 className="mt-4">Manufacture data is not found!</h1>
      ) : (
        <Table striped bordered hover className="mt-4">
          <thead>
            <tr>
              <th>ID</th>
              <th>Manufacture Name</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {manufactures.map((manufacture) => (
              <ManufactureItem
                manufacture={manufacture}
                key={manufacture?.id}
                refetchData={refetchData} // Pass refetchData to each ManufactureItem
              />
            ))}
          </tbody>
        </Table>
      )}
    </>
  );
}

export default Manufacture;
