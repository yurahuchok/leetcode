/**
 * TODO. Improve performance. Investigate solution using Stack.
 */

function find132pattern(nums: number[]): boolean {
  let tasks: number[][] = [];

  let lowestIndex = undefined;
  let highestIndex = undefined;

  for (let i = 0; i < nums.length; i++) {
    const currentVal = nums[i];

    for (let k = 0; k < tasks.length; k++) {
      if (currentVal > tasks[k][0] && currentVal < tasks[k][1]) {
        return true;
      }
    }

    if (lowestIndex === undefined) {
      lowestIndex = i;
      continue;
    }

    if (currentVal < nums[lowestIndex]) {
      lowestIndex = i;
      highestIndex = undefined;
      continue;
    }

    if (currentVal > nums[lowestIndex] + 1 && (highestIndex === undefined || currentVal > nums[highestIndex])) {
      highestIndex = i;
      
      const [prevLowest, prevHighest] = tasks.pop() ?? [Infinity, -Infinity];
      
      if (prevLowest <= nums[lowestIndex] && prevHighest >= nums[highestIndex]) {
        tasks.push([prevLowest, prevHighest]);
      } else if (nums[lowestIndex] <= prevLowest && nums[highestIndex] >= prevHighest) {
        tasks.push([nums[lowestIndex], nums[highestIndex]]);
      } else {
        tasks.push([prevLowest, prevHighest]);
        tasks.push([nums[lowestIndex], nums[highestIndex]]);
      }

      continue;
    }
  }

  return false;
};

export default find132pattern(
  // [3,5,0,3,3],
  // [10,15,0,5,8],
  // [3,5,0,3,1],
  // [3,5,0,3,4],
  // [11,14,10,9,8,7,9,8]
  // [12,15,0,7,9,30]
  [2,5,-10,-3,-1,20]
);
