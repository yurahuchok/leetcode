type Task = {
  start?: number;
  finish?: number;
};

function find132pattern(n: number[]): boolean {
  const tasks: Task[] = [];

  tasks.push({
    start: undefined,
    finish: undefined,
  });

  while (tasks.length > 0) {
    const task = tasks.pop();
    const nums = n.slice(task?.start, task?.finish);

    if (nums.length < 3) {
      continue;
    }

    const iMax = nums.reduce((acc, num, i) => nums[acc] <= num ? i : acc, 0);

    const left = nums.slice(0, iMax);
    const right = nums.slice(iMax + 1);

    if (left.length === 0) {
      tasks.push({ start: iMax + 1 });
      continue;
    }

    if (right.length === 0) {
      tasks.push({ start: task?.start, finish: iMax });
      continue;
    }

    const lowest = Math.min(...left);
    const highest = Math.max(...right);

    if (lowest < highest) {
      return true;
    }

    tasks.push({ start: iMax + 1 });
    tasks.push({ start: task?.start, finish: iMax });
  }

  return false;
};

export default find132pattern(
  // [1,2,3,4]
  [1,1,1,1,11,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
);
