import React, { useState } from 'react';
import PlayBtn from '../../assets/images/PlayBtn.png';

const YouTubeThumbnail = ({ videoId, height, width, isPlaying, onPlay  }) => {

  return (
    <div>
      {isPlaying ? (
        <iframe
          width={width || '350'}
          height={height}
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      ) : (
        <div className='card'
          style={{
            position: 'relative',
            display: 'inline-block',
            cursor: 'pointer',
            maxWidth: (width ? width + 'px' : '350px'),
            width: '100%'
          }}
          onClick={onPlay}
        >
          <img
            src={`https://img.youtube.com/vi/${videoId}/hqdefault.jpg`}
            alt="YouTube Thumbnail"
            style={{ width: '100%', height:(height + 'px'), borderRadius:'1%'  }}
          />
          <div
            style={{
              position: 'absolute',
              top: '45%',
              left: '45%',
            }}
          >
            <img src={PlayBtn} alt='' />
          </div>
        </div>
      )}
    </div>
  );
};

export default YouTubeThumbnail;
