import React, { useRef, useEffect, useState } from 'react';
import * as d3 from 'd3';
import axios from 'axios';
import { Slider, Form } from 'antd';
import 'antd/dist/antd.css';
import { Link, Node } from './types';

function getGraph(result: any, threshold: number = 0) {
  const topology = result.data;
  const topologyKeys = Object.keys(result.data).filter((e: string) => e !== 'default');
  const links = topologyKeys
    .map((key) => Object.entries(topology[key]).map((entry) => [key, ...entry]))
    .reduce((sum, current) => [...sum, ...current], [])
    .map((entry) => ({
      source: entry[0],
      target: entry[1],
      value: entry[2]
    }))
    .filter((item: any) => item.value >= threshold) as Array<Link>;
  // 只保留有线相连的节点
  const nodeIdSet = new Set<string>();
  links.forEach((link) => {
    nodeIdSet.add(link.source as string);
    nodeIdSet.add(link.target as string);
  });
  const nodeIdArray = Array.from(nodeIdSet);
  const nodes: Array<Node> = nodeIdArray.map((nodeId) => ({
    id: nodeId
  }));

  return { nodes, links };
}

function drawNode(canvasCtx: CanvasRenderingContext2D, node: Node) {
  canvasCtx.moveTo((node.x as number) + 4, node.y as number);
  canvasCtx.arc(node.x as number, node.y as number, 4, 0, 2 * Math.PI);
}

function drawLink(canvasCtx: CanvasRenderingContext2D, link: Link) {
  const source: Node = link.source as Node,
    target: Node = link.target as Node;
  canvasCtx.moveTo(source.x as number, source.y as number);
  canvasCtx.lineTo(target.x as number, target.y as number);
}

function drawCForceChart(
  forceChartRef: React.MutableRefObject<HTMLCanvasElement>,
  graph: { nodes: Array<Node>; links: Array<Link> }
) {
  const canvas = forceChartRef.current;
  canvas.width = canvas.offsetWidth;
  canvas.height = canvas.offsetHeight;
  const canvasCtx = canvas.getContext('2d');
  if (canvasCtx == null) {
    throw Error('no canvas context!');
  }
  // 初始化力场
  const simulation = d3
    .forceSimulation<Node, Link>(graph.nodes)
    .force(
      'link',
      d3.forceLink<Node, Link>(graph.links).id((node) => node.id) // id 方法就是 线的 source 和 target 都是字符串，需要通过 node 的哪个字段来确定该线连接的是哪一个节点。
    )
    .force('charge', d3.forceManyBody().strength(-300)) // 节点间相互排斥的电磁力
    .force('collision', d3.forceCollide().radius(4)) // 避免节点相互覆盖
    .force('y', d3.forceY().strength(0.1))
    .force('x', d3.forceX().strength(0.1))
    .force('center', d3.forceCenter(canvas.width / 2, canvas.height / 2));

  simulation.on('tick', () => {
    canvasCtx.clearRect(0, 0, canvas.width, canvas.height);
    // 画线
    canvasCtx.save();
    canvasCtx.beginPath();
    graph.links.forEach((link: Link) => drawLink(canvasCtx, link));
    canvasCtx.closePath();
    canvasCtx.strokeStyle = '#aaa';
    canvasCtx.stroke();
    canvasCtx.restore();
    // 画点（后画为了覆盖线头
    canvasCtx.save();
    canvasCtx.beginPath();
    graph.nodes.forEach((node: Node) => drawNode(canvasCtx, node));
    canvasCtx.fill();
    canvasCtx.strokeStyle = '#fff';
    canvasCtx.stroke();
    canvasCtx.restore();
  });
}

export default function CorrelationGraph() {
  const forceChartRef: React.MutableRefObject<HTMLCanvasElement> = useRef(
    document.createElement('canvas')
  );

  const [threshold, setThreshold] = useState(0.9);

  useEffect(() => {
    axios.get('/data/w1.json').then((result) => {
      const graph = getGraph(result, threshold);
      drawCForceChart(forceChartRef, graph);
    });
  }, [threshold]);

  return (
    <div style={{ width: '100%', height: '100%', border: '1px solid' }}>
      <div style={{ marginLeft: 10, position: 'absolute', width: '100%' }}>
        <span
          style={{ position: 'absolute', marginTop: 8, fontSize: 14, color: `rgba(0, 0, 0, 0.85)` }}
        >
          Filter :
        </span>
        <Slider
          min={0.9}
          max={1}
          defaultValue={0.9}
          step={0.001}
          onAfterChange={(value) => setThreshold(value as number)}
          style={{ position: 'absolute', marginLeft: 50, width: `20%` }}
        />
      </div>
      <canvas ref={forceChartRef} style={{ width: '100%', height: '100%' }} />
    </div>
  );
}
