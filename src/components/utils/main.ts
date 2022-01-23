import { GetReaction, ReactionType } from "./types";

export type ClassName = string | object | ClassName[];

export function className(arg: ClassName): string {
  if (typeof arg == "string") {
    return arg.trim().replace(/\s+/, " ");
  }

  const isArray = Array.isArray(arg);

  const validClassName: string[] = [];

  const getValidClasses = () =>
    validClassName
      .filter((item, index) => validClassName.indexOf(item) === index)
      .join(" ")
      .trim()
      .replace(/\s+/, " ");

  if (typeof arg == "object" && !isArray) {
    const entries = Object.entries(arg);

    entries.forEach((entry) => {
      if (entry[1]) {
        validClassName.push(entry[0]);
      }
    });

    return getValidClasses();
  }

  if (isArray) {
    const flatten = arg.flat(Infinity);

    flatten.forEach((item) => {
      const getClassName = className(item);

      if (typeof getClassName == "string") {
        validClassName.push(getClassName);
      }
    });

    return getValidClasses();
  }

  return "";
}

export function getReaction(str: ReactionType): GetReaction {
  switch (str) {
    case "exclaim":
      return {
        title: "Exclaimation mark",
        emoji: "‼",
      };
    case "laugh":
      return {
        title: "Laughing face",
        emoji: "😂",
      };
    case "love":
      return {
        title: "Red heart",
        emoji: "❤",
      };
    case "question":
      return {
        title: "Question mark",
        emoji: "❓",
      };
    case "shy":
      return {
        title: "Shy monkey",
        emoji: "🙈",
      };
    case "thumbs down":
      return {
        title: "Thumbs down",
        emoji: "👎",
      };
    case "thumbs up":
      return {
        title: "Thumbs up",
        emoji: "👍",
      };
    default:
      return {
        title: "No reaction",
        emoji: "",
      };
  }
}
