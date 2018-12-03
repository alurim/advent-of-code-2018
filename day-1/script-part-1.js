"use strict";

const path = require("path");
const fs = require("fs");
const readline = require("readline");
const stream = require("stream");

// Code stolen from https://medium.com/@wietsevenema/node-js-using-for-await-to-read-lines-from-a-file-ead1f4dd8c6f
function readLines({ input }) {
  const output = new stream.PassThrough({ objectMode: true });
  const rl = readline.createInterface({ input });
  rl.on("line", line => {
    output.write(line);
  });
  rl.on("close", () => {
    output.push(null);
  });
  return output;
}

const input = fs.createReadStream(path.resolve(__dirname, "input"));
(async () => {
  let counter = 0;
  for await (const line of readLines({ input })) {
    const lineNumber = parseInt(line.substr(1), 10);
    if (line[0] === "-") {
      counter = counter - lineNumber;
    } else if (line[0] === "+") {
      counter = counter + lineNumber;
    } else {
      throw new Error("Unexpected line!", line);
    }
  }
  console.log(counter);
})();

// Output: 576
