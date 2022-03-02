import * as yup from "yup";
import axios from "axios";

const registerSchema = yup
  .object()
  .shape({
    username: yup
      .string()
      .trim()
      .min(5)
      .max(20)
      .required()
      .test("unique-username", "Username already exists", async (value) => {
        if (!value) return true;
        const res = await axios.get(`/api/users/checkUsername/${value}`);
        return !res.data.model.usernameExist;
      }),
    email: yup
      .string()
      .min(5)
      .trim()
      .email()
      .required()
      .test("unique-username", "Username already exists", async (value) => {
        if (!value) return true;
        const res = await axios.get(`/api/users/checkEmail/${value}`);
        return !res.data.model.emailExist;
      }),
    password: yup.string().trim().min(8).max(20).required(),
    confirmPassword: yup
      .mixed()
      .oneOf([yup.ref("password"), null], "Passwords must match")
      .required(),
  })
  .required();

export default registerSchema;
