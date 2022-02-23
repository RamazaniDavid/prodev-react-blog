import React from "react";
import "./ViewPost.scss";
import Sidebar from "../../components/layouts/sidebar/Sidebar";
import SinglePost from "../../components/dataContainers/singlePost/SinglePost";

const ViewPost = () => {
  return (
    <div className="viewPost">
      <SinglePost />
      <Sidebar />
    </div>
  );
};

export default ViewPost;
