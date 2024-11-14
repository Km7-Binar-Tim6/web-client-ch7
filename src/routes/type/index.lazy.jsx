import { createLazyFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import { FaPlus } from "react-icons/fa";
import { getType } from "../../service/type";
import TypeItem from "../../components/Type/TypeItem";

export const Route = createLazyFileRoute("/type/")({
  component: Type,
});

function Type() {
  const navigate = useNavigate();
  const { token, user } = useSelector((state) => state.auth);

  const [types, setTypes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getTypeData = async () => {
    setIsLoading(true);
    const result = await getType();
    if (result.success) {
      setTypes(result.data);
    }
    setIsLoading(false);
  };

  const refetchData = async () => {
    await getTypeData();
  };

  useEffect(() => {
    const getTypeData = async () => {
      setIsLoading(true);
      const result = await getType();
      if (result.success) {
        setTypes(result.data);
      }
      setIsLoading(false);
    };

    if (token) {
      getTypeData();
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
        <h1>Type List</h1>
        {user && user.role_id === 1 && (
          <Button
            variant="primary"
            onClick={() => navigate({ to: "/type/create" })}
            className="d-flex align-items-center"
          >
            <FaPlus className="me-2" />
            Create New Type
          </Button>
        )}
      </div>

      {types.length === 0 ? (
        <h1 className="mt-4">Type data is not found!</h1>
      ) : (
        <Table striped bordered hover className="mt-4">
          <thead>
            <tr>
              <th>ID</th>
              <th>Type Name</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {types.map((type) => (
              <TypeItem type={type} key={type?.id} refetchData={refetchData} />
            ))}
          </tbody>
        </Table>
      )}
    </>
  );
}

export default Type;
