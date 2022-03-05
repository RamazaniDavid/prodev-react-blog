import React from "react";
import "./EmailVerification.scss";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";

const EmailVerification = () => {
  const { token } = useParams();
  const nav = useNavigate();

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        const response = await axios.post("/api/auth/verifyEmail", {
          token,
        });
        if (response.data.success) {
          console.log("Email verified");
        }
      } catch (error) {
        console.log(error);
      }
    };
    verifyEmail();

    return () => {
      console.log("unmounting");
    };
  }, [token]);

  return (
    <div className="email-verification">
      <div className="email-verification__container">
        <div className="email-verification__container__title">
          Email Verification
        </div>
        <div className="email-verification__container__content">
          <div className="email-verification__container__content__text">
            {token ? "Verifying your email..." : "Invalid token"}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmailVerification;
