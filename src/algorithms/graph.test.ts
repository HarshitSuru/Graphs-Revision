import { describe, expect, it } from 'vitest';
import { bfsTrace, components, dijkstra, topoSort } from './graph';

describe('graph algorithms', () => {
  it('returns no traversal steps for an invalid source in an empty graph', () => {
    expect(bfsTrace([], 0)).toEqual([]);
  });

  it('BFS visits each reachable vertex once and ignores isolated vertices', () => {
    const trace = bfsTrace([[1, 2], [0], [0], []], 0);
    expect(trace.at(-1)?.order).toEqual([0, 1, 2]);
    expect(trace.at(-1)?.visited).toEqual([0, 1, 2]);
  });

  it('counts isolated vertices as their own components', () => {
    expect(components([[], [], [3], [2], []])).toEqual([[0], [1], [2, 3], [4]]);
  });

  it('topologically sorts a DAG and rejects a directed cycle', () => {
    const order = topoSort([[1, 2], [3], [3], []]);
    expect(order).not.toBeNull();
    expect(order!.indexOf(0)).toBeLessThan(order!.indexOf(1));
    expect(order!.indexOf(1)).toBeLessThan(order!.indexOf(3));
    expect(topoSort([[1], [0]])).toBeNull();
    expect(topoSort([[]])).toEqual([0]);
  });

  it('Dijkstra handles unreachable vertices and rejects negative weights', () => {
    expect(dijkstra([[[1, 4], [2, 1]], [[3, 1]], [[1, 1], [3, 5]], []], 0)).toEqual([0, 2, 1, 3]);
    expect(dijkstra([[[1, 1]], [], []], 0)).toEqual([0, 1, Infinity]);
    expect(() => dijkstra([[[1, -1]], []], 0)).toThrow(/non-negative/);
  });
});
