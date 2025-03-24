function find132pattern(nums: number[]): boolean {
  if (nums.length < 3) {
    return false;
  }

  const iMax = nums.reduce((acc, num, i) => nums[acc] <= num ? i : acc, 0);

  const left = nums.slice(0, iMax);
  const right = nums.slice(iMax + 1);

  if (left.length === 0) {
    return find132pattern(right);
  }

  if (right.length === 0) {
    return find132pattern(left);
  }

  const lowest = Math.min(...left);
  const highest = Math.max(...right);

  if (lowest < highest) {
    return true;
  }
  
  return find132pattern(left) || find132pattern(right);
};

export default find132pattern(
  // [0,1,2,0,1,2,0]
  // [1,2,3,4]
  // [-2,1,1]
  [1,1,1,1,11,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
);

// 0 1 2 0 1
// 0