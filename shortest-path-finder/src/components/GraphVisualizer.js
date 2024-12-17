import React, { useState } from "react";
import ReactFlow, { Background, Controls } from "react-flow-renderer";
import { dijkstra } from "../dijkstra"; // Assume dijkstra is implemented

const GraphVisualizer = () => {
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);
  const [startNode, setStartNode] = useState("");
  const [endNode, setEndNode] = useState("");

  // Form states for adding nodes and edges
  const [nodeId, setNodeId] = useState("");
  const [nodeX, setNodeX] = useState(100);
  const [nodeY, setNodeY] = useState(100);
  const [edgeSource, setEdgeSource] = useState("");
  const [edgeTarget, setEdgeTarget] = useState("");
  const [edgeWeight, setEdgeWeight] = useState(1);

  // Graph data structure for Dijkstra
  const [graphData, setGraphData] = useState({});

  // Add a new node
  const addNode = () => {
    setNodes((prev) => [
      ...prev,
      { id: nodeId, data: { label: nodeId }, position: { x: nodeX, y: nodeY } },
    ]);
    setNodeId("");
  };

  // Add a new edge
  const addEdge = () => {
    setEdges((prev) => [
      ...prev,
      {
        id: `${edgeSource}-${edgeTarget}`,
        source: edgeSource,
        target: edgeTarget,
        label: `${edgeWeight}`,
      },
    ]);

    // Update graphData for Dijkstra
    setGraphData((prev) => {
      const newGraph = { ...prev };
      if (!newGraph[edgeSource]) newGraph[edgeSource] = {};
      if (!newGraph[edgeTarget]) newGraph[edgeTarget] = {};

      newGraph[edgeSource][edgeTarget] = Number(edgeWeight);
      newGraph[edgeTarget][edgeSource] = Number(edgeWeight);
      return newGraph;
    });

    setEdgeSource("");
    setEdgeTarget("");
    setEdgeWeight(1);
  };

  // Find shortest path
  const findShortestPath = () => {
    const result = dijkstra(graphData, startNode, endNode);
    const pathNodes = result.path;

    const newEdges = edges.map((edge) => ({
      ...edge,
      animated:
        pathNodes.includes(edge.source) && pathNodes.includes(edge.target),
      style:
        pathNodes.includes(edge.source) && pathNodes.includes(edge.target)
          ? { stroke: "green", strokeWidth: 3 }
          : {},
    }));

    setEdges(newEdges);
  };

  return (
    <div style={{ height: "100%", padding: "20px" }}>
      <h2>Dijkstra's Shortest Path Visualizer</h2>

      {/* Node Input Form */}
      <div>
        <h3>Add Node</h3>
        <label>Node ID: </label>
        <input value={nodeId} onChange={(e) => setNodeId(e.target.value)} />
        <label>Position X: </label>
        <input
          type="number"
          value={nodeX}
          onChange={(e) => setNodeX(Number(e.target.value))}
        />
        <label>Position Y: </label>
        <input
          type="number"
          value={nodeY}
          onChange={(e) => setNodeY(Number(e.target.value))}
        />
        <button onClick={addNode}>Add Node</button>
      </div>

      {/* Edge Input Form */}
      <div>
        <h3>Add Edge</h3>
        <label>Source Node: </label>
        <input
          value={edgeSource}
          onChange={(e) => setEdgeSource(e.target.value)}
        />
        <label>Target Node: </label>
        <input
          value={edgeTarget}
          onChange={(e) => setEdgeTarget(e.target.value)}
        />
        <label>Weight: </label>
        <input
          type="number"
          value={edgeWeight}
          onChange={(e) => setEdgeWeight(Number(e.target.value))}
        />
        <button onClick={addEdge}>Add Edge</button>
      </div>

      {/* Start and End Node Input */}
      <div>
        <h3>Find Shortest Path</h3>
        <label>Start Node: </label>
        <input
          value={startNode}
          onChange={(e) => setStartNode(e.target.value)}
        />
        <label>End Node: </label>
        <input value={endNode} onChange={(e) => setEndNode(e.target.value)} />
        <button onClick={findShortestPath}>Find Path</button>
      </div>

      {/* Graph Visualization */}
      <div style={{ height: "600px", marginTop: "20px" }}>
        <ReactFlow nodes={nodes} edges={edges} fitView>
          <Background />
          <Controls />
        </ReactFlow>
      </div>
    </div>
  );
};

export default GraphVisualizer;