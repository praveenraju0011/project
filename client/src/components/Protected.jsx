import React from "react";
import { GetCurrentUser } from "../apicalls/users";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { SetUser } from "../redux/usersSlice";
import { HideLoading, ShowLoading } from "../redux/loadersSlice";
import { Button } from "react-bootstrap";
import { useState, useEffect } from "react";
import NavbarComponent from "./NavbarComponent";

const Protected = () => {
  const { user } = useSelector((state) => state.users);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const getpresentUser = async () => {
    try {
      dispatch(ShowLoading());
      const response = await GetCurrentUser();
      console.log(response.data);
      if(response.data.isBlocked){
        localStorage.removeItem("token");
        console.log("user is blocked")
        dispatch(HideLoading());
        dispatch(SetUser(null));
        navigate('/login');
      }
      dispatch(HideLoading());
      if (response.success) {
        dispatch(SetUser(response.data));
      } else {
        dispatch(SetUser(null));
        console.log(response.message);
        navigate("/login");
      }
    } catch (error) {
      dispatch(HideLoading());
      dispatch(SetUser(null));
      console.log(error.message);
    }
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      getpresentUser();
    } else {
      navigate("/login");
    }
  }, []);

  return (
    user && (
      <div>
        <NavbarComponent />
        <div>
          <h1>
            {user.name}
            <br />({user.isAdmin ? "Admin" : "Regular User"})
            <br />
            {user.isAdmin && (
              <Button onClick={() => navigate("/dashboard")}>Dashboard</Button>
            )}
          </h1>
        </div>
      </div>
    )
  );
};

export default Protected;
