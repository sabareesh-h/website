import { createRoot } from "react-dom/client";
import { BrowserRouter } from 'react-router-dom';
import App from "./App.tsx";
import "./index.css";
import "@fontsource/playfair-display";
import "@fontsource/inter";

import { Analytics } from "@vercel/analytics/react";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <App />
    <Analytics />
  </BrowserRouter>
);