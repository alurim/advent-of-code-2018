"use strict";

const path = require("path");
const fs = require("fs");
const util = require("util");
const readFile = util.promisify(fs.readFile);

function hasNLetters(id, n) {
  const sortedId = id
    .split("")
    .sort()
    .join("");
  console.log(id, sortedId);
  if (sortedId.length === 0) {
    return false;
  }
  let previousLetter = sortedId[0];
  let previousLetterCount = 1;
  for (let idx = 1; idx < sortedId.length; idx++) {
    if (sortedId[idx] === previousLetter) {
      previousLetterCount++;
      if (
        previousLetterCount === n &&
        (idx + 1 === sortedId.length || sortedId[idx + 1] !== previousLetter)
      ) {
        return true;
      }
    } else {
      previousLetterCount = 1;
      previousLetter = sortedId[idx];
    }
  }
  return false;
}

(async () => {
  const input = await readFile(path.resolve(__dirname, "input"), "utf8");
  const inputArray = input.split("\n");
  let twoCount = 0;
  let threeCount = 0;
  for (let idx = 0; idx < inputArray.length; idx++) {
    twoCount += hasNLetters(inputArray[idx], 2) ? 1 : 0;
    threeCount += hasNLetters(inputArray[idx], 3) ? 1 : 0;
  }
  console.log(twoCount, threeCount);
  console.log(twoCount * threeCount);
})();

// Output 8610
