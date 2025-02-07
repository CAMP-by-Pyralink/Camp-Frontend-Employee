import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import { CustomizationProvider } from "./contexts/CustomizationContext.tsx";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <CustomizationProvider>
      <App />
    </CustomizationProvider>
  </BrowserRouter>
);
