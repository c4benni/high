export function eventKey(e: KeyboardEvent) {
  const spaceBar = /^space$/i.test(e.code);
  const enterKey = /^enter$/i.test(e.code);
  const esc = /^escape$/i.test(e.code);
  const tab = /^tab$/i.test(e.code);
  const arrowUp = /^arrowup$/i.test(e.code);
  const arrowRight = /^arrowright$/i.test(e.code);
  const arrowDown = /^arrowdown$/i.test(e.code);
  const arrowLeft = /^arrowleft$/i.test(e.code);
  const slash = /^slash/i.test(e.code) || e.key === "/";
  const backspace = /^backspace/i.test(e.code) || /^backspace/i.test(e.key);
  const Delete = /^delete/i.test(e.code) || /^delete/i.test(e.key);
  const keyS = /^keyS/i.test(e.code) || /^s/i.test(e.key);

  if (keyS) {
    return "s";
  }

  if (backspace) {
    return "backkey";
  }

  if (Delete) {
    return "delete";
  }

  if (arrowUp) {
    return "arrow_up";
  }
  if (arrowLeft) {
    return "arrow_left";
  }
  if (arrowDown) {
    return "arrow_down";
  }
  if (arrowRight) {
    return "arrow_right";
  }
  if (spaceBar) {
    return "spacebar";
  }
  if (enterKey) {
    return "enter";
  }
  if (esc) {
    return "esc";
  }
  if (tab) {
    return "tab";
  }
  if (slash) {
    return "slash";
  }
  return "";
}
