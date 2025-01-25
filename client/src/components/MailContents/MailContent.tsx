import React from "react";
import Mailheader from "./Mailheader";

const MailContent = () => {
  return (
    <div
      style={{ height: "98%"}}
      className="flex flex-col  flex-grow rounded-3xl bg-gmail-darkgrey mr-6 text-white"
    >
      <Mailheader></Mailheader>
    </div>
  );
};

export default MailContent;
