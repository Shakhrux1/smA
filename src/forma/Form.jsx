import { useState } from "react";
import "./style.scss";
import "https://kit.fontawesome.com/2ade1e86b6.js";

export default function SignUp() {
  const [isSignUp, setIsSignUp] = useState(true);
  const [isCheckboxChecked, setIsCheckboxChecked] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [notification, setNotification] = useState("");
  const [showForm, setShowForm] = useState(true);
  const [showPassword, setShowPassword] = useState(false);

  const handleSignInClick = () => {
    setIsSignUp(false);
    setNotification("");
  };

  const handleSignUpClick = () => {
    setIsSignUp(true);
    setNotification("");
  };

  const handleCheckboxChange = () => {
    setIsCheckboxChecked(!isCheckboxChecked);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const validateForm = () => {
    let newErrors = {};

    if (isSignUp) {
      if (!formData.fullName.trim()) {
        newErrors.fullName = "Full name is required";
      }
    }

    if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Valid email is required";
    }

    if (isSignUp && (!formData.password.trim() || formData.password.length < 6)) {
      newErrors.password = "Password must be at least 6 characters long";
    }

    if (!isSignUp) {
      if (
        formData.email !== "shoxrux@gmail.com" ||
        formData.password !== "shakhrux_iq"
      ) {
        newErrors.email = "Invalid email or password";
        newErrors.password = "Invalid email or password";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSendClick = () => {
    if (validateForm()) {
      setNotification(
        isSignUp ? "New account created successfully!" : "Logged into existing account!"
      );

      setTimeout(() => {
        setNotification(""); // Clear the notification after 1200ms
        setFormData({ fullName: "", email: "", password: "" }); // Clear inputs
      }, 1200); // 1200ms duration
    }
  };

  const closeNotification = () => {
    setShowForm(false); // Close the form
  };

  return (
    <div className="modals">
      <div className="containers">
      {notification && (
        <div className={`notification ${notification ? "show" : ""}`}>
          <span>{notification}</span>
        </div>
      )}
      {showForm && (
        <div className="form-box">
          <button className="close-btn" onClick={closeNotification}>
            &times;
          </button>
          <h1 id="title">{isSignUp ? "Sign Up" : "Login"}</h1>
          <form>
            <div className="btn">
              <button
                type="button"
                id="signupbtn"
                className={isSignUp ? "" : "disable"}
                onClick={handleSignUpClick}
              >
                Sign Up
              </button>
              <button
                type="button"
                id="signinbtn"
                className={!isSignUp ? "" : "disable"}
                onClick={handleSignInClick}
              >
                Login
              </button>
            </div>

            {isSignUp && (
              <div
                className="input-field"
                style={{ borderColor: errors.fullName ? "red" : "" }}
              >
                <i className="fa-solid fa-user"></i>
                <input
                  type="text"
                  placeholder="Full Name"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                />
              </div>
            )}
            <div
              className="input-field"
              style={{ borderColor: errors.email ? "red" : "" }}
            >
              <i className="fa-solid fa-at"></i>
              <input
                type="email"
                placeholder="Email Address"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
              />
            </div>
            <div
              className="input-field password-field"
              style={{ borderColor: errors.password ? "red" : "" }}
            >
              <i className="fa-solid fa-lock"></i>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
              />
              <i
                className={`fa-solid ${
                  showPassword ? "fa-eye" : "fa-eye-slash"
                }`}
                style={{ marginLeft: "-50px", cursor: "pointer" }}
                onClick={togglePasswordVisibility}
              ></i>
            </div>

            <div className="checkbox-container">
              <input
                type="checkbox"
                id="consent"
                checked={isCheckboxChecked}
                onChange={handleCheckboxChange}
              />
              <label htmlFor="consent">
                I agree to the terms and conditions
              </label>
            </div>

            <div className="send-btn">
              <button
                type="button"
                id="sendbtn"
                className={!isCheckboxChecked ? "disable" : ""}
                onClick={handleSendClick}
                disabled={!isCheckboxChecked}
              >
                Send
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
    </div>
  );
}
