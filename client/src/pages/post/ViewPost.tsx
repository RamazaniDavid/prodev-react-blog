import React from "react";
import { useParams } from "react-router-dom";
import "./ViewPost.scss";
import Sidebar from "../../components/layouts/sidebar/Sidebar";
import SinglePost from "../../components/dataContainers/singlePost/SinglePost";
import axios from "axios";

const ViewPost = () => {
  const { id } = useParams();
  const [post, setPost] = React.useState(null);

  React.useEffect(() => {
    let abortController = new AbortController();

    const getPostById = async () => {
      const res = await axios.get(`/api/posts/${id}`);
      setPost(res.data.model.post);
    };

    getPostById();

    return () => {
      abortController.abort();
    };
  }, [id]);

  return (
    <div className="viewPost">
      <SinglePost post={post} />
      <Sidebar />
    </div>
  );
};

export default ViewPost;
