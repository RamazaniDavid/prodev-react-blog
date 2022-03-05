import React from "react";
import "./Sidebar.scss";
import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaPinterest,
  FaTwitter,
} from "react-icons/fa";
import { useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const [categories, setCategories] = React.useState([]);

  useEffect(() => {
    let abortController = new AbortController();

    const getCategories = async () => {
      const res = await axios.get("/api/categories");
      setCategories(res.data.model.categories);
    };

    getCategories();

    return () => {
      abortController.abort();
    };
  }, []);

  return (
    <>
      <div className="sidebar">
        <div className="sidebarItem">
          <span className="sidebarTitle">Aboute Me</span>
          <img
            src="https://avatars.githubusercontent.com/u/20882578?v=4"
            alt="profile"
          />
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit.
            Perspiciatis dolorum sunt.
          </p>
        </div>
        <div className="sidebarItem">
          <span className="sidebarTitle">Categories</span>
          <ul className="sidebarList">
            {categories.map((category:any, i) => (
              <li key={i} className="sidebarListItem">
                <Link to={`/Home?cat=${category.name}`}>{category.name}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="sidebarItem">
          <span className="sidebarTitle">Follow Me</span>
          <div className="sidebarSocial">
            <FaFacebook className="socialIcon facebook" />
            <FaPinterest className="socialIcon  pinterest" />
            <FaInstagram className="socialIcon  instagram" />
            <FaTwitter className="socialIcon twitter" />
            <FaLinkedin className="socialIcon linkedIn" />
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
