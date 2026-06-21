import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { initializePostHog } from "./lib/posthog.ts";
import "./index.css";

initializePostHog();

createRoot(document.getElementById("root")!).render(<App />);
