class UnionFind2 {
  public p: number[];

  public edges: boolean[][];

  constructor(size: number) {
    this.p = Array(size).fill(null).map((_, i) => i);
    this.edges = Array(size).fill(null).map((elem) => Array(size).fill(false));
  }

  find(x: number) {
    if (this.p[x] !== x) {
      this.p[x] = this.find(this.p[x]);
    }

    return this.p[x];
  }

  union(x: number, y: number) {
    this.p[this.find(y)] = this.find(x);
    this.edges[x][y] = true;
    this.edges[y][x] = true;
  }

  normalize() {
    this.p.forEach((_, i) => this.find(i));
  }
}

function countCompleteComponents(n: number, edges: number[][]): number {
  const graph = new UnionFind2(n);
  edges.forEach((edge) => graph.union(edge[0], edge[1]));
  graph.normalize();

  const components = new Map<number, number[]>();
  graph.p.forEach((n, i) => components.set(n, [...(components.get(n) ?? []), i]));

  let results: boolean[] = [];
  
  components.forEach((nodes) => {
    results.push(nodes.every((node) => graph.edges[node].filter((elem) => elem === true).length === nodes.length -1));
  });

  return results.filter((r) => r === true).length;
};

console.log(
  countCompleteComponents(
    6,
    [[0,1],[0,2],[1,2],[3,4]]
  )
);