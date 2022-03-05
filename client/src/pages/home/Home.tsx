import React from "react";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Posts from "../../components/dataContainers/posts/Posts";
import Header from "../../components/layouts/header/Header";
import Sidebar from "../../components/layouts/sidebar/Sidebar";
import axios from "axios";
import "./Home.scss";
import { useUser } from "../../hooks/useUser";

const Home = () => {
  const [posts, setPosts] = React.useState([]);
  let query = useLocation();


  useEffect(() => {
    let abortController = new AbortController();

    const fetchPosts = async () => {
      const res = await axios.get(`/api/posts${query.search}`);
      setPosts(res.data.model.posts);
    };

    fetchPosts();

    return () => {
      abortController.abort();
    };
  }, [query]);
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
