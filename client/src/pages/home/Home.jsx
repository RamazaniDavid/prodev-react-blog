import React from "react";
import { useEffect, useState } from "react";
import Posts from "../../components/dataContainers/posts/Posts";
import Header from "../../components/layouts/header/Header";
import Sidebar from "../../components/layouts/sidebar/Sidebar";
import axios from "axios";

import "./Home.scss";
const Home = (props) => {
  const [posts, setPosts] = React.useState([]);
  useEffect(() => {
    let abortController = new AbortController();

    const fetchPosts = async () => {
      const res = await axios.get("/posts");
      setPosts(res.data);
    };

    fetchPosts();

    return () => {
      abortController.abort();
    };
  }, []);
  return (
    <>
      <Header />

      <div className="home">
        <Posts posts={posts} />
        <Sidebar />
      </div>
    </>
  );
};

export default Home;
