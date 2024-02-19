import React from "react";
import { Button, Card } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { AllUsers } from "../apicalls/users";
import NavbarComponent from "../components/NavbarComponent";
import { UpdateUser } from "../apicalls/users";

const Dashboard = () => {
  const [users, setUsers] = useState(null);

  useEffect(() => {
    const getAllUsers = async () => {
      try {
        const response = await AllUsers();

        if (response.success) {
          setUsers(response.data);
        } else {
          console.log(response.message);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    getAllUsers();
  }, []);

  const handleBlock = async (index) => {
    const id = users[index]._id;
    const payload = users[index];
    payload.isBlocked = true;
    const response = await UpdateUser(id, payload);
    console.log("user is Blocked");
  };

  const handleUnblock = async (index) => {
    const id = users[index]._id;
    const payload = users[index];
    payload.isBlocked = false;
    const response = await UpdateUser(id, payload);
    console.log("user is Unblocked");
  };
  return (
    <div>
      <NavbarComponent />
      <h2>All users</h2>
      <div>
        {users &&
          users.map(
            (user, index) =>
              !user.isAdmin && (
                <Card key={index} className="mb-3">
                  <Card.Body>
                    <Card.Title>User {index + 1}</Card.Title>
                    <Card.Text>
                      <strong>Name:</strong> {user.name}
                    </Card.Text>
                    <Card.Text>
                      <strong>Email:</strong> {user.email}
                    </Card.Text>
                    <Button
                      variant="danger"
                      className="me-2"
                      onClick={() => handleBlock(index)}
                    >
                      Block User
                    </Button>
                    <Button
                      variant="success"
                      onClick={() => handleUnblock(index)}
                    >
                      Unblock User
                    </Button>
                  </Card.Body>
                </Card>
              )
          )}
      </div>
    </div>
  );
};

export default Dashboard;
