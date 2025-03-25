/**
 * TODO. Improve performance. Investigate solution using Stack.
 */

function find132pattern(nums: number[]): boolean {
  let tasks: number[][] = [];

  let lowest = undefined;
  let highest = undefined;

  for (let i = 0; i < nums.length; i++) {
    const currentVal = nums[i];

    for (let k = 0; k < tasks.length; k++) {
      if (currentVal > tasks[k][0] && currentVal < tasks[k][1]) {
        return true;
      }
    }

    if (lowest === undefined) {
      lowest = i;
      continue;
    }

    if (currentVal < nums[lowest]) {
      lowest = i;
      highest = undefined;
      continue;
    }

    if (currentVal > nums[lowest] + 1 && (highest === undefined || currentVal > nums[highest])) {
      highest = i;
      
      const [prevLowest, prevHighest] = tasks.pop() ?? [Infinity, -Infinity];

      if (prevLowest <= nums[lowest] && prevHighest >= nums[highest]) {
        tasks.push([prevLowest, prevHighest]);
      } else if (nums[lowest] <= prevLowest && nums[highest] >= prevHighest) {
        tasks.push([nums[lowest], nums[highest]]);
      } else {
        tasks.push([prevLowest, prevHighest]);
        tasks.push([nums[lowest], nums[highest]]);
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
