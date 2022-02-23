import React from "react";
import "./Post.scss";
import { FaCalendarAlt } from "react-icons/fa";

const Post = () => {
  return (
    <>
      <div className="post">
        <img
          src="https://picsum.photos/200/300"
          className="postImg"
          alt="post"
        />
        <div className="postInfo">
          <div className="postCats">
            <div className="postCat">Music</div>
            <div className="postCat">Life</div>
          </div>
          <span className="postTitle">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit.
          </span>
          <hr />
          <span className="postDate">5 days ago</span>
        </div>
      </div>
    </>
  );
};

export default Post;
