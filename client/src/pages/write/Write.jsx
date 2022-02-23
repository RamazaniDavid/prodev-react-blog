import React from "react";
import "./Write.scss";
import { FaPlus } from "react-icons/fa";

const Write = (props) => {
  return (
    <>
      <div className="write">
        <img
          className="writeImg"
          src="https://picsum.photos/1200/1300"
          alt=""
        />
        <form className="writeForm">
          <div className="writeFormGroup">
            <label htmlFor="fileInput">
              <FaPlus className="writeIcon" />
            </label>
            <input type="file" id="fileInput" style={{ display: "none" }} />
            <input type="text" className="writeInput" placeholder="Title" />
          </div>
          <div className="writeFormGroup">
            <textarea
              type="text"
              className="writeInput writeText"
              placeholder="Tell your story..."
            />
          </div>
          <button className="writeSubmit">Publish</button>
        </form>
      </div>
    </>
  );
};

export default Write;
