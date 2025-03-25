function countDays(days: number, meetings: number[][]): number {
  meetings.sort(([start1], [start2]) => start1 - start2);

  for (let i = 0; i < meetings.length - 1; i++) {
    if (meetings[i][1] >= meetings[i + 1][0]) {
      meetings[i + 1][0] = meetings[i][0];
      meetings[i + 1][1] = Math.max(meetings[i][1], meetings[i + 1][1]);
      delete meetings[i];
    }
  }

  const busyDays = meetings.reduce((acc, meeting) => {
    return acc + (meeting[1] - meeting[0] + 1);
  }, 0);

  return days - busyDays;
};

export default(countDays(57, [[3,49],[23,44],[21,56],[26,55],[23,52],[2,9],[1,48],[3,31]]));
