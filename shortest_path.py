import sys

def dijkstra(graph, start):
    num_nodes = len(graph)
    distances = {node: sys.maxsize for node in range(num_nodes)}
    distances[start] = 0
    visited = set()

    while len(visited) < num_nodes:
        min_node = None
        for node in range(num_nodes):
            if node not in visited and (min_node is None or distances[node] < distances[min_node]):
                min_node = node

        if distances[min_node] == sys.maxsize:
            break

        visited.add(min_node)
        for neighbor, weight in enumerate(graph[min_node]):
            if weight > 0 and neighbor not in visited:
                new_distance = distances[min_node] + weight
                if new_distance < distances[neighbor]:
                    distances[neighbor] = new_distance

    return distances

def distance_vector(graph, start):
    num_nodes = len(graph)
    distances = [sys.maxsize] * num_nodes
    distances[start] = 0

    for _ in range(num_nodes - 1):
        for node in range(num_nodes):
            for neighbor, weight in enumerate(graph[node]):
                if weight > 0:
                    if distances[node] + weight < distances[neighbor]:
                        distances[neighbor] = distances[node] + weight

    return distances

def main():
    num_nodes = int(input("Enter the number of nodes in the graph: "))
    graph = []

    print("\nEnter the adjacency matrix row by row (use 0 for no connection):")
    for _ in range(num_nodes):
        row = list(map(int, input(f"Row {_ + 1}: ").split()))
        graph.append(row)

    start_node = int(input("\nEnter the starting node (0-indexed): "))

    print("\nRunning Dijkstra's Algorithm...")
    dijkstra_distances = dijkstra(graph, start_node)
    print("Shortest distances from node {} using Dijkstra's Algorithm:".format(start_node))
    for node, distance in dijkstra_distances.items():
        print(f"Node {node}: Distance {distance}")

    print("\nRunning Distance Vector Algorithm...")
    distance_vector_distances = distance_vector(graph, start_node)
    print("Shortest distances from node {} using Distance Vector Algorithm:".format(start_node))
    for node, distance in enumerate(distance_vector_distances):
        print(f"Node {node}: Distance {distance}")

if __name__ == "__main__":
    main()