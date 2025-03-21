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
