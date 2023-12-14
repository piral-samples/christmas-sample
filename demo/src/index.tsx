import * as React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import MovieTile from "./watch/MovieTile";
import Layout from "./components/Layout";

const root = createRoot(document.querySelector("#app"));

const Browse = React.lazy(() => import("./browse/BrowsePage"));
const Watch = React.lazy(() => import("./watch/WatchPage"));
const Profile = React.lazy(() => import("./profile/ProfilePage"));

root.render(
  <BrowserRouter>
    <Layout>
      <Routes>
        <Route path="/" element={<Navigate to="/browse" />} />
        <Route path="/browse" element={<Browse MovieTile={MovieTile} />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/watch/:media_type/:video_id" element={<Watch />} />
      </Routes>
    </Layout>
  </BrowserRouter>
);
