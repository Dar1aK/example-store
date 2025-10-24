import { StrictMode } from "react";
import { hydrateRoot } from "react-dom/client";
import { Application } from "./client/application";
import { BrowserRouter } from "react-router";

const root = document.getElementById("root");

if (!root) {
  throw new Error("root element was not found");
}

hydrateRoot(
  root,
  <StrictMode>
    <BrowserRouter>
      <Application />
    </BrowserRouter>
  </StrictMode>
);
