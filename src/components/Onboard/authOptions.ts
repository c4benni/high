import { LogoApple } from "../Icon/Logo/Apple";
import { LogoGithub } from "../Icon/Logo/Github";
import { LogoGoogle } from "../Icon/Logo/Google";
import { LogoTwitter } from "../Icon/Logo/Twitter";

type AuthOption = {
  title: string;
  icon: JSX.Element;
};

const oauth: AuthOption[] = [
  {
    title: "Apple",
    icon: LogoApple({}),
  },
  {
    title: "Google",
    icon: LogoGoogle({}),
  },
  {
    title: "Twitter",
    icon: LogoTwitter({}),
  },
  {
    title: "Github",
    icon: LogoGithub({}),
  },
];

export default oauth;
