export type Lesson = { slug: string; title: string; module: number; topic: string; duration: string; difficulty: string; summary: string; takeaway: string[]; code: string; explanation: string; complexity: string; question: string; answer: string; keywords: string[] };
const lesson = (slug:string,title:string,module:number,topic:string,summary:string,code:string,explanation:string,complexity:string,keywords:string[]=[]):Lesson=>({slug,title,module,topic,duration:'8 min',difficulty:module<4?'Foundations':module<8?'Intermediate':'Advanced',summary,code,explanation,complexity,takeaway:[explanation,'Choose the representation and algorithm from the graph’s structure and the question being asked.'],question:`What key invariant makes ${title} work?`,answer:explanation,keywords});
const bfs=`static List<Integer> bfs(List<List<Integer>> graph, int start) {
    boolean[] seen = new boolean[graph.size()];
    Queue<Integer> queue = new ArrayDeque<>();
    List<Integer> order = new ArrayList<>();
    seen[start] = true;
    queue.add(start);
    while (!queue.isEmpty()) {
        int node = queue.remove();
        order.add(node);
        for (int next : graph.get(node)) {
            if (!seen[next]) {
                seen[next] = true; // mark when enqueued
                queue.add(next);
            }
        }
    }
    return order;
}`;
const dfs=`static void dfs(List<List<Integer>> graph, int node,
                 boolean[] seen, List<Integer> order) {
    seen[node] = true;
    order.add(node);
    for (int next : graph.get(node)) {
        if (!seen[next]) dfs(graph, next, seen, order);
    }
}`;
const dijkstra=`record Edge(int to, long weight) {}
record State(int node, long distance) {}

static long[] dijkstra(List<List<Edge>> graph, int source) {
    long[] dist = new long[graph.size()];
    Arrays.fill(dist, Long.MAX_VALUE);
    dist[source] = 0;
    PriorityQueue<State> pq = new PriorityQueue<>(
        Comparator.comparingLong(State::distance));
    pq.add(new State(source, 0));
    while (!pq.isEmpty()) {
        State current = pq.remove();
        if (current.distance() != dist[current.node()]) continue;
        for (Edge edge : graph.get(current.node())) {
            if (edge.weight() < 0) throw new IllegalArgumentException("Dijkstra requires non-negative weights");
            long candidate = current.distance() + edge.weight();
            if (candidate < dist[edge.to()]) {
                dist[edge.to()] = candidate;
                pq.add(new State(edge.to(), candidate));
            }
        }
    }
    return dist; // Long.MAX_VALUE means unreachable
}`;
const topo=`static List<Integer> topologicalOrder(List<List<Integer>> graph) {
    int n = graph.size();
    int[] indegree = new int[n];
    for (List<Integer> edges : graph)
        for (int next : edges) indegree[next]++;
    Queue<Integer> ready = new ArrayDeque<>();
    for (int i = 0; i < n; i++) if (indegree[i] == 0) ready.add(i);
    List<Integer> order = new ArrayList<>();
    while (!ready.isEmpty()) {
        int node = ready.remove();
        order.add(node);
        for (int next : graph.get(node))
            if (--indegree[next] == 0) ready.add(next);
    }
    if (order.size() != n) return List.of(); // cycle
    return order;
}`;
export const modules = [
['Graph Fundamentals','What is a graph?','Graph notation and vocabulary','Directed and undirected graphs','Weighted, simple and multigraphs','Degree and paths','Connected components','Trees, DAGs and bipartite graphs'],
['Representing Graphs in Java','Adjacency lists','Adjacency matrices','Weighted and edge lists','Sets, labels and object models','Parsing graph input','Dynamic graph updates'],
['Graph Traversal','Breadth-first search','Recursive depth-first search','Iterative DFS','Disconnected graphs','Path reconstruction','Multi-source BFS','Grid traversal'],
['Cycle Detection','Undirected cycle detection','Directed cycle detection','Cycle detection with Kahn','Self-loops and parallel edges','Cycle detection with DSU'],
['Topological Sorting and DAGs','Topological sorting with Kahn’s algorithm','DFS topological ordering','Course scheduling','Unique topological order','Shortest paths in a DAG','Critical path analysis'],
['Shortest Paths','Choosing a shortest-path algorithm','Dijkstra’s algorithm','Bellman–Ford','Floyd–Warshall','0–1 BFS','Path reconstruction','A* search'],
['Minimum Spanning Trees','Spanning tree properties','Minimum spanning trees','Kruskal’s algorithm','Prim’s algorithm','Minimum spanning forests'],
['Disjoint Set Union','Disjoint Set Union','Path compression','Union by size','Dynamic connectivity','Redundant connection'],
['Strongly Connected Components','Kosaraju’s algorithm','Tarjan’s algorithm','Condensation DAG'],
['Bridges and Articulation Points','Discovery and low-link times','Bridge detection','Articulation points','Critical connections'],
['Bipartite Graphs and Coloring','BFS two-coloring','Odd cycles','Bipartite matching fundamentals','Graph coloring'],
['Advanced Graph Algorithms','Eulerian path and circuit','Hierholzer’s algorithm','Network flow','Edmonds–Karp','Maximum flow and minimum cut','Transitive closure','Tree diameter and centroid'],
['Graphs on Grids','Islands and flood fill','Rotting oranges','Walls and gates','Surrounded regions','Shortest path with obstacles','Word ladder','Knight moves'],
['Graph Interview Patterns','BFS for minimum steps','Indegree processing','Union-Find connectivity','Shortest path with state','Implicit graphs','Counting paths in DAGs'],
['Real-World Applications','Route planning','Package dependencies','Social and recommendation graphs','Service dependencies','Workflow scheduling'],
['Complexity and Algorithm Selection','Representation comparison','BFS versus DFS','Shortest-path comparison','Prim versus Kruskal','Explicit versus implicit graphs']
] as const;
const raw:[string,string,number,string,string,string,string,string,string[]][]=[
['what-is-a-graph','What is a graph?',1,'Fundamentals','A graph models entities and the relationships that connect them. Write G = (V, E): vertices are the things; edges are their relationships.','record Graph(List<List<Integer>> neighbors) { }','Represent vertices explicitly, even when a vertex has no incident edges. An isolated vertex still belongs to V.','Storage depends on representation; an adjacency list uses O(V + E).',['vertices','edges','notation']],
['adjacency-lists','Adjacency lists in Java',2,'Representation','Store each vertex’s neighbors. This is the general-purpose representation for sparse graphs and traversal-heavy work.','List<List<Integer>> graph = new ArrayList<>();\nfor (int i = 0; i < vertexCount; i++) graph.add(new ArrayList<>());\ngraph.get(from).add(to);\ngraph.get(to).add(from); // undirected','The reverse insertion is what makes an edge undirected. For directed graphs, insert only from → to. Neighbor lookup scans a row; traversal visits only actual edges.','O(V + E) space; edge lookup O(degree); add O(1) amortized.',['representation','ArrayList','sparse']],
['adjacency-matrices','Adjacency matrices',2,'Representation','A V-by-V table answers edge existence with a single indexed lookup; the space cost is quadratic.','boolean[][] edge = new boolean[vertexCount][vertexCount];\nedge[from][to] = true;\nedge[to][from] = true; // undirected','Use a matrix for dense graphs or frequent adjacency checks. A weighted matrix stores a weight, but use a separate presence marker if zero is a valid weight.','O(V²) space; edge lookup O(1); neighbor scan O(V).',['matrix','dense']],
['breadth-first-search','Breadth-first search',3,'Traversal','BFS explores distance layers. In an unweighted graph, the first discovery of a vertex gives its fewest-edge path from the source. Queue order and adjacency order determine ties.','import java.util.*;\n'+bfs,'Mark a vertex when it enters the queue so duplicate edges cannot enqueue it repeatedly. Store parent[next] = node when reconstructing one shortest path.','O(V + E) time and O(V) auxiliary space with adjacency lists.',['queue','shortest path','traversal']],
['depth-first-search','Depth-first search',3,'Traversal','DFS follows one branch until it cannot continue, then backtracks. It is the basis of component search, cycle checks and topological ordering.','import java.util.*;\n'+dfs,'Mark before descending; otherwise a cycle can recurse forever. The resulting order depends on neighbor ordering and is not a shortest path.','O(V + E) time and O(V) space including recursion.',['stack','recursion','traversal']],
['dijkstras-algorithm','Dijkstra’s algorithm',6,'Shortest paths','Use Dijkstra for single-source shortest paths when every edge weight is non-negative. A min-priority queue processes the currently cheapest known frontier.','import java.util.*;\n'+dijkstra,'The stale-entry check discards an older queue item after a shorter route was found. Distances remain Long.MAX_VALUE when unreachable. Negative edges break the greedy finalization argument.','O((V + E) log V) time; O(V + E) storage.',['weights','priority queue','shortest path']],
['topological-sort','Topological sorting with Kahn’s algorithm',5,'DAGs','A topological order places every prerequisite before the vertex that depends on it. Kahn’s algorithm repeatedly removes vertices with zero incoming edges.','import java.util.*;\n'+topo,'If fewer than V vertices are emitted, some directed cycle remains. Multiple ready vertices imply the order may not be unique.','O(V + E) time and O(V) auxiliary space.',['DAG','indegree','queue']],
['union-find','Disjoint Set Union',8,'Connectivity','DSU maintains a partition of vertices into connected groups while edges arrive. It answers whether two vertices are already connected and merges groups efficiently.','int find(int x) {\n    if (parent[x] != x) parent[x] = find(parent[x]);\n    return parent[x];\n}\nvoid union(int a, int b) {\n    int ra = find(a), rb = find(b);\n    if (ra != rb) parent[rb] = ra;\n}','Path compression shortens future find walks. Pair it with union by size or rank for near-constant amortized operation cost. DSU supports undirected connectivity, not arbitrary path queries.','O(α(V)) amortized per operation with compression and union by size.',['connectivity','Kruskal']],
['bellman-ford','Bellman–Ford',6,'Shortest paths','Relax every edge V−1 times to handle negative weights, then scan once more to detect a reachable negative cycle.','for (int pass = 1; pass < n; pass++) {\n    boolean changed = false;\n    for (Edge e : edges) {\n        if (dist[e.from] != INF && dist[e.from] + e.weight < dist[e.to]) {\n            dist[e.to] = dist[e.from] + e.weight;\n            changed = true;\n        }\n    }\n    if (!changed) break;\n}','Guard against adding to the infinity sentinel. A final improving relaxation means a source-reachable negative cycle.','O(VE) time and O(V) distance storage.',['negative weights','relaxation']],
['minimum-spanning-trees','Minimum spanning trees',7,'Optimization','For a connected, weighted, undirected graph, an MST connects all vertices with minimum total edge weight and no cycle. Kruskal sorts edges and accepts only those joining distinct DSU components.','edges.sort(Comparator.comparingLong(Edge::weight));\nfor (Edge edge : edges) {\n    if (dsu.find(edge.u()) != dsu.find(edge.v())) {\n        dsu.union(edge.u(), edge.v());\n        chosen.add(edge);\n    }\n}','Negative and duplicate weights are valid. If fewer than V−1 edges are selected, the input is disconnected; the result is a minimum spanning forest.','Kruskal: O(E log E) time.',['Prim','Kruskal','DSU']],
['floyd-warshall','Floyd–Warshall',6,'Shortest paths','Compute all-pairs shortest distances by allowing intermediate vertices one at a time. Best for small graphs that need answers for many pairs.','for (int k = 0; k < n; k++)\n    for (int i = 0; i < n; i++)\n        for (int j = 0; j < n; j++)\n            if (dist[i][k] != INF && dist[k][j] != INF)\n                dist[i][j] = Math.min(dist[i][j], dist[i][k] + dist[k][j]);','The guarded relaxation prevents arithmetic on the infinity sentinel. A negative diagonal after completion indicates a negative cycle.','O(V³) time and O(V²) space.',['all pairs','dynamic programming']],
['real-world-graphs','Graphs in real systems',15,'Applications','Graph modeling turns relationships into queries: route planning, dependency ordering, social reachability and service impact analysis.','Map<String, List<String>> dependencies = new HashMap<>();\ndependencies.computeIfAbsent("api", k -> new ArrayList<>()).add("auth");','Pick edge direction deliberately: “A depends on B” is often represented B → A when computing build order. Keep weights and edge meanings explicit.','Choose based on V, E, density, and query pattern.',['applications','system design']]
];
const curatedLessons:Lesson[] = raw.map(([slug,title,module,topic,summary,code,explanation,complexity,keywords])=>({slug,title,module,topic,duration:'8 min',difficulty:module<4?'Foundations':module<8?'Intermediate':'Advanced',summary,code,explanation,complexity,keywords,takeaway:[explanation,'Choose the representation and algorithm from the graph’s structure and the question being asked.'],question:`Which implementation detail is central to ${title}?`,answer:explanation}));
export const curriculum = modules.map((names,i)=>({number:i+1,title:names[0],lessons:names.slice(1).map((title,j)=>{const found=curatedLessons.find(x=>x.title===title);return found??lesson(`${i+1}-${j+1}-${title.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/(^-|-$)/g,'')}`,title,i+1,names[0],`Study ${title.toLowerCase()} as part of ${names[0].toLowerCase()}. Learn when the pattern applies, how to represent the state in Java, and which edge cases affect correctness.`,title.includes('BFS')?bfs:title.includes('DFS')?dfs:title.includes('topological')?topo:title.includes('Dijkstra')?dijkstra:'// Java 17\n// Build the graph from the problem input, then apply the invariant\n// and track visited state to avoid repeating work.',`Start by identifying the graph’s vertices, edge meaning, and constraints. ${title} follows a reusable invariant; verify it on an isolated vertex, a disconnected input, and a cycle where relevant.`,`Typically O(V + E) for an adjacency-list traversal. Check the algorithm’s own data structure for additional costs.`,[title.toLowerCase()]);})}));
export const lessons:Lesson[] = curriculum.flatMap(m=>m.lessons);
export const problemBank=[
{title:'Count connected components',difficulty:'Easy',topics:['DFS','BFS','Disjoint Set Union'],clue:'Count how many independent groups exist.',statement:'Given an undirected graph with n vertices and an edge list, return its number of connected components.',complexity:'O(V + E)',hint:'Start a traversal from each vertex that has not been visited.'},
{title:'Course ordering',difficulty:'Medium',topics:['DAG','Topological sort'],clue:'Prerequisites impose a partial order.',statement:'Given course prerequisites, return one valid completion order or an empty result if a cycle makes completion impossible.',complexity:'O(V + E)',hint:'Track each course’s incoming prerequisite count.'},
{title:'Shortest path in an unweighted graph',difficulty:'Easy',topics:['BFS','Path reconstruction'],clue:'Every edge costs exactly one step.',statement:'Return the minimum number of edges from source to target, or report that the target is unreachable.',complexity:'O(V + E)',hint:'Record a parent when a node is first discovered.'},
{title:'Network delay',difficulty:'Medium',topics:['Dijkstra','PriorityQueue'],clue:'Nonnegative travel times; one source.',statement:'Find the time for a signal to reach every vertex in a directed weighted graph, or report an unreachable vertex.',complexity:'O((V + E) log V)',hint:'The answer is the largest finite shortest distance.'},
{title:'Redundant connection',difficulty:'Medium',topics:['DSU','Cycle detection'],clue:'An extra undirected edge closes a cycle.',statement:'Return an edge whose endpoints are already connected when it is processed.',complexity:'O(E α(V))',hint:'Maintain components as edges are added.'},
{title:'Critical connections',difficulty:'Hard',topics:['Bridges','Low-link'],clue:'Which single edge disconnects the network?',statement:'Find every bridge in a connected undirected network.',complexity:'O(V + E)',hint:'Compare a child’s low-link value with its parent discovery time.'},
{title:'Is the graph bipartite?',difficulty:'Medium',topics:['BFS','Coloring'],clue:'Can adjacent vertices receive opposite colors?',statement:'Determine whether every component can be split into two sets with no same-set edge.',complexity:'O(V + E)',hint:'Color each component with alternating labels.'},
{title:'Number of islands',difficulty:'Medium',topics:['Grid','Flood fill'],clue:'A matrix encodes an implicit graph.',statement:'Count four-directionally connected land regions in a grid.',complexity:'O(rows × columns)',hint:'Every unvisited land cell can start a component traversal.'}
];
