import * as yup from "yup";

export const writeSchema = yup.object().shape({
  title: yup.string().trim().min(5).max(50).required(),
  desc: yup.string().trim().min(5).required(),
  file: yup
    .mixed()
    .test("file", "File is required", ([value]) => value && value.size > 0)
    .test("fileSize", "File too small", ([value]) => {
      return !value || (value && value.size >= 1024 * 128);
    })
    .test("fileSize", "File too larg", ([value]) => {
      return !value || (value && value.size <= 1024 * 1024 * 5);
    })
    .test(
      "fileFormat",
      "Unsupported file type",
      ([value]) =>
        !value ||
        (value &&
          ["image/jpg", "image/jpeg", "image/gif", "image/png"].includes(
            value.type
          ))
    ),
});

export type WriteFormInputs = {
  title: string;
  desc: string;
  file: File;
};
