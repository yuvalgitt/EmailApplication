import React from "react";
import ContentHeader from "./ContentHeader";
import ContentItem from "./ContentItem";
import ContentBottomHeader from "./ContentBottomHeader";

const ContentFeed = () => {
  return (
    <div
      style={{ height: "98%" }}
      className="flex flex-col flex-grow  w-96 rounded-3xl bg-gmail-darkgrey mr-6 text-white"
    >
      <ContentHeader></ContentHeader>
      <br />
      <div className="scrollbar-custom flex flex-col  overflow-auto flex-grow">
        {
            [...Array(50)].map((_, i) => (
              <ContentItem key={i} />
            ))
        }
      </div>
      <div className="flex flex-col-reverse  ">
        <ContentBottomHeader></ContentBottomHeader>
      </div>
    </div>
  );
};

export default ContentFeed;
