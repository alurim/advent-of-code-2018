"use strict";

const path = require("path");
const fs = require("fs");
const util = require("util");
const readFile = util.promisify(fs.readFile);

function sharesAllButOneChar(str1, str2) {
  if (str1.length !== str2.length) {
    return false;
  }
  let mismatchedIdx;
  for (let idx = 0; idx < str1.length; idx++) {
    if (str1[idx] !== str2[idx]) {
      if (mismatchedIdx) {
        return false;
      } else {
        mismatchedIdx = idx;
      }
    }
  }

  return str1.substr(0, mismatchedIdx) + str1.substr(mismatchedIdx + 1);
}

(async () => {
  const input = await readFile(path.resolve(__dirname, "input"), "utf8");
  const inputArray = input.split("\n");
  for (let idx1 = 0; idx1 < inputArray.length - 1; idx1++) {
    for (let idx2 = idx1 + 1; idx2 < inputArray.length; idx2++) {
      const result = sharesAllButOneChar(inputArray[idx1], inputArray[idx2]);
      if (result) {
        console.log(result);
        return;
      }
    }
  }
})();

// Output iosnxmfkpabcjpdywvrtahluy
