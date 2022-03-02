import { useCallback, useEffect, useRef } from "react";

const useVirtualFileInput = (callback, opts) => {
  const input = useRef();

  useEffect(() => {
    input.current = document.createElement("input");
    input.current.type = "file";
  }, []);

  useEffect(() => {
    if (input.current) {
      if (opts) {
        input.current.accept = opts.accept || "";
        input.current.multiple = !!opts.multiple;
      } else {
        input.current.accept = "";
        input.current.multiple = false;
      }
    }
  }, [opts]);

  useEffect(() => {
    if (input.current) {
      input.current.onchange = () => {
        if (input.current && input.current.files) {
          callback(input.current.files);
        }
      };
    }
  }, [callback]);

  return useCallback(() => {
    if (input.current) {
      input.current.value = "";
      input.current.click();
    }
  }, [input]);
};

export default useVirtualFileInput;
