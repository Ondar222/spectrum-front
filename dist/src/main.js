import { jsx as _jsx } from "react/jsx-runtime";
import { createRoot } from "react-dom/client";
import "./index.css";
import "./topbar.css";
import App from "./App";
// @ts-ignore
import * as isvek from "bvi";
const rootElement = document.getElementById("root");
if (!rootElement) {
    throw new Error("Failed to find root element");
}
createRoot(rootElement).render(_jsx(App, {}));
new isvek.Bvi();
