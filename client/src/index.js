// Modules
import React from "react";
import ReactDOM from "react-dom/client";
import { GoogleOAuthProvider } from '@react-oauth/google';

// Components
import App from "./App.js";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId="218272547872-u1sv5s04r73hsl214ksuh4i429c2nma9.apps.googleusercontent.com">;
    <App />
    </GoogleOAuthProvider>
  </React.StrictMode>
);
