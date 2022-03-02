import React from "react";
import c from "./index.module.scss";

const FormInputErrors = ({ error }) => {
  if (!error) return null;
  if (!error.map) return <span className={c.error}>{error.message}</span>;
  return (
    <ul className={c.error}>
      {error.map((error, i) => (
        <li key={i}>{error.message}</li>
      ))}
    </ul>
  );
};

const FormErrors = ({ errors }) => {
  if (!errors) return null;
  if (errors.length === 0) return null;
  return (
    <ul className={c.error}>
      {Object.keys(errors).map((key, i) => (
        <li key={i}>{errors[key].message}</li>
      ))}
    </ul>
  );
};

export { FormInputErrors, FormErrors };
