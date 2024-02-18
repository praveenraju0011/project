import React from "react";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";

const NavbarComponent = () => {
  // const { user } = useSelector((state) => state.users);
  return (
    <div>
      <Nav
        className="justify-content-end flex-grow-1 pe-3"
        bg="primary"
        variant="dark"
      >
        <Nav.Link href="/">Home</Nav.Link>
        <Nav.Link href="/login">Login</Nav.Link>
        <Nav.Link href="/register">SignUp</Nav.Link>

        <NavDropdown title="Profile" id="dropDownId">
          <NavDropdown.Item href="#action3">Edit Profile</NavDropdown.Item>

          <NavDropdown.Divider />
          <NavDropdown.Item href="#action5">Logout</NavDropdown.Item>
        </NavDropdown>
      </Nav>
    </div>
  );
};

export default NavbarComponent;
