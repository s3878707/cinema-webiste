import "./Register.css";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/Button/Button";
import { findUser, createUser, findEmail } from "../../Repository/user";

function isValidPassword(password){
  return /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})/.test(
    password
  );
}
const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [date, setDate] = useState("");
  //set some errors when user enter invalid data (username, email and password)
  const [errorEmailMessage, setErrorEmailMessage] = useState(null);
  const [errorUsernameMessage, setErrorUsernameMessage] = useState(null);
  const [errorPasswordMessage, setErrorPasswordMessage] = useState(null);
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  //get the exact date when creating account
  const handleButton = () => {
    const date = new Date().toLocaleDateString();
    setDate(date);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    //reset the errors before clicking the submit button again
    setErrorUsernameMessage("");
    setErrorEmailMessage("");
    setErrorPasswordMessage("");
    //check valid data
    if ((await findUser(formData.username)) !== null) {
      setErrorUsernameMessage(
        "This username is already used. Please use another username !"
      );
      return;
    }
    if ((await findEmail(formData.email)) !== null) {
      setErrorEmailMessage(
        "This email is already used. Please use another email !"
      );
      return;
    }
    if (!isValidPassword(formData.password)) {
      setErrorPasswordMessage(
        <div>
          <p>A password must contain:</p>
          <p>-at least 8 characters</p>
          <p>-one lowercase and upercase letter</p>
          <p>-one digit</p>
          <p>-one special character</p>
        </div>
      );
      return;
    }
    // Save form data to database
    await createUser(formData, date);
    alert("Register successfully !");
    navigate("/login");
    return;
  };

  return (
    <div>
      <div className="register-container">
        <div className="register-wrapper">
          <h1>Register</h1>
          <form onSubmit={handleSubmit} className="register-form">
            <div className="register-form-member">
              <label>Username:</label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
                required
              />
            </div>
            {errorUsernameMessage !== null && (
              <div className="form-group">
                <span style={{ color: "red" }}>{errorUsernameMessage}</span>
              </div>
            )}
            <div className="register-form-member">
              <label>Email:</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>
            {errorEmailMessage !== null && (
              <div className="form-group">
                <span style={{ color: "red" }}>{errorEmailMessage}</span>
              </div>
            )}
            <div className="register-form-member">
              <label htmlFor="password">Password</label>
              <input
                id="password"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                required
              />
            </div>
            {errorPasswordMessage !== null && (
              <div className="form-group">
                <span style={{ color: "red" }}>{errorPasswordMessage}</span>
              </div>
            )}
            <div className="register-form-member">
              <Button
                type="Register"
                onClick={handleButton}
                children="Register"
              ></Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export { isValidPassword };
export default Register;