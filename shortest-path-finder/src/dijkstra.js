export function dijkstra(graph, startNode, endNode) {
  const distances = {};
  const visited = {};
  const previous = {};
  const pq = [];

  // Initialize distances
  for (const node in graph) {
    distances[node] = Infinity;
    previous[node] = null;
  }
  distances[startNode] = 0;
  pq.push([startNode, 0]);

  while (pq.length > 0) {
    pq.sort((a, b) => a[1] - b[1]);
    const [currentNode, currentDist] = pq.shift();

    if (visited[currentNode]) continue;
    visited[currentNode] = true;

    // Stop if endNode is reached
    if (currentNode === endNode) break;

    for (const neighbor in graph[currentNode]) {
      const weight = graph[currentNode][neighbor];
      const totalDist = currentDist + weight;

      if (totalDist < distances[neighbor]) {
        distances[neighbor] = totalDist;
        previous[neighbor] = currentNode;
        pq.push([neighbor, totalDist]);
      }
    }
  }

  // Reconstruct the shortest path
  const path = [];
  let currentNode = endNode;
  while (currentNode) {
    path.unshift(currentNode);
    currentNode = previous[currentNode];
  }

  return { distances, path };
}
