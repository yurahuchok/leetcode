/**
 * Topics:
 * - The solution just goes from left to right filling flipping next three elements if zero is encountered. The solution
 *   might not guarantee the minimum operation count described in the problem. It would be nice to have a way to
 *   mathematically prove that the solution always provides minimum operation count.
 */

function minOperations(nums: number[]): number {
  // if (nums.find((val) => val === 0) === undefined) {
  //   return 0;
  // }

  // 1 0 0 1 1 0 1 1 1 0 0 0 1 0 1
  // 1 1 1 0 1 0 1 1 1 0 0 0 1 0 1
  // 1 1 1 1 0 1 1 1 1 0 0 0 1 0 1
  // 1 1 1 1 1 0 0 1 1 0 0 0 1 0 1
  // 1 1 1 1 1 1 1 0 1 0 0 0 1 0 1
  // 1 1 1 1 1 1 1 1 0 1 0 0 1 0 1
  // 1 1 1 1 1 1 1 1 1 0 1 0 1 0 1
  // 1 1 1 1 1 1 1 1 1 1 0 1 1 0 1
  // 1 1 1 1 1 1 1 1 1 1 1 0 0 0 1
  // 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1

  // 1 0 0 1 1 0 1 1 1 0 0 0 1 0 1
  // 1 0 0 1 1 0 1 1 1 1 1 1 1 0 1
  // 1 1 1 0 1 0 1 1 1 1 1 1 1 0 1
  // 1 1 1 1 0 1 1 1 1 1 1 1 1 0 1
  // 1 1 1 1 1 0 0 1 1 1 1 1 1 0 1
  // 1 1 1 1 1 1 1 0 1 1 1 1 1 0 1
  // 1 1 1 1 1 1 1 1 0 0 1 1 1 0 1
  // 1 1 1 1 1 1 1 1 1 1 0 1 1 0 1
  // 1 1 1 1 1 1 1 1 1 1 1 0 0 0 1
  // 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1

  // 0 1 1 1 0 0
  // 1 0 0 1 0 0
  // 1 1 1 0 0 0
  // 1 1 1 1 1 1

  // 0 1 1 1
  // 1 0 0 1
  // 1 1 1 0
  // 1 1 1 0

  let counter = 0;
  
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] === 0) {
      nums[i] = 1 - nums[i];

      if (nums[i+1] === undefined) {
        return -1;
      }

      if (nums[i+2] === undefined) {
        return -1;
      }

      nums[i+1] = 1 - nums[i+1];
      nums[i+2] = 1 - nums[i+2];

      counter++;
    }
  }
  
  return counter;
};
