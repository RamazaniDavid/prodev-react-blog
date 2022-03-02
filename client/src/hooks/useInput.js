import { useRef, useState } from "react";

const useInput = (initialValue, options = {}) => {
  const {
    type = "text",
    name = "",
    placeholder = "",
    disabled = false,
    required = false,
    pattern = "",
    className = "",
    style = {},
    validators = [],
    onChange,
  } = options;

  const [value, setValue] = useState(initialValue);
  const [errors, setErrors] = useState([]);
  const [touched, setTouched] = useState(false);
  const [dirty, setDirty] = useState(false);
  const inputEl = useRef(null);

  const validate = (e) => {
    let errs = [];
    if (validators)
      errs.push(
        ...validators.map(async (validator) => await validator(e.target.value))
      );
    if (required && e.target.value === "") {
      errs.push([`${name} is required`]);
    }
    if (pattern && !e.target.value.match(pattern)) {
      errs.push([`${name} is not valid`]);
    }

    setErrors(
      errs.reduce((acc, curr) => {
        if (curr) acc.push(curr);
        return acc;
      }, [])
    );
  };

  return {
    touched,
    dirty,
    hasError: !!(touched && dirty && errors),
    error: errors,
    setValue,
    focus: () => inputEl.current.focus(),
    resetState: () => {
      setValue(initialValue);
      setErrors([]);
      setTouched(false);
      setDirty(false);
    },
    inputEl,
    errorsUL: (
      <ul
        style={{
          fontSize: "small",
          color: "red",
          margin: "5px 25px",
        }}
      >
        {errors.map((error, index) => (
          <li key={index}>{error}</li>
        ))}
      </ul>
    ),
    toAssign: {
      type,
      value,
      placeholder,
      required,
      onFocus: () => setTouched(true),
      onChange: (e) => {
        setValue(e.target.value);
        setDirty(true);
        if (onChange) onChange(e);
        if (errors) validate(e);
      },
      onBlur: (e) => {
        setTouched(true);

        if (touched && dirty) {
          validate(e.target.value);
        }
      },
      disabled,
      pattern,
      className,
      style,
      ref: inputEl,
    },
  };
};

export default useInput;
