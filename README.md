# Suru Harshit — Graphs in Java

An interactive graph algorithms learning site built with React, TypeScript, Vite, React Router, Lucide icons and a responsive warm-neutral design system.

## Run locally

```sh
npm install
npm run dev
```

Build and preview the production bundle:

```sh
npm run build
npm run preview
```

Run the graph engine checks:

```sh
npm test
```

Java examples target Java 17 or later. Compile and run the standalone BFS example:

```sh
javac examples/GraphAlgorithms.java
java -cp examples GraphAlgorithms
```

## Structure

- `src/App.tsx` — routed page views, lesson navigation, search, progress, quiz and interactive playground.
- `src/data.ts` — the 16-module curriculum map, lesson content, and practice bank.
- `src/algorithms/graph.ts` — deterministic TypeScript graph algorithms and traversal trace generation.
- `src/algorithms/graph.test.ts` — correctness checks for traversal, disconnected vertices, DAG ordering, and Dijkstra constraints.
- `examples/GraphAlgorithms.java` — compileable Java 17 adjacency-list BFS, Dijkstra and Kahn topological sort examples.
- `src/styles.css` — responsive beige theme, reduced-motion behavior and component styles.

## Features

- Search lessons with the header search button or `Ctrl/⌘ K`.
- Browse direct lesson routes across the full 16-module syllabus.
- Step through a deterministic BFS graph trace in the playground. Add vertices and connect the graph ends.
- Mark lessons complete, bookmark them, and keep a local progress view.
- Check understanding with lesson quizzes and hints.
- Filter the starter problem bank by difficulty and review hints and expected complexity.
- Use the representation and algorithm-selection reference tables.
- Switch to a warm dark theme; preferences and progress are stored in browser local storage.

## Content and execution notes

The reference page was accessible and audited for its main learning sequence: graph definition/types, adjacency-list and matrix comparison, BFS/DFS, Dijkstra, Bellman–Ford, Floyd–Warshall, A*, DSU, MST, common problems, applications, patterns, interview templates, and complexity reference. This implementation uses original Java examples and explanations.

This is the first working curriculum pass. The full 16-module topic map is navigable, and the BFS, DFS, adjacency representations, Dijkstra, topological sort, DSU, Bellman–Ford, Floyd–Warshall, MST and application lessons have authored examples; several deeper topics are currently concise guided introductions and should be expanded with dedicated verified Java implementations in later passes. Advanced requirements such as SCC/low-link visualizers, editable Java compilation, daily practice scheduling, and complete problem solutions are not implemented yet. The playground runs the TypeScript visualization engine only; it clearly does not execute user-provided Java. No execution service or backend is configured.

The external portfolio URL is intentionally unset in `site` configuration until a real URL is provided.
