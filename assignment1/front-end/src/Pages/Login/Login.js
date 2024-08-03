import React, { useState } from "react";
import "./Login.css";
import Button from "../../components/Button/Button";
import { useNavigate } from "react-router-dom";
import { verifyUser } from "../../Repository/user";

function Login() {
  const [fields, setFields] = useState({ username: "", password: "" });
  const navigate = useNavigate();
  //create error when user input wrong username or password
  const [errMessage, setErrMessage] = useState(null);

  //change handler
  function handleChange(event) {
    const username = event.target.name;
    const value = event.target.value;

    //copy fields
    const temp = { username: fields.username, password: fields.password };
    temp[username] = value;
    setFields(temp);
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    const user = await verifyUser(fields.username, fields.password);
    //check if user enter correct username or password
    if (user !== null) {
      navigate("/MyProfile");
      return;
    }

    const temp = { ...fields };
    //reset password to black
    temp.password = "";
    setFields(temp);
    setErrMessage("Username and / or password invalid, please try again.");
  }

  return (
    <div>
      <div className="login-container">
        <div className="login-form">
          <h1>Login</h1>
          {errMessage !== null && <span>{errMessage}</span>}
          <form onSubmit={handleSubmit}>
            <div className="login-form-member">
              <input
                name="username"
                id="username"
                placeholder="Enter your username"
                value={fields.username}
                onChange={handleChange}
              ></input>
            </div>
            <div className="login-form-member">
              <input
                type="password"
                name="password"
                placeholder="Enter your password"
                value={fields.password}
                onChange={handleChange}
              ></input>
            </div>
            <div className="login-form-member">
              <Button onClick={handleSubmit}>Login</Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
