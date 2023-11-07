import { useState } from "react";
import "./Signup.css";
import axios from "axios";
import logo from "./../../Assets/test.svg";
import imm from "./../../Assets/img.svg";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useNavigate, Link } from "react-router-dom";

function Signup() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  function handleFormSubmit() {
    if (
      username !== "" &&
      password !== "" &&
      passwordConfirm !== "" &&
      email !== ""
    ) {
      const objData = { username, email, password, passwordConfirm };
      axios
        .post("http://localhost:5000/signup", objData)
        .then((response) => {
          console.log(response);

          if (response.data.status === "success") {
            console.log("idhar aaya kya");
            navigate("/home");
          } else alert(response.data.message);
        })
        .catch((err) => alert(err.response.data.messages[0]));
    }
  }

  return (
    <div className="signup">
      <img className="signupPage__img1" src={logo} alt="" />
      <div className="signupPage__img1Text">
        <h2>Social-Space</h2>
        <p>Two worlds One chat</p>
      </div>

      <div className="loginArea" id="loginArea">
        <div className="loginArea__top">
          <h3 className="logo" id="logo">
            Create new account
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
            <div className="username fl" id="username">
              <input
                type="text"
                className="form__input"
                name="username"
                placeholder="Username"
                onChange={(e) => setUsername(e.target.value)}
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
            <div className="con__password fl" id="con__password">
              <input
                type="password"
                className="form__input"
                name="confirm_password"
                placeholder="Confirm Password"
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
            <button
              className="register__btn"
              id="top__btn"
              onClick={handleFormSubmit}
            >
              Register
            </button>
          </div>
          <hr id="line" className="line" />
          <p className="registered" id="registered">
            Already have an account ?
          </p>
          <Link
            to="/login"
            style={{ textDecoration: "none", color: "#0e1952" }}
          >
            <button className="signin" id="bottom__btn">
              Login
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

export default Signup;
