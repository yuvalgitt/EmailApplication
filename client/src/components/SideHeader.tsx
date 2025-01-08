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
import { NavigateFunction, useNavigate } from "react-router-dom";

interface Props {
  hamburgerToggle: boolean;
}
const SideHeader = ({ hamburgerToggle }: Props) => {
  const navigate: NavigateFunction = useNavigate();

  return (
    <div
      className={`flex flex-col duration-300 ease-out text-gray-600  ${
        hamburgerToggle ? "w-2/12" : "w-16"
      } max-h-full overflow-hidden`}
    >
      <div
        className={`h-16  ${
          hamburgerToggle ? "w-48" : " w-12"
        } flex bg-white rounded-2xl m-1 duration-300 items-center
        `}
      >
        <PencilIcon className="h-7 w-7 label-svg ml-1.5"></PencilIcon>
        <span
          style={{ opacity: hamburgerToggle ? 1 : 0 }}
          className="ml-10 mr-5"
        >
          Compose
        </span>
      </div>
      {/* INBOX  ↓	*/}
      <div onClick={() => navigate("feed")} className="label">
        <InboxArrowDownIcon className="label-svg"></InboxArrowDownIcon>
        <span
          style={{ opacity: hamburgerToggle ? 1 : 0 }}
          className="duration-300 ml-10"
        >
          Inbox
        </span>
      </div>
      <div className="label">
        <StarIcon className="label-svg"></StarIcon>
        <span
          style={{ opacity: hamburgerToggle ? 1 : 0 }}
          className="duration-300 ml-10"
        >
          Starred
        </span>
      </div>
      <div className="label">
        <ClockIcon className="label-svg"></ClockIcon>
        <span
          style={{ opacity: hamburgerToggle ? 1 : 0 }}
          className="duration-300 ml-10"
        >
          Snoozed
        </span>
      </div>
      <div className="label">
        <PaperAirplaneIcon className="label-svg"></PaperAirplaneIcon>
        <span
          style={{ opacity: hamburgerToggle ? 1 : 0 }}
          className="duration-300 ml-10"
        >
          Important
        </span>
      </div>
      <div className="label">
        <ChevronDoubleRightIcon className="label-svg"></ChevronDoubleRightIcon>
        <span
          style={{ opacity: hamburgerToggle ? 1 : 0 }}
          className="duration-300 ml-10"
        >
          Sent
        </span>
      </div>
      <div className="label">
        <ClockIcon className="label-svg"></ClockIcon>
        <span
          style={{ opacity: hamburgerToggle ? 1 : 0 }}
          className="duration-300 ml-10"
        >
          Snoozed
        </span>
      </div>
      <div className="label">
        <DocumentIcon className="label-svg"></DocumentIcon>
        <span
          style={{ opacity: hamburgerToggle ? 1 : 0 }}
          className="duration-300 ml-10"
        >
          Drafts
        </span>
      </div>
      <div className="label ">
        <ExclamationCircleIcon className="label-svg"></ExclamationCircleIcon>
        <span
          style={{ opacity: hamburgerToggle ? 1 : 0 }}
          className="duration-300 ml-10"
        >
          Spam
        </span>
      </div>
    </div>
  );
};

export default SideHeader;
