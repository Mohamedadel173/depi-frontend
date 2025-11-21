/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

// Make sure this line does NOT start with './'
import { Order } from 'blockly/python';

// Export all the code generators for our custom blocks.
// This file has no side effects.
export const forBlock = Object.create(null);

forBlock['add_text'] = function (block, generator) {
  // Get the text value from the 'text' input.
  const text = generator.valueToCode(block, 'text', Order.NONE) || "''";

  // Define a Python helper function using provideFunction_
  const addText = generator.provideFunction_(
      'addText', // The name of the Python function
      [ // The Python code to define the function
        `def ${generator.FUNCTION_NAME_PLACEHOLDER_}(text):`,
        '  print(text)',
      ]
  );

  // Generate the Python code to call the helper function
  const code = `${addText}(${text})\n`;
  return code;
};