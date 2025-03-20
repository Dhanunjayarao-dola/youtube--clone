import React, { useEffect, useState } from 'react';
import './PlayVideo.css';
import like from '../../assets/like.png';
import dislike from '../../assets/dislike.png';
import share from '../../assets/share.png';
import save from '../../assets/save.png';
import { API_KEY, value_converter } from '../../data';

const PlayVideo = ({ videoId }) => {
  const [apiData, setApiData] = useState(null);
  const [channelData, setChannelData] = useState(null);
  const [commentData, setCommentData] = useState([]);

  // Fetch Video Data
  const fetchVideoData = async () => {
    try {
      const videoDetails_url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet,statistics&id=${videoId}&key=${API_KEY}`;
      const response = await fetch(videoDetails_url);
      const data = await response.json();

      if (data.items && data.items.length > 0) {
        setApiData(data.items[0]);
      } else {
        console.error("No video data found.");
      }
    } catch (error) {
      console.error("Error fetching video data:", error);
    }
  };

  // Fetch Channel Data
  const fetchOtherData = async () => {
    if (!apiData || !apiData.snippet.channelId) return;

    try {
      const channelData_url = `https://youtube.googleapis.com/youtube/v3/channels?part=snippet,statistics&id=${apiData.snippet.channelId}&key=${API_KEY}`;
      const response = await fetch(channelData_url);
      const data = await response.json();

      if (data.items && data.items.length > 0) {
        setChannelData(data.items[0]);
      } else {
        console.error("No channel data found.");
      }
    } catch (error) {
      console.error("Error fetching channel data:", error);
    }
  };

  // Fetch Comments
  const fetchComments = async () => {
    try {
      const comment_url = `https://youtube.googleapis.com/youtube/v3/commentThreads?part=snippet%2Creplies&videoId=${videoId}&key=${API_KEY}`;
      const response = await fetch(comment_url);
      const data = await response.json();

      if (data.items) {
        setCommentData(data.items);
      } else {
        console.error("No comments found.");
      }
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };

  useEffect(() => {
    fetchVideoData();
  }, [videoId]);

  useEffect(() => {
    fetchOtherData();
  }, [apiData]); 

  useEffect(() => {
    fetchComments();
  }, [videoId]); // Fetch comments when videoId changes

  return (
    <div className='play-video'>
      <iframe
        src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      ></iframe>

      <h3>{apiData ? apiData.snippet.title : "Loading title..."}</h3>

      <div className="play-video-info">
        <p>
          {apiData ? value_converter(apiData.statistics.viewCount) : "0"} views &bull; 
          {apiData ? new Date(apiData.snippet.publishedAt).toDateString() : "Loading..."}
        </p>
        <div>
          <span>
            <img src={like} alt="Like button" /> 
            {apiData ? value_converter(apiData.statistics.likeCount) : 0}
          </span>
          <span><img src={dislike} alt="Dislike button" /> {apiData ? value_converter(apiData.statistics.likeCount) : 0}</span>
          <span><img src={share} alt="Share button" /> Share</span>
          <span><img src={save} alt="Save button" /> Save</span>
        </div>
      </div>
      <hr />

      <div className="publisher">
        <img src={channelData ? channelData.snippet.thumbnails.default.url : ""} alt='Channel profile' />
        <div>
          <p>{apiData ? apiData.snippet.channelTitle : "Loading Channel..."}</p>
          <span>{channelData ? value_converter(channelData.statistics.subscriberCount) : "1M"} Subscribers</span>
        </div>
        <button>Subscribe</button>
      </div>

      <div className="vid-description">
        <p>{apiData ? apiData.snippet.description.slice(0, 250) : "Description Here"}</p>
        <hr />
        <h4>{apiData ? value_converter(apiData.statistics.commentCount) : "102"} Comments</h4>
        <div className="comments">
          {commentData.length > 0 ? (
            commentData.map((comment, index) => (
              <div key={index} className="comment">
                <img src={comment.snippet.topLevelComment.snippet.authorProfileImageUrl} alt="User profile" />
                <div>
                  <p><strong>{comment.snippet.topLevelComment.snippet.authorDisplayName}</strong></p>
                  <p>{comment.snippet.topLevelComment.snippet.textDisplay}</p>
                </div>
              </div>
            ))
          ) : (
            <p>Loading comments...</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default PlayVideo;
