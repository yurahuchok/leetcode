class Traverser {
  protected results: Map<number, number> = new Map();

  protected xyCompleted: Set<string> = new Set();

  constructor(protected grid: number[][]) {}

  getResults() {
    return this.results;
  }

  traverse(queries: number[], pos: number[] = [0,0]) {
    const proceedQueries: number[] = [];

    let [x, y] = pos;

    if (!(x in this.grid && y in this.grid[x])) {
      return;
    }

    queries.forEach((val) => {
      this.results.set(val, (this.results.get(val) ?? 0));

      if (this.xyCompleted.has(`${val}:${x};${y}`)) {
        return;
      }

      if (this.grid[x][y] < val) {
        this.results.set(val, (this.results.get(val) ?? 0) + 1);
        this.xyCompleted.add(`${val}:${x};${y}`);
        proceedQueries.push(val);
      }
    });

    if (proceedQueries.length > 0) {
      this.traverse(proceedQueries, [x + 1, y]);
      this.traverse(proceedQueries, [x, y + 1]);
      // this.traverse(proceedQueries, [x, y - 1]);
      // this.traverse(proceedQueries, [x - 1, y]);
    }
  }
}

function maxPoints(grid: number[][], queries: number[]): number[] {
  const traverser = new Traverser(grid);
  traverser.traverse(queries);

  return Array.from(traverser.getResults().values());
};

export default maxPoints(
  [[1,2,3],[2,5,7],[3,5,1]],
  [5,6,2],
  // [[5,2,1],[1,1,2]],
  // [3]
);
