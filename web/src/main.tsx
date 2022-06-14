import { StrictMode } from "react";
import * as ReactDOM from "react-dom/client";

import "./index.css";

const element = document.getElementById("root");
if (!element) throw new Error("root element is not found");
const root = ReactDOM.createRoot(element);
root.render(
  <StrictMode>
    <h1>Hello, world.</h1>
  </StrictMode>
);
