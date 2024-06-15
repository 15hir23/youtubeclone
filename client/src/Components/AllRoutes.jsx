import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home/Home";
import Library from "../pages/Library/Library";
import YourVideo from "../pages/YourVideo/YourVideo";
import WatchHistory from "../pages/WatchHistory/WatchHistory";
import WatchLater from "../pages/WatchLater/WatchLater";
import LikedVideo from "../pages/LikedVideo/LikedVideo";
import VideoPage from "../pages/VideoPage/VideoPage";
import Chanel from "../pages/Chanel/Chanel";
import Search from "../pages/Search/Search";
import VideoCall from "./VideoCall/VideoCall"; // Import VideoCall component

function AllRoutes({ setEditCreateChanelBtn, setVidUploadPage }) {
  return (
    <Routes>
          
      <Route path="/" element={<Home />} />
      <Route path="/library" element={<Library />} />
      <Route path="/history" element={<WatchHistory />} />
      <Route path="/watchlater" element={<WatchLater />} />
      <Route path="/likedvideo" element={<LikedVideo />} />
      <Route path="/yourvideos" element={<YourVideo />} />
      <Route path="/videopage/:vid" element={<VideoPage />} />
      <Route path="/search/:searchQuery" element={<Search />} />
      <Route path="/videocall" element={<VideoCall />} /> 
      <Route 
        path="/chanel/:Cid"
        element={<Chanel 
          setVidUploadPage={setVidUploadPage}
          setEditCreateChanelBtn={setEditCreateChanelBtn} />}
      />

    </Routes>
  );
}

export default AllRoutes;
