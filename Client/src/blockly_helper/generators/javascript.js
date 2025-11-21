import { Order } from "blockly/javascript";

export const forBlock = Object.create(null);

forBlock["add_text"] = function (block, generator) {
  // 1. Get the text value from the block
  const text = generator.valueToCode(block, "TEXT", Order.NONE) || "''";

  // 2. THE FIX:
  // Instead of creating a complex helper function that tries to find HTML elements,
  // we simply generate a standard "window.alert()" command.
  //
  // Why? Because in your Blockly.jsx file, we "hijacked" window.alert!
  // When this runs, React will catch the message and put it in your Green Console.
  const code = `window.alert(${text});\n`;

  return code;
};
