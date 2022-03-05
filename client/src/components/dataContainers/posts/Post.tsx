import React, { FunctionComponent } from "react";
import { Link } from "react-router-dom";
import "./Post.scss";

const Post:FunctionComponent<{post:any}> = ({ post }) => {
  return (
    <>
      <div className="post">
        {post.photo && (
          <img src={post.photo.proxyUrl} className="postImg" alt="post" />
        )}
        <div className="postInfo">
          <div className="postCats">
            {post.categories.map((cat:any, i:number) => (
              <div className="postCat" key={i}>
                {cat.name}
              </div>
            ))}
          </div>
          <Link to={`/post/${post._id}`}>
            <span className="postTitle">{post.title}</span>
          </Link>
          <hr />
          <span className="postDate">
            {new Date(post.createdAt).toDateString()}
          </span>
        </div>
        <p className="postDesc">{post.desc}</p>
      </div>
    </>
  );
};

export default Post;
