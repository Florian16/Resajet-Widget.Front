import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./index.scss";
import { CompanyProvider } from "./contexts/CompanyContext";
import "./traductions/i18n";

const reactApp = document.createElement("div");
document.body.appendChild(reactApp);

ReactDOM.render(
  <React.StrictMode>
    <CompanyProvider>
      <App />
    </CompanyProvider>
  </React.StrictMode>,
  reactApp
);
