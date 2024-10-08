import React, { useContext, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import "./Signup.css";
import { useNavigate } from "react-router-dom";
import { VscEye } from "react-icons/vsc";
import { VscEyeClosed } from "react-icons/vsc";
import { MyContext } from "../utils/MyContextProvider";

const schema = Yup.object().shape({
  fullname: Yup.string()
    .required("Full name required")
    .test(
      "has-first-and-last-name",
      "Full name must include first and last name",
      (value) => {
        if (!value) return false;
        const parts = value.trim().split(" ");
        return (
          parts.length >= 2 && parts[0]?.length > 0 && parts[1]?.length > 0
        );
      }
    ),
  email: Yup.string()
    .required("Email is required")
    .email("Enter a valid email"),
  password: Yup.string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters long")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])/,
      "Password must contain at least one uppercase, one lowercase, one number, and one special character"
    ),
});

const Signup = () => {
  const navigate = useNavigate();
  const [icon, setIcon] = useState(false);
  const [error, setError] = useState("");

  const formik = useFormik({
    initialValues: { fullname: "", email: "", password: "" },
    validationSchema: schema,
    onSubmit: (values) => {
      if (
        localStorage.getItem("email") === values.email &&
        localStorage.getItem("password") === values.password
      ) {
        setError("It looks like you already have an account. Please log in.");
      } else if (localStorage.getItem("email") === values.email) {
        setError(
          "This email is already associated with an account. Please try a different email."
        );
      } else if (localStorage.getItem("password") === values.password) {
        setError(
          "This password is already in use. Please choose a different password."
        );
      } else {
        localStorage.setItem("fullname", values.fullname);
        localStorage.setItem("email", values.email);
        localStorage.setItem("password", values.password);
        const generateRandomString = () => {
          return [...Array(100)]
            .map(() => Math.random().toString(36)[2])
            .join("");
        };

        localStorage.setItem("token", generateRandomString());
        navigate("/checkout");
      }
    },
  });

  return (
    <div className="signup main-container">
      <form noValidate onSubmit={formik.handleSubmit} className="sign-up-form">
        <h3>
          Welcome to <span>StaySpace</span>!
        </h3>
        <input
          type="text"
          placeholder="Full name"
          name="fullname"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.fullname}
          className="input-element"
        />
        <p className="error-p">
          {formik.errors.fullname &&
            formik.touched.fullname &&
            formik.errors.fullname}
        </p>
        <input
          type="email"
          placeholder="Your email"
          name="email"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.email}
          className="input-element"
        />
        <p className="error-p">
          {formik.errors.email && formik.touched.email && formik.errors.email}
        </p>
        <div className="input">
          <input
            type={icon ? "text" : "password"}
            placeholder="Password"
            name="password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
            style={{ marginTop: "0px" }}
            className="input-element"
          />
          {icon ? (
            <VscEye className="icon" onClick={() => setIcon(false)} />
          ) : (
            <VscEyeClosed className="icon" onClick={() => setIcon(true)} />
          )}
        </div>
        <p className="error-p">
          {formik.errors.password &&
            formik.touched.password &&
            formik.errors.password}
        </p>
        <button type="submit" className="signup-button">
          Sign up
        </button>
        {error !== "" ? <p className="error-message">{error}</p> : null}
        <p className=".p">
          Already have an account?
          <span onClick={() => navigate("/login")} className="span-button">
            {" "}
            Log in
          </span>
        </p>
      </form>
    </div>
  );
};

export default Signup;
