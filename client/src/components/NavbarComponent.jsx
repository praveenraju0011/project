import React from "react";
import { Nav, NavDropdown } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { SetUser } from "../redux/usersSlice";
import { useEffect } from "react";

const NavbarComponent = () => {
  const { user } = useSelector((state) => state.users);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    dispatch(SetUser(null));
    navigate("/login");
  };


  return (
    <div>
      <Nav
        className="justify-content-end flex-grow-1 pe-3"
        bg="primary"
        variant="dark"
      >
        <Nav.Link onClick={() => navigate("/")}>Home</Nav.Link>
        {user ? (
          <NavDropdown title="Profile" id="dropdownId">
            <NavDropdown.Item onClick={() => navigate("/edit-profile")}>
              Edit Profile
            </NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
          </NavDropdown>
        ) : (
          <>
            <Nav.Link onClick={() => navigate("/login")}>Login</Nav.Link>
            <Nav.Link onClick={() => navigate("/register")}>Sign Up</Nav.Link>
          </>
        )}
      </Nav>
    </div>
  );
};

export default NavbarComponent;
