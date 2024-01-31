// Modules
import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import useLocalState from "../utils/useLocalStorage";
import axios from "axios";
import { useGoogleLogin } from "@react-oauth/google";


const Login = () => {
  const emailRef = useRef();
  const passwordRef = useRef();


  // generating login button for Google
  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        const googleLoginRes = await axios.post("/api/login/google", {
          token: tokenResponse.access_token,
        });
        // attach google-generated jwt token to the localStorage
        console.log('googleLogin testing jwt token to localStorage action: ', googleLoginRes.data);
        setToken(googleLoginRes.data.token);
        navigate("/CatsCardsPage");
        // handle successful login here
      } catch (error) {
        // Handle errors
        console.error("Error from googleLogin:", error);
        // Check if the error response has the expected format
        if (error.response && error.response.data) {
          setErr(error.response.data);
        } else {
          // If the error format is not as expected, use a generic message
          setErr("An error occurred during the login process.");
        }
      }
    },
  });

  // Response/error from server
  const [res, setRes] = useState(null);
  const [err, setErr] = useState(null);
  const [token, setToken] = useLocalState("", "token");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userCredentials = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };

    // Make POST request to Atlas DB to verify user has an account to log in
    try {
      const loginRes = await axios.post("api/login", userCredentials);

      console.log("* Login response from server: ", loginRes);
      console.log("* loginRes.data: ", loginRes.data);
      setRes(
        `User has created an Adopter or Cat Profile: ${loginRes.data.hasAdopterOrCatProfile}.`
      );
      setErr(null);
      console.log("User token: ", loginRes.data.token);
      setToken(loginRes.data.token);
      // If the user has not created an Adopter or Cat profile yet...
      if (!loginRes.data.hasAdopterOrCatProfile) {
        console.log("* User has not created an adopter or cat profile yet");
        // Navigate to the create Adopter or create Cat Profile page depending on the user's selection when they registered their account
        const userAccountType = await axios.post(
          "api/login/getAccountType",
          userCredentials
        );
        console.log("* User account type: ", userAccountType.data);
        if (userAccountType.data === "Adopter") navigate("/CreateAccountAdopter");
        else if (userAccountType.data === "Cat") navigate("/CreateAccountCat");
      } else {
        console.log("* User already created an adopter or cat profile");
        const userAccountType = await axios.post(
          "api/login/getAccountType",
          userCredentials
        );
        console.log("* User account type: ", userAccountType.data);
        if (userAccountType.data === "Adopter") navigate("/CatsCardsPage");
        else if (userAccountType.data === "Cat") navigate("/AdopterCardsPage");
      }
    } catch (error) {
      console.error("Error from server:", error);
      // Improved error handling here as well
      if (error.response && error.response.data) {
        setErr(error.response.data);
      } else {
        setErr("An error occurred during the login process.");
      }
    }
  };
  // useEffect(() => {
  //   console.log("jwt token", token);
  // }, [token]);

  return (
    <div className="login-page">
      <form className="login-form" onSubmit={handleSubmit}>
        <h3>Log In</h3>

        <input type="email" placeholder="email" ref={emailRef} />
        <input type="password" placeholder="password" ref={passwordRef} />

        <button type="submit">Log in</button>

        <button className="google-login" onClick={() => googleLogin()}>
          Sign in with Google 🚀
        </button>

      </form>
      {res && <p className="response-text">{JSON.stringify(res)}</p>}
      {err && <p className="error-text">{err}</p>}
    </div>
  );
};

export default Login;
