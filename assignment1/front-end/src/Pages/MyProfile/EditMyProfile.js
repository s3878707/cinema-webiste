import React, { useState, useEffect } from "react";
import "./MyProfile.css";
import Button from "../../components/Button/Button";
import { useNavigate } from "react-router-dom";
import Post from "../../components/Post/Post";
import { getUser, findUser, updateUser, findEmail } from "../../Repository/user";
import { getPosts } from "../../Repository/post";
function EditMyProfile() {
  //get the user from local storage
  const user = getUser();
  // get all the reviews posted by this account
  const [reviews, setReviews] = useState([]);
  const fetchReviews = async () =>{
    const reviewsData = await getPosts(user.username);
    setReviews(reviewsData);
  }

  useEffect(()=> {
    fetchReviews();
  },[]);

  const navigate = useNavigate();
  const [editedData, setEditedData] = useState({
    username: user?.username || "", // Initialize with existing username
    password: user?.password || "", // Initialize with existing password
    email: user?.email || "", // Initialize with existing email
    date: user.date,
  });
  //set some errors when user enter invalid data (username, email and password)
  const [errorEmailMessage, setErrorEmailMessage] = useState(null);
  const [errorUsernameMessage, setErrorUsernameMessage] = useState(null);
  const [errorPasswordMessage, setErrorPasswordMessage] = useState(null);

  //change handler will change the profile
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setEditedData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Function to handle the update button click
  const handleUpdateClick = async (event) => {
    event.preventDefault();
    //reset the errors before clicking the submit button again
    setErrorUsernameMessage("");
    setErrorEmailMessage("");
    setErrorPasswordMessage("");
    //check valid data
    if (editedData.username !== user.username) {
      if (await findUser(editedData.username) !== null) {
        setErrorUsernameMessage(
          "This username is already used. Please use another username !"
        );
        return;
      }
    }
    if (
      !/(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})/.test(
        editedData.password
      )
    ) {
      setErrorPasswordMessage("Invalid Password");
      return;
    }
    if (editedData.email !== user.email) {
      if (await findEmail(editedData.email) !== null) {
        setErrorEmailMessage(
          "This email is already used. Please use another email !"
        );
        return;
      }
    }
    //change the profile of this account in database
    await updateUser(user.username,editedData);
    alert("Update successfully !");
    //navigate back to myprofile page if successfully update
    navigate("/myprofile");
    return;
  };

  return (
    <div>
      <div className="myprofile-container">
        <h1>My Profile</h1>
        <div className="myprofile-wrapper">
          <div className="myprofile-form">
            <form onSubmit={handleUpdateClick}>
              <div className="myprofile-detail">
                <div>
                  <p className="myprofile-form-member">
                    <strong>Username:</strong>
                    <input
                      type="text"
                      name="username"
                      value={editedData.username}
                      onChange={handleInputChange}
                      required
                    />
                  </p>
                </div>
                {errorUsernameMessage !== null && (
                  <div className="form-group">
                    <span style={{ color: "red" }}>{errorUsernameMessage}</span>
                  </div>
                )}
                <div className="myprofile-form-member">
                  <p>
                    <strong>Password:</strong>
                    <input
                      type="text"
                      name="password"
                      value={editedData.password}
                      onChange={handleInputChange}
                      required
                    />
                  </p>
                </div>
                <div className="form-group">
                  {errorPasswordMessage !== null && (
                    <span style={{ color: "red" }}>{errorPasswordMessage}</span>
                  )}
                </div>

                <div className="myprofile-form-member">
                  <p>
                    <strong>Email:</strong>
                    <input
                      type="email"
                      name="email"
                      value={editedData.email}
                      onChange={handleInputChange}
                      required
                    />
                  </p>
                </div>
                <div className="form-group">
                  {errorEmailMessage !== null && (
                    <span style={{ color: "red" }}>{errorEmailMessage}</span>
                  )}
                </div>
              </div>
              <div className="myprofile-button">
                <Button type="Submit">Update</Button>
                <Button
                  style={{ backgroundColor: "grey" }}
                  onClick={() => {
                    if (
                      window.confirm(
                        "Are you sure you wish to cancel this form ?"
                      )
                    ) {
                      navigate("/myprofile");
                    }
                  }}
                  children="Cancel"
                ></Button>
              </div>
            </form>
          </div>
          <br/>
        </div>
        <div className="myprofile-post">
          <div>
            {reviews.length === 0 ? (
              <span>No posts have been submitted.</span>
            ) : (
              reviews.map((review, key) => (
                <Post
                  writer={user.username}
                  title={review.film.title}
                  rating={review.rating}
                  content={review.content}
                  id={key}
                />
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditMyProfile;
