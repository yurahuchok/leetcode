class UnionFind {
  protected p: number[];

  protected w: (number|null)[];

  constructor(size: number) {
    this.p = Array(size).fill(null).map((_, i) => i);
    this.w = Array(size).fill(null);
  }

  find(x: number): number {
    if (this.p[x] !== x) {
      this.p[x] = this.find(this.p[x]);
    }
    return this.p[x];
  }

  union(x: number, y: number, w: number) {
    const xRoot = this.find(x);
    this.p[this.find(y)] = xRoot;
    this.w[xRoot] = this.w[xRoot] === null ? w : this.w[xRoot] & w;
  }

  normalize() {
    this.p.forEach((_, i) => {
      this.find(i);
    });

    this.w.forEach((w, i) => {
      if (w === null) {
        return;
      }

      const root = this.find(i);
      if (root !== i) {
        this.w[root] = this.w[root] === null ? w : this.w[root] & w;
        this.w[i] = null;
      }
    });
  }

  isConnected(x: number, y: number) {
    return this.find(x) === this.find(y);
  }

  getGraphMinWeight(x: number) { // x = any node in the graph.
    return this.w[this.find(x)];
  }
}

function minimumCost(n: number, edges: number[][], query: number[][]): number[] {
  const result: number[] = [];

  const graph = new UnionFind(n);
  edges.forEach((edge) => graph.union(edge[0], edge[1], edge[2]));

  graph.normalize();

  query.forEach((q) => {
    if (!graph.isConnected(q[0], q[1])) {
      result.push(-1);
      return;
    }

    result.push(graph.getGraphMinWeight(q[0]) ?? -2);
  });

  return result;
}
