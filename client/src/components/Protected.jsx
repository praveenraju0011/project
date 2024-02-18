import React from "react";
import { GetCurrentUser } from "../apicalls/users";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { SetUser } from "../redux/usersSlice";
import { HideLoading, ShowLoading } from "../redux/loadersSlice";
import { useState, useEffect } from "react";
const Protected = () => {
  const { user } = useSelector((state) => state.users);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const getpresentUser = async () => {
    try {
      dispatch(ShowLoading());
      const response = await GetCurrentUser();
      dispatch(HideLoading());
      if (response.success) {
        dispatch(SetUser(response.data));
      } else {
        dispatch(SetUser(null));
        console.log(response.message);
        localStorage.removeItem("token");
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
        userLoggedIn
        <div
          onClick={() => {
            if (user.isAdmin) {
              navigate("/dashboard");
            } else {
              navigate("/userpage");
            }
          }}
        >
          <h1>{user.name}</h1>
        </div>
      </div>
    )
  );
};

export default Protected;
