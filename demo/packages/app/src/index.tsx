import * as React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { BrowsePage } from "christmas-demo-browse";
import { WatchPage, MovieTile } from "christmas-demo-watch";
import { ProfilePage } from "christmas-demo-profile";
import Layout from "./components/Layout";

const root = createRoot(document.querySelector("#app"));


root.render(
  <BrowserRouter>
    <Layout>
      <Routes>
        <Route path="/" element={<Navigate to="/browse" />} />
        <Route path="/browse" element={<BrowsePage MovieTile={MovieTile} />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/watch/:media_type/:video_id" element={<WatchPage />} />
      </Routes>
    </Layout>
  </BrowserRouter>
);
