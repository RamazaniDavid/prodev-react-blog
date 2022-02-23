import React from "react";
import "./Sidebar.scss";
import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaPinterest,
  FaTwitter,
} from "react-icons/fa";

const Sidebar = () => {
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
            <li className="sidebarListItem">
              <a href="#">Web Development</a>
            </li>
            <li className="sidebarListItem">
              <a href="#">Mobile Development</a>
            </li>
            <li className="sidebarListItem">
              <a href="#">UI/UX Design</a>
            </li>
            <li className="sidebarListItem">
              <a href="#">Data Science</a>
            </li>
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
