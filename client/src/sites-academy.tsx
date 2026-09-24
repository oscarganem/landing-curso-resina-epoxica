import { createRoot } from "react-dom/client";
import ErrorBoundary from "./components/ErrorBoundary";
import CourseCampaignRouter from "./components/course/CourseCampaignRouter";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <ErrorBoundary>
    <CourseCampaignRouter />
  </ErrorBoundary>,
);
