import React from "react";
import LeftSidebar from "../../Components/LeftSidebar/LeftSidebar";
import "./Library.css";
import WHLVideoList from "../../Components/WHL/WHLVideoList";
import { FaHistory } from "react-icons/fa";
import { MdOutlineWatchLater } from "react-icons/md";
import { AiOutlineLike } from "react-icons/ai";

function Library({ CurrentUser, historyList, watchLaterList, likedVideoList }) {
  const vids = [];

  return (
    <div className="container_Pages_App">
      <LeftSidebar />
      <div className="container2_Pages_App">
        <div className="container_libraryPage">
          <h1 className="title_container_LibraryPage">
            <FaHistory />
            <b>History</b>
          </h1>
          <div className="container_videoList_LibraryPage">
            <WHLVideoList
              page={"History"}
              videoList={historyList || vids}
            />
          </div>
        </div>
        <div className="container_libraryPage">
          <h1 className="title_container_LibraryPage">
            <MdOutlineWatchLater />
            <b>Watch Later</b>
          </h1>
          <div className="container_videoList_LibraryPage">
            <WHLVideoList
              page={"Watch Later"}

              videoList={watchLaterList}
            />
          </div>
        </div>
        <div className="container_libraryPage">
          <h1 className="title_container_LibraryPage">
            <AiOutlineLike />
            <b>Liked Videos</b>
          </h1>
          <div className="container_videoList_LibraryPage">
            <WHLVideoList
              page={"Liked Videos"}
              
              videoList={likedVideoList}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Library;
