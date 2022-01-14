type ClassName = string | object | ClassName[];

export function className(arg: ClassName): string {
  if (typeof arg == "string") {
    return arg.trim();
  }

  const isArray = Array.isArray(arg);

  const validClassName: string[] = [];

  const getValidClasses = () =>
    validClassName
      .filter((item, index) => validClassName.indexOf(item) === index)
      .join(" ")
      .trim();

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

    const validClassName: string[] = [];

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
