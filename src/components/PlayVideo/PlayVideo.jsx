import React from 'react'
import './PlayVideo.css'
import Video1 from '../../assets/video.mp4'
import like from '../../assets/like.png'
import dislike from '../../assets/dislike.png'
import share from '../../assets/share.png'
import save from '../../assets/save.png'
import jack from '../../assets/jack.png'
import user_profile from '../../assets/user_profile.jpg'

const PlayVideo = () => {
  const videoDetails = {
    views: 1539,
    date: "2 days ago",
    title: "Best YouTube Channel To Learn Web Development",
  };

  const comments = [
    { name: "Jack Nicholson", date: "1 day ago", text: "A global computer network providing a variety of information", likes: 234 },
    { name: "Alice Johnson", date: "2 days ago", text: "This is an amazing video!", likes: 120 },
  ];

  return (
    <div className='play-video'>
        <video src={Video1} controls autoPlay muted playsInline></video>
        <h3>{videoDetails.title}</h3>
        <div className="play-video-info">
            <p>{videoDetails.views} views &bull; {videoDetails.date}</p>
            <div>
                <span><img src={like} alt="Like button" />125</span>
                <span><img src={dislike} alt="Dislike button" /> 2</span>
                <span><img src={share} alt="Share button" />share</span>
                <span><img src={save} alt="Save button" />save</span>
            </div>
        </div>
        <hr/>
        <div className="publisher">
            <img src={jack} alt='Channel profile picture' />
            <div>
                <p>GreatStack</p>
                <span>1M Subscribers</span>
            </div>
            <button>Subscribe</button>
        </div>
        <div className="vid-description">
            <p>Channel that makes learning Easy</p>
            <p>Subscribe Greatstack to Watch More Tutorials on Web Development</p>
            <hr />
            <h4>{comments.length} Comments</h4>
            {comments.map((comment, index) => (
              <div className="comment" key={index}>
                <img src={user_profile} alt="User profile" />
                <div>
                  <h3>{comment.name} <span>{comment.date}</span></h3>
                  <p>{comment.text}</p>
                  <div className="comment-action">
                    <img src={like} alt="Like" />
                    <span>{comment.likes}</span>
                    <img src={dislike} alt="Dislike" />
                  </div>
                </div>
              </div>
            ))}
        </div>
    </div>
  )
}

export default PlayVideo