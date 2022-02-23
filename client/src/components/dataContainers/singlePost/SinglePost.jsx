import React from "react";
import { FaCalendarAlt, FaEdit, FaTrash } from "react-icons/fa";
import "./SinglePost.scss";

const SinglePost = () => {
  return (
    <div className="singlePost">
      <div className="singlePostWrapper">
        <img
          src="https://picsum.photos/1200/1300"
          className="singlePostImg"
          alt="post"
        />
        <h1 className="singlePostTitle">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit.
          <div className="siglePostEdit">
            <FaEdit className="singlePostIcon" />
            <FaTrash className="singlePostIcon" />
          </div>
        </h1>
        <div className="singlePostInfo">
          <span className="singlePostAuthor">
            Author : <b>David</b>
          </span>
          <span className="singlePostDate">
            <FaCalendarAlt className="singlePostIcon" />5 days ago
          </span>
        </div>
        <p className="singlePostDesc">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam
          quisquam, quisquam quisquam. Lorem, ipsum dolor sit amet consectetur
          adipisicing elit. Ad, illo officia optio inventore doloribus quam
          mollitia facilis natus quisquam commodi nobis qui reiciendis
          consectetur, esse, quasi quibusdam obcaecati atque aperiam!
        </p>
      </div>
    </div>
  );
};

export default SinglePost;
