import React from "react";
import "./Write.scss";
import { FaPlus } from "react-icons/fa";
import { writeSchema, WriteFormInputs } from "./write.schema";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { FormErrors } from "../../shared/formInputErrors/FormInputErrors";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Write = () => {
  const form = useForm<WriteFormInputs>({
    mode: "onSubmit",
    reValidateMode: "onChange",
    defaultValues: {},
    resolver: yupResolver(writeSchema),
    criteriaMode: "all",
    shouldFocusError: true,
    shouldUnregister: false,
    shouldUseNativeValidation: false,
    delayError: 2000,
  });
  const nav = useNavigate();

  const selectedFile:any = form.watch("file");

  return (
    <>
      <div className="write">
        {selectedFile && selectedFile[0] ? (
          <>
            <img
              className="writeImg"
              src={URL.createObjectURL(selectedFile[0])}
              alt=""
            />
          </>
        ) : (
          <>
            <img
              className="writeImg"
              src="https://picsum.photos/1200/1300"
              alt=""
            />
          </>
        )}
        <form
          className="writeForm"
          onSubmit={form.handleSubmit(async (d:any) => {
            const { file, ...rest } = d;
            const formData = new FormData();
            formData.append("file", file[0]);
            Object.keys(rest).forEach((key) => {
              formData.append(key, rest[key]);
            });
            const res = await axios.post("/api/posts", formData, {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            });
            form.reset();
            nav(`/post/${res.data.model.post._id}`, { replace: true });
          })}
        >
          <div className="writeFormGroup">
            <label htmlFor="fileInput">
              <FaPlus className="writeIcon" />
            </label>
            <input
              {...form.register("file")}
              type="file"
              id="fileInput"
              name="file"
              style={{ display: "none" }}
            />
            <input
              {...form.register("title")}
              type="text"
              className="writeInput"
              placeholder="Title"
            />
          </div>
          <div className="writeFormGroup">
            <textarea
              {...form.register("desc")}
              className="writeInput writeText"
              placeholder="Tell your story..."
            />
          </div>
          <button
            className="writeSubmit"
            type="submit"
            disabled={
              form.formState.isSubmitting || form.formState.isValidating
            }
          >
            Publish
          </button>
          <FormErrors errors={form.formState.errors} />
        </form>
      </div>
    </>
  );
};

export default Write;
