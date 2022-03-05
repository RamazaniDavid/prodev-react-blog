import "./TopBar.scss";
import {
  FaFacebook,
  FaPinterest,
  FaInstagram,
  FaTwitter,
  FaLinkedin,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import { useUser } from "../../../hooks/useUser";
import useDispatch from "../../../hooks/useDispatch";
import { Logout } from "../../../store/Actions";

const TopBar = () => {
  const user = useUser();
  const dispatch = useDispatch();

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
            <Link to="/">Home</Link>
          </li>
          <li className="topListItem">
            <Link to="/About">About</Link>
          </li>
          <li className="topListItem">
            <Link to="/Contact">Contact</Link>
          </li>
          <li className="topListItem">
            <Link to="/Write">Write</Link>
          </li>
          {user && (
            <>
              <li className="topListItem">
                <Link to="/settings">Profile</Link>
              </li>
              <li
                className="topListItem"
                onClick={() => {
                  dispatch(Logout());
                }}
              >
                Logout
              </li>
            </>
          )}
        </ul>
      </div>
      <div className="topRight">
        {user ? (
          <Link to="/settings">
            <img
              className="topImg"
              src={user.photoURL ?? "https://picsum.photos/200/200?grayscale"}
              alt=""
            />
          </Link>
        ) : (
          <ul className="topList">
            <li className="topListItem">
              <Link className="link" to="/login">
                LOGIN
              </Link>
            </li>
            <li className="topListItem">
              <Link className="link" to="/register">
                REGISTER
              </Link>
            </li>
          </ul>
        )}
      </div>
    </div>
  );
};

export default TopBar;
