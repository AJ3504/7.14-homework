import { useState } from "react";

const useInput = () => {
  //state
  const [value, setValue] = useState("");

  //hanlder
  const handler = (e) => {
    setValue(e.target.value);
  };
  const reset = () => {
    setValue("");
  };

  return [value, handler, reset];
};

export default useInput;
