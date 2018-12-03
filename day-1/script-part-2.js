"use strict";

const path = require("path");
const fs = require("fs");
const util = require("util");
const readFile = util.promisify(fs.readFile);

(async () => {
  // Switching to a more straightforward way of reading input. Just gimme the string
  const input = await readFile(path.resolve(__dirname, "input"), "utf8");
  const inputArray = input.split("\n");
  let frequency = 0;
  const previousFrequency = {};
  for (let idx = 0; true; idx = (idx + 1) % inputArray.length) {
    const line = inputArray[idx];
    const lineNumber = parseInt(line.substr(1), 10);
    if (line[0] === "-") {
      frequency = frequency - lineNumber;
    } else if (line[0] === "+") {
      frequency = frequency + lineNumber;
    } else {
      throw new Error("Unexpected line!", line);
    }
    if (previousFrequency[frequency]) {
      console.log(frequency);
      return;
    }
    previousFrequency[frequency] = true;
  }
})();

// Output 77674
