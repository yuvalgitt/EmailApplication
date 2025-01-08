import React from "react";
import ContentHeader from "./ContentFeed/ContentHeader";
import ContentItem from "./ContentFeed/ContentItem";
import ContentBottomHeader from "./ContentFeed/ContentBottomHeader";

const ContentFeed = () => {
  return (
    <div
      style={{ height: "98%", width: "82.5%" }}
      className="flex flex-col  flex-grow rounded-3xl bg-gmail-darkgrey mr-6 text-white w-full"
    >
      <ContentHeader></ContentHeader>
      <br />
      <div className="scrollbar-custom flex flex-col  overflow-auto">
        <ContentItem></ContentItem>
        <ContentItem></ContentItem>
        <ContentItem></ContentItem>
        <ContentItem></ContentItem>
        <ContentItem></ContentItem>
        <ContentItem></ContentItem>
        <ContentItem></ContentItem>
      </div>
      <div className="flex flex-col-reverse flex-grow">
        <ContentBottomHeader></ContentBottomHeader>
      </div>
    </div>
  );
};

export default ContentFeed;
