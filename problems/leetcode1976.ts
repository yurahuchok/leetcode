type NodePath = { index: number; cost: number };

const MOD = 1e9 + 7;

class Graph {
  protected nodes: Map<number, NodePath[]> = new Map();

  constructor(n: number, roads: number[][]) {
    this.fill(n, roads);
  }

  protected fill(n: number, roads: number[][]) {
    this.nodes.clear();
    roads.forEach((road) => {
      this.nodes.set(road[0], [...(this.nodes.get(road[0]) ?? []), { index: road[1], cost: road[2] }]);
      this.nodes.set(road[1], [...(this.nodes.get(road[1]) ?? []), { index: road[0], cost: road[2] }]);
    });
  }

  public node(index: number) {
    return this.nodes.get(index);
  }

  public length() {
    return this.nodes.size;
  }
}

class Dijkstra {
  protected paths: Map<number, { from: number | null, cost: number }> = new Map();

  protected tasks: { index: number, currentCost: number, source: number }[] = [];

  protected ways: Map<number, { count: number }> = new Map();

  constructor(protected graph: Graph) {}

  public task() {
    const task = this.tasks.pop();
    if (task === undefined) {
      return;
    }

    if (task.index === this.graph.length() - 1) {
      return;
    }

    if (task.index === 0) {
      this.paths.set(0, ({ from: null, cost: 0 }));
    }

    this.graph.node(task.index)?.forEach((node) => {
      if (node.index === task.source) {
        return;
      }

      const nodePath = this.paths.get(node.index);
      const newCost = task.currentCost + node.cost

      if (nodePath === undefined || newCost < nodePath.cost) {
        this.paths.set(node.index, { from: task.index, cost: newCost });
        this.tasks.push({ index: node.index, currentCost: newCost, source: task.index });
        // this.ways.set(node.index, { count: 1 });
        this.ways.set(node.index, { count: (this.ways.get(task.index)?.count ?? 0) });

      } else if (newCost === nodePath.cost) {
        // this.tasks.push({ index: node.index, currentCost: newCost, source: task.index });
        this.ways.set(node.index, { count: ((this.ways.get(node.index)?.count ?? 0) + (this.ways.get(task.index)?.count ?? 0)) % MOD });
      }
    });

    this.tasks.sort((a, b) => {
      if (a.currentCost < b.currentCost) {
        return -1;
      }

      if (a.currentCost > b.currentCost) {
        return 1;
      }

      return 0;
    }).reverse();

    this.task();
  }

  public process() {
    this.tasks.push({ index: 0, currentCost: 0, source: 0 });
    this.ways.set(0, { count: 1 });
    this.task();
  }

  public findCountOfMinPaths(start: number, end: number) {
    this.process();
    return this.ways.get(end)?.count ?? 0;
  }
}

function countPaths(n: number, roads: number[][]) {
  const graph = new Graph(n, roads);
  const dijkstra = new Dijkstra(graph);

  const ways = dijkstra.findCountOfMinPaths(0, n -1);
  return ways;
};

export default countPaths(
  7,
  [[0,6,7],[0,1,2],[1,2,3],[1,3,3],[6,3,3],[3,5,1],[6,5,1],[2,5,1],[0,4,5],[4,6,2]]
);
