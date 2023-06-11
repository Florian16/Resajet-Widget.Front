import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.scss";
import { RestaurantProvider } from "./contexts/RestaurantContext.tsx";
import { NextUIProvider } from "@nextui-org/react";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RestaurantProvider>
      <NextUIProvider>
        <App />
      </NextUIProvider>
    </RestaurantProvider>
  </React.StrictMode>
);
