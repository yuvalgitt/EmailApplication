import {
  ChevronDoubleRightIcon,
  ClockIcon,
  DocumentIcon,
  ExclamationCircleIcon,
  InboxArrowDownIcon,
  PaperAirplaneIcon,
  PencilIcon,
  StarIcon,
} from "@heroicons/react/16/solid";
import React from "react";

const SideHeader = () => {
  return (
    <div className=" text-gray-600  w-2/12 h-full">
      <div className="h-16 w-36 compose flex bg-white rounded-2xl ml-2 m-3 mr-28 items-center">
        <PencilIcon className="h-7 w-7 label-svg "></PencilIcon>
        <span className="ml-2 mr-5">Compose</span>
      </div>
      <div className="label">
        <InboxArrowDownIcon className="label-svg"></InboxArrowDownIcon>
        <span className="ml-4">Inbox</span>
      </div>
      <div className="label">
        <StarIcon className="label-svg"></StarIcon>
        <span className="ml-4">Starred</span>
      </div>
      <div className="label">
        <ClockIcon className="label-svg"></ClockIcon>
        <span className="ml-4">Snoozed</span>
      </div>
      <div className="label">
        <PaperAirplaneIcon className="label-svg"></PaperAirplaneIcon>
        <span className="ml-4">Important</span>
      </div>
      <div className="label">
        <ChevronDoubleRightIcon className="label-svg"></ChevronDoubleRightIcon>
        <span className="ml-4">Sent</span>
      </div>
      <div className="label">
        <ClockIcon className="label-svg"></ClockIcon>
        <span className="ml-4">Snoozed</span>
      </div>
      <div className="label">
        <DocumentIcon className="label-svg"></DocumentIcon>
        <span className="ml-4">Drafts</span>
      </div>
      <div className="label">
        <ExclamationCircleIcon className="label-svg"></ExclamationCircleIcon>
        <span className="ml-4">Spam</span>
      </div>
    </div>
  );
};

export default SideHeader;
