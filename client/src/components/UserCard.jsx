import React from "react";
import { Button, Card } from "react-bootstrap";
import { BlockUser, UnblockUser } from "../apicalls/users";
const UserCard = ({ users }) => {
  const handleBlock = async () => {
    console.log("hello");
    const response = await BlockUser(users[index]);
    console.log(response.data);
  };
  const handleUnblock = async (index) => {
    const response = await UnblockUser(users[index]);
    console.log(response.data);
  };
  return (
    <div>
      {users &&
        users.map((user, index) => (
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
                onClick={handleBlock}
              >
                Block User
              </Button>
              <Button variant="success" onClick={handleUnblock(index)}>
                Unblock User
              </Button>
            </Card.Body>
          </Card>
        ))}
    </div>
  );
};

export default UserCard;
