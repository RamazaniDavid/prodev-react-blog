import exp from "constants";
import React, { useState, useEffect } from "react";

const useFile = (file, onChange) => {
  const [fileState, setFileState] = useState({
    file: null,
    fileName: "",
    fileSize: 0,
    fileType: "",
    fileUrl: "",
  });

  useEffect(() => {
    if (file) {
      setFileState({
        file: file,
        fileName: file.name,
        fileSize: file.size,
        fileType: file.type,
        fileUrl: URL.createObjectURL(file),
      });
    } else {
      setFileState({
        file: null,
        fileName: "",
        fileSize: 0,
        fileType: "",
        fileUrl: "",
      });
    }
  }, [file]);

  useEffect(() => {
    if (onChange) {
      onChange(fileState);
    }
  }, [fileState]);

  return fileState;
};

export default useFile;
