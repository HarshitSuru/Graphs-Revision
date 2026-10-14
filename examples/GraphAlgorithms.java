import java.util.ArrayDeque;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Comparator;
import java.util.List;
import java.util.PriorityQueue;
import java.util.Queue;

/** Small Java 17 examples used by the graph lessons. */
public class GraphAlgorithms {
    record Edge(int to, long weight) {}
    record State(int node, long distance) {}

    static List<Integer> breadthFirstSearch(List<List<Integer>> graph, int source) {
        boolean[] visited = new boolean[graph.size()];
        Queue<Integer> queue = new ArrayDeque<>();
        List<Integer> order = new ArrayList<>();
        visited[source] = true;
        queue.add(source);
        while (!queue.isEmpty()) {
            int node = queue.remove();
            order.add(node);
            for (int next : graph.get(node)) {
                if (!visited[next]) {
                    visited[next] = true;
                    queue.add(next);
                }
            }
        }
        return order;
    }

    static long[] dijkstra(List<List<Edge>> graph, int source) {
        long[] distance = new long[graph.size()];
        Arrays.fill(distance, Long.MAX_VALUE);
        distance[source] = 0;
        PriorityQueue<State> queue = new PriorityQueue<>(
                Comparator.comparingLong(State::distance));
        queue.add(new State(source, 0));
        while (!queue.isEmpty()) {
            State current = queue.remove();
            if (current.distance() != distance[current.node()]) continue;
            for (Edge edge : graph.get(current.node())) {
                if (edge.weight() < 0) {
                    throw new IllegalArgumentException("Dijkstra requires non-negative weights");
                }
                if (current.distance() > Long.MAX_VALUE - edge.weight()) continue;
                long candidate = current.distance() + edge.weight();
                if (candidate < distance[edge.to()]) {
                    distance[edge.to()] = candidate;
                    queue.add(new State(edge.to(), candidate));
                }
            }
        }
        return distance;
    }

    static List<Integer> topologicalOrder(List<List<Integer>> graph) {
        int[] indegree = new int[graph.size()];
        for (List<Integer> neighbors : graph) {
            for (int next : neighbors) indegree[next]++;
        }
        Queue<Integer> ready = new ArrayDeque<>();
        for (int node = 0; node < graph.size(); node++) {
            if (indegree[node] == 0) ready.add(node);
        }
        List<Integer> order = new ArrayList<>();
        while (!ready.isEmpty()) {
            int node = ready.remove();
            order.add(node);
            for (int next : graph.get(node)) {
                if (--indegree[next] == 0) ready.add(next);
            }
        }
        return order.size() == graph.size() ? order : List.of();
    }

    public static void main(String[] args) {
        List<List<Integer>> graph = new ArrayList<>();
        for (int i = 0; i < 5; i++) graph.add(new ArrayList<>());
        connectUndirected(graph, 0, 1);
        connectUndirected(graph, 0, 2);
        connectUndirected(graph, 1, 3);
        connectUndirected(graph, 2, 3);
        System.out.println("BFS from 0: " + breadthFirstSearch(graph, 0));
        System.out.println("Isolated vertex 4 reachable: " + breadthFirstSearch(graph, 0).contains(4));
    }

    private static void connectUndirected(List<List<Integer>> graph, int from, int to) {
        graph.get(from).add(to);
        graph.get(to).add(from);
    }
}
