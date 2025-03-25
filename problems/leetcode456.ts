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

      let currentLowestVal = nums[lowestIndex];
      let currentHighestVal = nums[highestIndex];
      
      // Merge previous intervals which intersect with current interval.
      let intersects = false;
      for (let k = 0; k < tasks.length; k++) {
        if (tasks[k][0] === currentLowestVal && tasks[k][1] === currentHighestVal) {
          intersects = true;
          continue;
        }

        if (Math.max(tasks[k][0], currentLowestVal) < Math.min(tasks[k][1], currentHighestVal)) {
          currentLowestVal = Math.min(tasks[k][0], currentLowestVal);
          currentHighestVal = Math.max(tasks[k][1], currentHighestVal);

          tasks[k] = [currentLowestVal, currentHighestVal];

          k = -1;
          intersects = true;
        }
      }

      if (!intersects) {
        tasks.push([nums[lowestIndex], nums[highestIndex]]);
      }

      continue;
    }
  }

  return false;
};

export default find132pattern(
  // [3,5,0,3,3],
  [10,15,0,5,8],
  // [3,5,0,3,1],
  // [3,5,0,3,4],
  // [11,14,10,9,8,7,9,8]
  // [12,15,0,7,9,30]
  // [2,5,-10,-3,-1,20]
);
