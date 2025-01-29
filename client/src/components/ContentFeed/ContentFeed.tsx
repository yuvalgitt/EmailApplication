import React, { useEffect, useState } from "react";
import ContentHeader from "./ContentHeader";
import ContentItem from "./ContentItem";
import ContentBottomHeader from "./ContentBottomHeader";
import axios from "axios";
import serverUrl from "../../config/config";

const ContentFeed = () => {

  const [messagesArray, setMessagesArray] = useState<[]>([])

  const getInbox = async() => {
      const response = await axios.get(`${serverUrl}/users/api/gmail/inbox`,{
        withCredentials : true
      })
      return response.data
  }

  useEffect(()=> {
    const fetch = async() => {
        const inbox = await getInbox()
        setMessagesArray(inbox)
    }
    fetch()
  },[])

  return (
    <div
      style={{ height: "98%" }}
      className="flex flex-col flex-grow  w-96 rounded-3xl bg-gmail-darkgrey mr-6 text-white"
    >
      <ContentHeader></ContentHeader>
      <br />
      <div className="scrollbar-custom flex flex-col  overflow-auto flex-grow">
        {messagesArray.map((x : any,i)=> {
          return (<ContentItem messageId={x.id} key={i} ></ContentItem>)
        })}
      </div>
      <div className="flex flex-col-reverse  ">
        <ContentBottomHeader></ContentBottomHeader>
      </div>
    </div>
  );
};

export default ContentFeed;
