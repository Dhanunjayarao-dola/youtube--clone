import React, { useState, useEffect } from 'react';
import './Recommended.css';
import { API_KEY } from '../../data';
import { value_converter } from '../../data';
import { Link } from 'react-router-dom';

const Recommended = ({ categoryId }) => {
    const [apiData, setApiData] = useState([]);

    const fetchData = async () => {
        try {
            const relatedVideo_url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=45&regionCode=US&videoCategoryId=${categoryId}&key=${API_KEY}`;
            
            const response = await fetch(relatedVideo_url);
            const data = await response.json();

            if (data?.items) {
                setApiData(data.items);
            } else {
                setApiData([]); 
            }
        } catch (error) {
            console.error("Error fetching data:", error);
            setApiData([]); 
        }
    };

    useEffect(() => {
        if (!categoryId) return; 
        fetchData();
    }, [categoryId]); 

    return (
        <div className='recommended'>
            {apiData.map((item) => (
                <Link to={`/video/${item.snippet.categoryId}/${item.id}`} key={item.id} className="side-video-list">
                    <img src={item.snippet.thumbnails.medium.url} alt='' />
                    <div className='vid-info'>
                        <h4>{item.snippet.title}</h4>
                        <p>{item.snippet.channelTitle}</p>
                        <p>{value_converter(item.statistics?.viewCount || 0)} views</p>
                    </div>
                </Link>
            ))}
        </div>
    );
};

export default Recommended;
