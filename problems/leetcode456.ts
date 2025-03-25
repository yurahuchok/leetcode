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

      
      if (investigations.length > 0) {
        const peek = investigations[investigations.length - 1];

        if (nums[highest] > nums[peek[1]] && nums[lowest] < nums[peek[0]]) {
          investigations.pop(); 
        }

        if (peek[0] === lowest) {
          investigations.pop();
        }
      }

      investigations.push([lowest, highest]);
      continue;
    }
  }

  return false;
};
