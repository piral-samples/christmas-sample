import * as React from "react";
import { createRoot } from "react-dom/client";
import { Navigate } from "react-router-dom";
import { Piral, createInstance } from "piral-core";
import { BrowsePage } from "christmas-demo-browse";
import { WatchPage, MovieTile } from "christmas-demo-watch";
import { ProfilePage } from "christmas-demo-profile";
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
      "/browse": () => <BrowsePage MovieTile={MovieTile} />,
      "/profile": () => <ProfilePage />,
      "/watch/:media_type/:video_id": () => <WatchPage />,
    },
  },
  requestPilets() {
    return Promise.resolve([]);
  },
});

root.render(<Piral instance={instance} />);
