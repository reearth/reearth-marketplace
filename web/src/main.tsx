import { StrictMode } from "react";
import * as ReactDOM from "react-dom/client";

import App from "./App";
import { loadConfig } from "./config";
import { startMock } from "./mocks";
import "./index.css";

await startMock();

try {
  await loadConfig();
} catch {
  // ignore error
}

const element = document.getElementById("root");
if (!element) throw new Error("root element is not found");

const root = ReactDOM.createRoot(element);
root.render(
  <StrictMode>
    <App />
  </StrictMode>
);
