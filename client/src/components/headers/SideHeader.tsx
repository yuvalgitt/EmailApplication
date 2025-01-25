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
        hamburgerToggle ? "sm:w-32 lg:w-80" : "lg:w-16 sm:w-14"
      } max-h-full overflow-hidden`}
    >
      <div
        className={`lg:h-16 sm:h-8  ${
          hamburgerToggle ? "lg:w-48 sm:w-30" : " w-12"
        } flex bg-white rounded-2xl m-1 duration-300 items-center
        `}
      >
        <PencilIcon className="h-7 w-7 label-svg ml-1.5"></PencilIcon>
        <span
          style={{ opacity: hamburgerToggle ? 1 : 0 }}
          className="label-text"
        >
          Compose
        </span>
      </div>
      {/* INBOX  ↓	*/}
      <div onClick={() => navigate("feed")} className="label">
        <InboxArrowDownIcon className="label-svg"></InboxArrowDownIcon>
        <span
          style={{ opacity: hamburgerToggle ? 1 : 0 }}
          className="duration-300 ml-10  lg:text-lg sm:text-xs"
        >
          Inbox
        </span>
      </div>
      <div className="label">
        <StarIcon className="label-svg"></StarIcon>
        <span
          style={{ opacity: hamburgerToggle ? 1 : 0 }}
          className="duration-300 ml-10 lg:text-lg sm:text-xs "
        >
          Starred
        </span>
      </div>
      <div className="label">
        <ClockIcon className="label-svg"></ClockIcon>
        <span
          style={{ opacity: hamburgerToggle ? 1 : 0 }}
          className="duration-300 ml-10 lg:text-lg sm:text-xs "
        >
          Snoozed
        </span>
      </div>
      <div className="label">
        <PaperAirplaneIcon className="label-svg"></PaperAirplaneIcon>
        <span
          style={{ opacity: hamburgerToggle ? 1 : 0 }}
          className="duration-300 ml-10 lg:text-lg sm:text-xs "
        >
          Important
        </span>
      </div>
      <div className="label">
        <ChevronDoubleRightIcon className="label-svg"></ChevronDoubleRightIcon>
        <span
          style={{ opacity: hamburgerToggle ? 1 : 0 }}
          className="duration-300 ml-10 lg:text-lg sm:text-xs "
        >
          Sent
        </span>
      </div>
      <div className="label">
        <ClockIcon className="label-svg"></ClockIcon>
        <span
          style={{ opacity: hamburgerToggle ? 1 : 0 }}
          className="duration-300 ml-10 lg:text-lg sm:text-xs "
        >
          Snoozed
        </span>
      </div>
      <div className="label">
        <DocumentIcon className="label-svg"></DocumentIcon>
        <span
          style={{ opacity: hamburgerToggle ? 1 : 0 }}
          className="duration-300 ml-10 lg:text-lg sm:text-xs "
        >
          Drafts
        </span>
      </div>
      <div className="label ">
        <ExclamationCircleIcon className="label-svg"></ExclamationCircleIcon>
        <span
          style={{ opacity: hamburgerToggle ? 1 : 0 }}
          className="duration-300 ml-10 lg:text-lg sm:text-xs "
        >
          Spam
        </span>
      </div>
    </div>
  );
};

export default SideHeader;
