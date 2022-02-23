import React from "react";
import Posts from "../../components/dataContainers/posts/Posts";
import Header from "../../components/layouts/header/Header";
import SideBar from "../../components/layouts/sideBar/SideBar";
import "./Home.scss";
const Home = (props) => {
  return (
    <>
      <Header />

      <div className="home">
        <Posts />
        <SideBar />
      </div>
    </>
  );
};

export default Home;
