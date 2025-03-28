class Traverser {
  protected results: Map<number, number> = new Map();

  protected xyCompleted: Set<string> = new Set();

  constructor(protected grid: number[][]) {}

  getResults() {
    return this.results;
  }

  traverse(queries: number[], pos: number[] = [0,0]) {
    let proceed: boolean = false;

    let [x, y] = pos;

    if (!(x in this.grid && y in this.grid[x])) {
      return;
    }

    if (this.xyCompleted.has(`${x};${y}`)) {
      return;
    }

    queries.forEach((val) => {
      if (this.grid[x][y] < val) {
        this.results.set(val, (this.results.get(val) ?? 0) + 1);
        this.xyCompleted.add(`${x};${y}`);
        proceed = true;
      }
    });

    if (proceed) {
      this.traverse(queries, [x + 1, y]);
      this.traverse(queries, [x - 1, y]);
      this.traverse(queries, [x, y + 1]);
      this.traverse(queries, [x, y - 1]);
    }
  }
}

function maxPoints(grid: number[][], queries: number[]): number[] {
  const traverser = new Traverser(grid);
  traverser.traverse(queries);

  console.log(traverser.getResults());

  return [];
};

export default maxPoints(
  [[1,2,3],[2,5,7],[3,5,1]],
  [5],
);
