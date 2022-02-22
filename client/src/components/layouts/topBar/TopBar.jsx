import "./TopBar.scss";
import {
  FaFacebook,
  FaPinterest,
  FaInstagram,
  FaTwitter,
  FaHome,
  FaInfo,
  FaPencilAlt,
  FaLinkedin,
} from "react-icons/fa";
import { MdConnectWithoutContact } from "react-icons/md";

const TopBar = () => {
  return (
    <div className="top">
      <div className="topLeft">
        <div className="topSocialIcon">
          <FaFacebook className="socialIcon facebook" />
          <FaPinterest className="socialIcon  pinterest" />
          <FaInstagram className="socialIcon  instagram" />
          <FaTwitter className="socialIcon twitter" />
          <FaLinkedin className="socialIcon linkedIn" />
        </div>
      </div>
      <div className="topCenter">
        <ul className="topList">
          <li className="topListItem">
            <FaHome /> Home
          </li>
          <li className="topListItem">
            <FaInfo /> About
          </li>
          <li className="topListItem">
            <MdConnectWithoutContact /> Contact
          </li>
          <li className="topListItem">
            <FaPencilAlt />
            Write
          </li>
        </ul>
      </div>
      <div className="topRight">
        <div className="topRightItem">
          <img
            src="https://avatars.githubusercontent.com/u/20882578?v=4"
            alt="profile"
          />
        </div>
      </div>
    </div>
  );
};

export default TopBar;
