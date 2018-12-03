"use strict";

const path = require("path");
const fs = require("fs");
const util = require("util");
const readFile = util.promisify(fs.readFile);

const COLLISION = "X";
const CLAIM = "CLAIM";
(async () => {
  const input = await readFile(path.resolve(__dirname, "input"), "utf8");
  const inputArray = input.split("\n");
  // Stolen from https://stackoverflow.com/questions/3689903/how-to-create-a-2d-array-of-zeroes-in-javascript
  let grid = Array(1000)
    .fill()
    .map(() => Array(1000).fill(0));
  let collisionCounter = 0;
  const idToCollision = {};
  for (let idx = 0; idx < inputArray.length; idx++) {
    // Went to https://regex101.com/ to practice
    const [match, id, xStr, yStr, widthStr, heightStr] = inputArray[idx].match(
      /#(\d+) @ (\d+),(\d+): (\d+)x(\d+)/
    );
    idToCollision[id] = false;
    const x = parseInt(xStr, 10);
    const y = parseInt(yStr, 10);
    const width = parseInt(widthStr, 10);
    const height = parseInt(heightStr, 10);
    for (let i = x; i < x + width; i++) {
      for (let j = y; j < y + height; j++) {
        if (grid[i][j] === COLLISION) {
          idToCollision[id] = true;
        } else if (grid[i][j] !== 0) {
          idToCollision[id] = true;
          idToCollision[grid[i][j]] = true;
          grid[i][j] = COLLISION;
        } else {
          grid[i][j] = id;
        }
      }
    }
  }

  for (const id in idToCollision) {
    if (!idToCollision[id]) {
      console.log(id);
    }
  }
})();

// Output 114946
