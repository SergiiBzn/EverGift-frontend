/** @format */

import { toast } from "react-toastify";

export const improveErrorMessage = async (error, closeAfter) => {
  const errorArray = error
    .split("✖")
    .map((error) => "✖" + error)
    .filter((error) => error !== "✖");
  console.log("error", errorArray);

  toast.error(errorArray.join("\n"), {
    autoClose: closeAfter,
    // This allows line breaks in the toast message
    style: { whiteSpace: "pre-line" },
  });
};
