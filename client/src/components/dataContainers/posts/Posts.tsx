import React, { FunctionComponent } from "react";
import "./Posts.scss";
import Post from "./Post";

const Posts:FunctionComponent<{posts:never[]}> = ({ posts }) => {
  return (
    <>
      <div className="posts">
        {posts.map((post:any) => (
          <Post key={post._id} post={post} />
        ))}
      </div>
    </>
  );
};

export default Posts;
