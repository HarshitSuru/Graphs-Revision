export type Graph = number[][];
export type TraceStep = { active: number; queue: number[]; visited: number[]; order: number[]; edge?: [number, number] };

export function bfsTrace(graph: Graph, start: number): TraceStep[] {
  if (start < 0 || start >= graph.length) return [];
  const seen = Array(graph.length).fill(false), queue = [start], order: number[] = [], steps: TraceStep[] = [];
  seen[start] = true;
  while (queue.length) {
    const node = queue.shift()!;
    order.push(node);
    steps.push({ active: node, queue: [...queue], visited: seen.flatMap((v, i) => v ? [i] : []), order: [...order] });
    for (const next of graph[node]) if (!seen[next]) {
      seen[next] = true; queue.push(next);
      steps.push({ active: node, queue: [...queue], visited: seen.flatMap((v, i) => v ? [i] : []), order: [...order], edge: [node, next] });
    }
  }
  return steps;
}

export function components(graph: Graph): number[][] {
  const seen = new Set<number>(), groups: number[][] = [];
  for (let root = 0; root < graph.length; root++) if (!seen.has(root)) {
    const group: number[] = [], queue = [root]; seen.add(root);
    while (queue.length) { const u = queue.shift()!; group.push(u); for (const v of graph[u]) if (!seen.has(v)) { seen.add(v); queue.push(v); } }
    groups.push(group);
  }
  return groups;
}

export function topoSort(graph: Graph): number[] | null {
  const degree = Array(graph.length).fill(0);
  graph.forEach(row => row.forEach(v => degree[v]++));
  const queue = degree.flatMap((d, i) => d === 0 ? [i] : []), out: number[] = [];
  for (let head = 0; head < queue.length; head++) { const u = queue[head]; out.push(u); for (const v of graph[u]) if (--degree[v] === 0) queue.push(v); }
  return out.length === graph.length ? out : null;
}

export function dijkstra(graph: [number, number][][], source: number): number[] {
  const dist = Array(graph.length).fill(Infinity), done = new Set<number>(); dist[source] = 0;
  while (done.size < graph.length) {
    let u = -1; for (let i = 0; i < dist.length; i++) if (!done.has(i) && (u < 0 || dist[i] < dist[u])) u = i;
    if (u < 0 || dist[u] === Infinity) break;
    done.add(u);
    for (const [v, w] of graph[u]) { if (w < 0) throw new Error('Dijkstra requires non-negative weights'); dist[v] = Math.min(dist[v], dist[u] + w); }
  }
  return dist;
}
