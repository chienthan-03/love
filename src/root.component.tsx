import App from "./components/App";
import "./styles/globals.css";
import { BrowserRouter, Routes, Route } from "react-router";
import { urlJoin } from "@euroland/ci-utils";

declare global {
  interface Window {
    CI_ENV: {
      BASE_PATH: string;
    };
  }
}

export default function Root() {
  return (
    <BrowserRouter basename={urlJoin(window.CI_ENV.BASE_PATH, "/share-graph")}>
      <Routes>
        <Route path="/*" element={<App />} />
      </Routes>
    </BrowserRouter>
  );
}
