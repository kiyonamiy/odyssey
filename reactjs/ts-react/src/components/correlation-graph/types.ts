export interface Node extends d3.SimulationNodeDatum {
  id: string;
}

export interface Link extends d3.SimulationLinkDatum<Node> {
  value: number;
}
