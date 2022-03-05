import React, { FunctionComponent } from "react";
import { FaCalendarAlt, FaEdit, FaTrash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../../../hooks/useUser";
import "./SinglePost.scss";
import axios from "axios";

const SinglePost :FunctionComponent<{post:any}>= ({ post }) => {
  const user = useUser();

  const nav = useNavigate();

  const handleDelete = async () => {
    const response = await axios.delete(`/api/posts/${post._id}`);
    if (response.status === 200 && response.data.success) {
      nav("/");
    }
  };

  if (!post) return null;
  return (
    <div className="singlePost">
      <div className="singlePostWrapper">
        {post.photo && (
          <img src={post.photo.proxyUrl} className="singlePostImg" alt="post" />
        )}
        <h1 className="singlePostTitle">
          {post.title}
          {user && user.username === post.username && (
            <div className="siglePostEdit">
              <FaEdit className="singlePostIcon" />
              <FaTrash className="singlePostIcon" onClick={handleDelete} />
            </div>
          )}
        </h1>
        <div className="singlePostInfo">
          <span className="singlePostAuthor">
            <Link to={`/home?user=${post.username}`}>
              Author : <b>David</b>
            </Link>
          </span>
          <span className="singlePostDate">
            <FaCalendarAlt className="singlePostIcon" />
            {new Date(post.createdAt).toDateString()}
          </span>
        </div>
        <p className="singlePostDesc">{post.desc}</p>
      </div>
    </div>
  );
};

export default SinglePost;
