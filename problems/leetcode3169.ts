function countDays(days: number, meetings: number[][]): number {
  const d = Array(days).fill(true);

  meetings.forEach((meeting) => {
    for (let i = meeting[0]; i <= meeting[1]; i++) {
      d[i - 1] = false;
    }
  });

  return d.filter((val) => val === true).length;
};

export default(countDays(10, [[5,7],[1,3],[9,10]]));
