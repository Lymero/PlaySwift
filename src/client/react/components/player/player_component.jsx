import React from 'react';

const PlayerComponent = () => {
  return (
      <div>
          <video 
            className="video-js"
            controls
            data-setup='{ "techOrder": ["youtube"], "sources": [{ "type": "video/youtube", "src": "https://youtu.be/Ke90Tje7VS0"}] }'>
            </video>            
      </div>
  );
}

export default PlayerComponent;