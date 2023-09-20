/* @refresh reload */
import { render } from "solid-js/web";
import { Router } from "@solidjs/router";
import { MetaProvider } from "@solidjs/meta";

import "./index.css";
import App from "./App";

const root = document.getElementById("root");

render(
  () => (
    <Router>
      <MetaProvider>
        <App />
      </MetaProvider>
    </Router>
  ),
  root!,
);
