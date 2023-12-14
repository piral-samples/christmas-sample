import * as React from "react";
import { createRoot } from "react-dom/client";
import { Navigate } from "react-router-dom";
import { Piral, createInstance } from "piral-core";
import Layout from "./components/Layout";
import Loading from "./components/Loading";

const root = createRoot(document.querySelector("#app"));
const instance = createInstance({
  state: {
    components: {
      Layout,
      LoadingIndicator: Loading,
    },
    routes: {
      "/": () => <Navigate to="/browse" />,
    },
  },
  requestPilets() {
    return Promise.resolve([]);
  },
});

root.render(<Piral instance={instance} />);
