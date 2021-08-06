import { useState, useEffect } from "react";
import { useMutation } from "@apollo/client";
import { useHistory } from "react-router-dom";

import "./SignupPage.css";
import BackgroundImage from "./../../assets/login_bg2.jpg";

import { SIGN_UP } from "./../../queries/index";
import useCurrentUser from "./../../customHooks/useCurrentUser";

export default function SignupPage() {
  const { refetch } = useCurrentUser();
  const history = useHistory();

  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const [signup] = useMutation(SIGN_UP, {
    onError: ({ networkError, graphQLErrors }) => {
      if (networkError) {
        console.log("Network Error:", networkError);
      }
      if (graphQLErrors) {
        graphQLErrors.forEach(({ message }) => {
          setError(message);
        });
      }
    },
    onCompleted: async ({ signup }) => {
      console.log(signup);
      localStorage.setItem("token", signup.token);
      setError("");
      setEmail("");
      setPassword("");
      setUserName("");
      await refetch();
      history.push("/home");
    },
  });

  useEffect(() => {
    if (!email && !password && !userName) setError("");
  }, [email, password, userName]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    await signup({
      variables: {
        username: userName,
        email,
        password,
      },
    });
  };

  const canBeSubmit = () => {
    if (email && password && userName) {
      return true;
    } else {
      return false;
    }
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
            <h2 id="title">Register</h2>
            <label className="label">User Name*</label>
            <input
              className="input"
              type="text"
              placeholder="Enter User Name"
              required
              value={userName}
              onChange={(e) => setUserName(e.currentTarget.value)}
            />
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

            {error && <label className="error">{error}</label>}
            <button className="submit-button" disabled={!canBeSubmit()}>
              Submit
            </button>
            <label className="forgot-password">
              Already have an account?{" "}
              <b
                style={{ color: "gold", cursor: "pointer" }}
                onClick={() => history.push("/login")}
              >
                Sign In
              </b>
            </label>
          </form>
        </div>
      </div>
    </div>
  );
}
