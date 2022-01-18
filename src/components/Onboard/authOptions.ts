import { EmailIcon } from "../Icon/Generic/Email";
import { LogoGithub } from "../Icon/Logo/Github";
import { LogoGoogle } from "../Icon/Logo/Google";
import { LogoTwitter } from "../Icon/Logo/Twitter";
import { AuthMethod } from "./BottomSheet/Content";

type AuthOption = {
  title: AuthMethod;
  icon: JSX.Element;
};

const oauth: AuthOption[] = [
  {
    title: "google",
    icon: LogoGoogle({}),
  },
  {
    title: "twitter",
    icon: LogoTwitter({}),
  },
  {
    title: "github",
    icon: LogoGithub({}),
  },
  {
    title: "email",
    icon: EmailIcon({}),
  },
];

export default oauth;
