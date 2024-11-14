import { createLazyFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import { FaPlus } from "react-icons/fa";
import { getModel } from "../../service/model";
import ModelItem from "../../components/Model/ModelItem";

export const Route = createLazyFileRoute("/model/")({
  component: Model,
});

function Model() {
  const navigate = useNavigate();
  const { token, user } = useSelector((state) => state.auth);

  const [models, setModel] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getModelData = async () => {
    setIsLoading(true);
    const result = await getModel();
    if (result.success) {
      setModel(result.data);
    }
    setIsLoading(false);
  };

  const refetchData = async () => {
    await getModelData();
  };

  useEffect(() => {
    const getModelData = async () => {
      setIsLoading(true);
      const result = await getModel();
      if (result.success) {
        setModel(result.data);
      }
      setIsLoading(false);
    };

    if (token) {
      getModelData();
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
        <h1>Model List</h1>
        {user && user.role_id === 1 && (
          <Button
            variant="primary"
            onClick={() => navigate({ to: "/model/create" })}
            className="d-flex align-items-center"
          >
            <FaPlus className="me-2" />
            Create New Model
          </Button>
        )}
      </div>

      {models.length === 0 ? (
        <h1 className="mt-4">Model data is not found!</h1>
      ) : (
        <Table striped bordered hover className="mt-4">
          <thead>
            <tr>
              <th>ID</th>
              <th>Model Name</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {models.map((model) => (
              <ModelItem
                model={model}
                key={model?.id}
                refetchData={refetchData}
              />
            ))}
          </tbody>
        </Table>
      )}
    </>
  );
}

export default Model;
