import React, { useEffect, useState } from "react";
import axios from "axios";
import { message } from "antd";
import Avatar from "@mui/material/Avatar";

import PhotoGallery from "./PhotoGallery";
import { BASE_URL, TOKEN_KEY } from "../constants";
import { getUsername } from "../utils/auth";

function Profile() {
  const token = localStorage.getItem(TOKEN_KEY);
  const username = getUsername(token);
  const [posts, setPosts] = useState([]);

  // Load all posts made by the current user
  useEffect(() => {
    axios({
      method: "GET",
      url: `${BASE_URL}/search?user=${encodeURIComponent(username)}`,
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => setPosts(res.data || []))
      .catch(() => message.error("Failed to load your posts!"));
  }, [username, token]);

  const images = posts
    .filter((post) => post.type === "image")
    .map((post) => ({
      postId: post.id,
      src: post.url,
      user: post.user,
      caption: post.message,
      thumbnail: post.url,
      thumbnailWidth: 300,
      thumbnailHeight: 200,
    }));
  const videos = posts.filter((post) => post.type === "video");

  // Keep the post count in sync after a post is deleted in the gallery
  const handleDeleted = (postId) => {
    setPosts((prev) => prev.filter((post) => post.id !== postId));
  };

  return (
    <div className="profile">
      <div className="profile-card">
        <Avatar sx={{ width: 72, height: 72, bgcolor: "#3c2164", fontSize: 32 }}>
          {username.charAt(0).toUpperCase()}
        </Avatar>
        <div>
          <h2 className="profile-name">{username}</h2>
          <p className="profile-stats">
            {posts.length} posts · {images.length} images · {videos.length} videos
          </p>
        </div>
      </div>

      <h3 className="profile-section-title">My Posts</h3>
      {posts.length === 0 && (
        <p className="profile-empty">You haven't posted anything yet.</p>
      )}
      {images.length > 0 && (
        <PhotoGallery images={images} onDeleted={handleDeleted} />
      )}
      {videos.map((video) => (
        <video key={video.id} src={video.url} controls className="profile-video" />
      ))}
    </div>
  );
}

export default Profile;
