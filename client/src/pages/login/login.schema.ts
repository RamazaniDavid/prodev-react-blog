import * as yup from "yup";

export const loginSchema = yup
  .object()
  .shape({
    username: yup.string().trim().min(5).max(20).required(),
    password: yup.string().trim().min(8).max(20).required(),
  })
  .required();

export type LoginFormInputs = {
  username: string;
  password: string;
};
