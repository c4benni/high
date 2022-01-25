import {
  ComponentData,
  DynamicObject,
  GetReaction,
  ReactionType,
} from "./types";

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
        type: "exclaim",
      };
    case "laugh":
      return {
        title: "Laughing face",
        emoji: "😂",
        type: "laugh",
      };
    case "love":
      return {
        title: "Red heart",
        emoji: "❤",
        type: "love",
      };
    case "question":
      return {
        title: "Question mark",
        emoji: "❓",
        type: "question",
      };
    case "shy":
      return {
        title: "Shy monkey",
        emoji: "🙈",
        type: "shy",
      };
    case "thumbs down":
      return {
        title: "Thumbs down",
        emoji: "👎",
        type: "thumbs down",
      };
    case "thumbs up":
      return {
        title: "Thumbs up",
        emoji: "👍",
        type: "thumbs up",
      };
    default:
      return {
        title: "No reaction",
        emoji: "",
        type: "",
      };
  }
}

export const reactions: GetReaction[] = [
  {
    title: "No reaction",
    emoji: "",
    type: "",
  },
  {
    title: "Thumbs up",
    emoji: "👍",
    type: "thumbs up",
  },
  {
    title: "Thumbs down",
    emoji: "👎",
    type: "thumbs down",
  },
  {
    title: "Shy monkey",
    emoji: "🙈",
    type: "shy",
  },
  {
    title: "Question mark",
    emoji: "❓",
    type: "question",
  },
  {
    title: "Red heart",
    emoji: "❤",
    type: "love",
  },
  {
    title: "Laughing face",
    emoji: "😂",
    type: "laugh",
  },
  {
    title: "Exclaimation mark",
    emoji: "‼",
    type: "exclaim",
  },
];

export function getComponentData(props: DynamicObject<any>): ComponentData {
  const output = {
    events: {},
    attrs: {},
  } as { [key: string]: any };

  for (const key in props) {
    const value = props[key];

    if (/^on[A-Z]/.test(key)) {
      typeof value == "function" && (output.events[key] = value);
    } else if (typeof value == "string") {
      output.attrs[key] = value;
    }
  }

  return output;
}
