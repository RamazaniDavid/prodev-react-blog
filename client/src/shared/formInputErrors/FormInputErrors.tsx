import React, { FunctionComponent } from "react";
import "./FormInputErrors.module.scss";

const FormInputErrors :FunctionComponent<{error:any}>= ({ error }) => {
  if (!error) return null;
  if (!error.map) return <span className="error">{error.message}</span>;
  return (
    <ul className="error">
      {error.map((error:any, i:number) => (
        <li key={i}>{error.message}</li>
      ))}
    </ul>
  );
};

const FormErrors:FunctionComponent<{errors:any}> = ({ errors }) => {
  if (!errors) return null;
  if (errors.length === 0) return null;
  return (
    <ul className="error">
      {Object.keys(errors).map((key, i) => (
        <li key={i}>{errors[key].message}</li>
      ))}
    </ul>
  );
};

export { FormInputErrors, FormErrors };
