function countDays(days: number, meetings: number[][]): number {
  const off: Map<number, boolean> = new Map();
  
  meetings.forEach((meeting) => {
    for (let i = meeting[0]; i <= meeting[1]; i++) {
      off.set(i, true);
    }
  });

  return days - off.size;
};

export default(countDays(10, [[5,7],[1,3],[9,10]]));
