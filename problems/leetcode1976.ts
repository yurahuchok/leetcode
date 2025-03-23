type NodePath = { index: number; cost: number };

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
}


class Dijkstra {
  protected sNodes: Map<number, { from: number | null, cost: number, explored: boolean }> = new Map();

  protected sWays: Map<number, { ways: number, cost: number }> = new Map();

  constructor(protected graph: Graph) {}

  public process(start: number) {
    let sCurrent = this.sNodes.get(start);

    if (sCurrent === undefined) {
      sCurrent = { from: null, cost: 0, explored: true };
      this.sWays.set(start, { ways: 1, cost: 0 });
    }

    this.sNodes.set(start, { ...sCurrent, explored: true });

    this.graph.node(start)?.forEach((path) => {
      const sPath = this.sNodes.get(path.index);
      const sCost = path.cost + sCurrent.cost;

      if (sPath === undefined || sCost <= sPath.cost) {
        this.sNodes.set(path.index, { from: start, cost: sCost, explored: false });
        
        const sWays = this.sWays.get(path.index);
        if (sWays === undefined || sCost < sWays.cost) {
          this.sWays.set(path.index, { ways: 1, cost: sCost });
        } else if (sWays.cost === sCost) {
          this.sWays.set(path.index, { ways: sWays.ways + 1, cost: sCost});
        }
      }
    });

    let smallestVal: number = Infinity;
    let smallestIndex: number | null = null;
    
    this.sNodes.forEach((val, index) => {
      if (val.explored === false) {
        if (val.cost < smallestVal) {
          smallestVal = val.cost;
          smallestIndex = index;
        }
      }
    });

    if (smallestIndex !== null) {
      this.process(smallestIndex);
    }
  }

  public findCountOfMinPaths(start: number, end: number) {
    this.process(start);
    return this.sWays.get(end)?.ways;
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
