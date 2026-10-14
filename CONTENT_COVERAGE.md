# Curriculum coverage

## Reference audit

The reference page was readable through its table of contents and lesson body. Its learning progression and accessible topics were inventoried before implementation:

| Reference section | This curriculum |
|---|---|
| Graph definition and notation | Graph Fundamentals → What is a graph? |
| Directed, undirected, weighted, tree, DAG, complete, bipartite | Graph Fundamentals |
| Adjacency list and matrix, trade-offs | Representing Graphs in Java |
| BFS/DFS, traversal complexity and use cases | Graph Traversal |
| Dijkstra, Bellman–Ford, Floyd–Warshall, A* | Shortest Paths |
| Union-Find, Kruskal, Prim | DSU and Minimum Spanning Trees |
| Common graph problems and patterns | Problem Bank and Interview Patterns |
| Real-world use cases | Real-World Applications |
| Complexity comparison and interview guidance | Complexity and Algorithm Selection / Quick Reference |

The reference also mentions cycle detection, topological sort, negative cycles, interview templates, and further reading; those are included in the curriculum map. No inaccessible section was observed in the accessible page content.

## Implementation status

“Authored” means the topic has a tailored explanation and Java snippet in `src/data.ts`; “mapped” means the topic has a working route in the curriculum, with the current concise lesson template.

| Area | Explanation | Java example | Interactive or problem coverage | Status |
|---|---|---|---|---|
| Graph definition; adjacency list and matrix | Authored | Authored snippets | Shared BFS trace | Authored foundation |
| BFS and DFS | Authored | Authored implementations | Step-by-step BFS playground; BFS and component tests | Authored foundation |
| Dijkstra | Authored | Authored implementation | Negative weights / unreachable distances tested | Authored foundation |
| Kahn topological sort | Authored | Authored implementation | DAG/cycle checks tested | Authored foundation |
| DSU, Bellman–Ford, MST, Floyd–Warshall | Tailored introduction | Focused snippets | Reference and problem links | Partial; expand and verify full examples |
| Remaining modules and advanced algorithms | Topic and route mapped | Concise Java starter snippets where relevant | Problem bank covers representative patterns | Partial; add dedicated explanations, traces and checks |
| Problem bank | Original statements and clues | Solutions not yet included | Difficulty filter, hints, complexity and edge cases | Partial |
| Preferences and progress | Implemented | — | Local storage for theme, bookmarks and completion | Complete |
| Code execution | Limit clearly shown | Java source examples | No arbitrary Java execution | Not implemented |

This is an initial runnable implementation, not a claim that every mapped lesson topic already has a full 16-part lesson write-up. The README records the remaining content and execution work.
