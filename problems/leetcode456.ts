function find132pattern(nums: number[]): boolean {
  let investigations: number[][] = [];

  let lowest = undefined;
  let highest = undefined;

  for (let i = 0; i < nums.length; i++) {
    const curr = nums[i];

    for (let k = 0; k < investigations.length; k++) {
      if (curr > nums[investigations[k][0]] && curr < nums[investigations[k][1]]) {
        return true;
      }
    }

    if (lowest === undefined) {
      lowest = i;
      continue;
    }

    if (curr < nums[lowest]) {
      highest = undefined;
      lowest = i;
      continue;
    }

    if (curr > nums[lowest] + 1 && (highest === undefined || curr > nums[highest])) {
      highest = i;
      investigations.push([lowest, highest]);
      continue;
    }
  }

  return false;
};

// export default find132pattern([4,7,3,2,1,0,2,1]);
export default find132pattern([3,1,4,2]);