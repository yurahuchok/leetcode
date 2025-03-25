function find132pattern(nums: number[]): boolean {
  const investigation: number[][] = [];
  let lowest = undefined;

  for (let i = 0; i < nums.length; i++) {
    const curr = nums[i];

    for (let k = 0; k < investigation.length; k++) {
      if (curr > investigation[k][0] && curr < investigation[k][1]) {
        return true;
      }
    }

    if (lowest === undefined) {
      lowest = curr;
      continue;
    }

    if (curr < lowest) {
      lowest = curr;
      continue;
    }

    if (curr > lowest + 1) {
      investigation.push([lowest, curr]);
      continue;
    }
  }

  return false;
};

export default find132pattern([-2,1,2,-2,1,2]);
