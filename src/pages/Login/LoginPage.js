import React, { useState, useEffect } from "react";
import { useMutation } from "@apollo/client";
import { useHistory } from "react-router-dom";
import useCurrentUser from "../../customHooks/useCurrentUser";

import "./LoginPage.css";
import BackgroundImage from "./../../assets/login_bg2.jpg";
import { LOGIN_USER } from "../../queries/index";

const LoginPage = () => {
  const { refetch } = useCurrentUser();
  const history = useHistory();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const [loginUser] = useMutation(LOGIN_USER, {
    onError: ({ networkError, graphQLErrors }) => {
      if (networkError) {
        console.log("Network Error:", networkError.message);
      }
      if (graphQLErrors) {
        graphQLErrors.forEach((error) => {
          console.log(error);
          setError(error.message);
        });
      }
    },
    onCompleted: async ({ login }) => {
      localStorage.setItem("token", login.token);
      setError("");
      setEmail("");
      setPassword("");
      await refetch();
      history.push("/home");
    },
  });

  useEffect(() => {
    if (!email && !password) setError("");
  }, [email, password]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    await loginUser({
      variables: {
        email,
        password,
      },
    });
  };

  return (
    <div className="container">
      <div
        className="background-image"
        style={{
          backgroundImage: `url(${BackgroundImage})`,
        }}
      />
      <div className={"login-container"}>
        <div className="card-container">
          <form className="form" onSubmit={handleSubmit}>
            <h2 id="title">Login</h2>
            <label className="label">Email Address*</label>
            <input
              className="input"
              type="email"
              placeholder="Enter Email"
              required
              value={email}
              onChange={(e) => setEmail(e.currentTarget.value)}
            />
            <label className="label">Password*</label>
            <input
              className="input"
              type="password"
              placeholder="Enter Password"
              value={password}
              required
              onChange={(e) => setPassword(e.currentTarget.value)}
            />
            <div className="check-box-container">
              <input className="check-box" type="checkbox" />
              <label>Remember me</label>
            </div>
            {error && <label className="error">{error}</label>}
            <button className="submit-button">Submit</button>
            <label className="forgot-password">
              Forgot <b style={{ color: "gold" }}>Password?</b>
            </label>
          </form>
        </div>
      </div>
    </div>
  );
};
export default LoginPage;
