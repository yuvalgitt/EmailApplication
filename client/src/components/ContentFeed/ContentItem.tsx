import {
  PaperAirplaneIcon,
  StarIcon,
  StopIcon,
} from "@heroicons/react/16/solid";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import serverUrl from "../../config/config";

interface Props {
  messageId: string;
}
const ContentItem = ({ messageId }: Props) => {
  const [messageData, setMessageData] = useState<any>({});
  const [date, setdate] = useState([[], []]);

  const getMessageData = async (messageId: string) => {
    const response = await axios.get(
      `${serverUrl}/users/api/gmail/message/${messageId}`,
      {
        withCredentials: true,
      }
    );
    return response.data;
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await getMessageData(messageId);
      setMessageData(response);
      const dateArray = response?.payload?.headers
        .find((x: any) => x.name === "Date")
        .value.split(" ");
      setdate([dateArray[1], dateArray[2]]);
    };
    fetchData();
  }, []);

  const navigate = useNavigate();
  const handleSelectMail = () => {
    navigate("/mail");
  };

  return (
    <div
      onClick={handleSelectMail}
      className="content-item border-t-2 p-3 h-10  cursor-pointer border-gmail-grey flex items-center "
    >
      {/* mail classification options */}
      <StopIcon className="content-header-svg"></StopIcon>
      <StarIcon className="content-header-svg ml-5"></StarIcon>
      <PaperAirplaneIcon className="content-header-svg ml-5"></PaperAirplaneIcon>

      <div className="ml-8 w-10/12 text-gmail-lightgrey flex justify-between  whitespace-nowrap overflow-hidden text-ellipsis">
        {/* Sent from */}
        <span className="text-white w-[23%] overflow-hidden text-ellipsis ">
          {
            messageData?.payload?.headers.find((x: any) => x.name === "From")
              .value
          }
        </span>{" "}
        {/* FROM */}
        {/* mail title */}
        <span className="text-white  pl-2 w-[33%] ">
          {
            messageData?.payload?.headers.find((x: any) => x.name === "Subject")
              .value
          }{" "}
          {/* SUBJECT */}
        </span>
        {/* mail contents */}
        <span className="text-gmail-lightgrey  pl-2 w-[33%] flex-grow">
          {" "}
          {/* SNIPPET */} {messageData?.snippet}
        </span>
      </div>
      <div className="flex flex-grow flex-row-reverse ">
        <span className="text-sm mr-2">
          {date[0]} {date[1]}{" "}
        </span>{" "}
        {/* DATE */}
      </div>
    </div>
  );
};

export default ContentItem;
