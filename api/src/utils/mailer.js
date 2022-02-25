import nodemailer from "nodemailer";
import { functionChecker } from "./typeChecker";
import config from "../config";

const sendMail = async (
  mailOptions,
  errorFn = () => {},
  successFn = () => {}
) => {
  var transporter = nodemailer.createTransport({
    host: config.email.host,
    port: 465,
    auth: {
      user: config.email.address,
      pass: config.email.password,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });
  transporter.verify().then(console.log).catch(console.error);

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      functionChecker(errorFn) && errorFn(error);
    } else {
      functionChecker(successFn) && successFn(info);
    }
  });
};

export { sendMail };
