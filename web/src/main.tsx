import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import App from "./app";
import { startMock } from "./test/mocks";

import "antd/dist/antd.css";
import "./index.css";

startMock().finally(() => {
  const element = document.getElementById("root");
  if (!element) throw new Error("root element is not found");
  const root = createRoot(element);
  root.render(
    <StrictMode>
      <App />
    </StrictMode>,
  );
});
