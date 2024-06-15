import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import './ShowVideo.css';

function ShowVideo({ vid }) {
  const [touchStartTime, setTouchStartTime] = useState(0);
  const [tapCount, setTapCount] = useState(0);

  const handleTap = () => {
    const now = Date.now();
    if (now - touchStartTime < 300) {
      // Double tap
      setTapCount(tapCount + 1);
      if (tapCount === 1) {
        handleDoubleTap();
      }
    } else {
      // Single tap
      setTapCount(1);
    }
    setTouchStartTime(now);
  };

  const handleDoubleTap = () => {
    // Implement your double tap action here
    console.log('Double tap detected!');
  };

  return (
    <>
      <Link to={`/videopage/${vid?._id}`}>
        <video
          src={`http://localhost:5500/${vid.filePath}`}
          className="video_ShowVideo"
          onTouchStart={() => setTouchStartTime(Date.now())}
          onTouchEnd={handleTap}
        />
      </Link>
      <div className='video_description'>
        <div className='Chanel_logo_App'>
          <div className='fstChar_logo_App'>
            <>{vid?.Uploder?.charAt(0).toUpperCase()}</>
          </div>
        </div>
        <div className='video_details'>
          <p className='title_vid_ShowVideo'>{vid?.videoTitle}</p>
          <pre className='vid_views_UploadTime'>{vid?.Uploder}</pre>
          <pre className='vid_views_UploadTime'>
            {vid?.Views} views <div className="dot"></div> {moment(vid?.createdAt).fromNow()}
          </pre>
        </div>
      </div>
    </>
  );
}

export default ShowVideo;
