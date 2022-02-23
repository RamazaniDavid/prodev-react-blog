import React from "react";
import Posts from "../../components/dataContainers/posts/Posts";
import Header from "../../components/layouts/header/Header";
import Sidebar from "../../components/layouts/sidebar/Sidebar";
import "./Home.scss";
const Home = (props) => {
  return (
    <>
      <Header />

      <div className="home">
        <Posts />
        <Sidebar />
      </div>
    </>
  );
};

export default Home;
