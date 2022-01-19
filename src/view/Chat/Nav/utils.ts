import { ChatEmpty } from "../../../components/Icon/Generic/ChatEmpty";
import { CreateIcon } from "../../../components/Icon/Generic/Create";
import { EmptyNotificationIcon } from "../../../components/Icon/Generic/EmptyNotification";
import { GlobeIcon } from "../../../components/Icon/Generic/Globe";
import { SettingIcon } from "../../../components/Icon/Generic/Setting";

export const navLinks = [
  {
    title: "Global",
    icon: GlobeIcon({}),
  },
  {
    title: "Chats",
    icon: ChatEmpty({}),
  },
  {
    title: "Create",
    icon: CreateIcon({}),
  },
  {
    title: "Notification",
    icon: EmptyNotificationIcon({}),
  },
  {
    title: "Setting",
    icon: SettingIcon({}),
  },
];
