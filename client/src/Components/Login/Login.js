import { useState } from "react";
import "./Login.css";
import axios from "axios";
import logo from "./../../Assets/test.svg";
import imm from "./../../Assets/img.svg";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  function handleFormSubmit() {
    console.log("Form submission");

    if (email !== "" && password !== "") {
      const objData = { email, password };
      axios
        .post("http://localhost:5000/login", objData, {
          withCredentials: true,
        })
        .then((response) => {
          console.log(response);
          if (response.data.status === "success") {
            navigate("/home");
          }
        })
        .catch((err) => alert(err.response.data.message));
    }
  }
  return (
    <div className="app">
      <img className="signupPage__img1" src={logo} alt="" />
      <div className="signupPage__img1Text">
        <h2>Social-Space</h2>
        <p>Two worlds One chat</p>
      </div>

      <div className="loginArea" id="loginArea" style={{ height: "32vw" }}>
        <div className="loginArea__top">
          <h3 className="logo" id="logo">
            Welcome Back!!!
          </h3>
        </div>

        <div className="loginArea__bottom">
          <div className="form" id="formLoginSignup">
            <div className="email fl">
              <input
                id="email"
                type="text"
                className="form__input"
                name="email"
                placeholder="E-mail"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="password fl">
              <input
                type="password"
                className="form__input"
                name="password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <p className="forget" id="forget">
              Forgot password ?
            </p>

            <button
              className="register__btn"
              id="top__btn"
              onClick={handleFormSubmit}
            >
              Login
            </button>
          </div>
          <hr id="line" className="line" />

          <Link
            to="/signup"
            style={{ textDecoration: "none", color: "#0e1952" }}
          >
            <button className="signin" id="bottom__btn">
              Register
            </button>
          </Link>
        </div>
      </div>
      <img className="signupPage__img2" src={imm} alt="" />
      <div className="signupPage__img2Text">
        <p>
          Made with <FavoriteIcon className="ico" style={{ color: "red" }} />
        </p>
      </div>
    </div>
  );
}

export default Login;
