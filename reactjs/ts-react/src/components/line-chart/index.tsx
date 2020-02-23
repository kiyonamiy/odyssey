import React, { useRef, useEffect } from 'react';
import { LineChartConfig, MockData, TypeToColorMap } from './constants';
import { Point } from './type';

function getXDivisionNum(data: Map<string, Array<Point>>): number {
	let divisionNum = 0;
	data.forEach((pointArray: Array<Point>) => {
		divisionNum = Math.max(divisionNum, pointArray.length);
	});
	return Math.floor(divisionNum);
}

function getYDivisionNum(canvas: HTMLCanvasElement): number {
	return Math.floor(canvas.height / LineChartConfig.YDivisionHeight) || 1;
}

function getXSpace(canvas: HTMLCanvasElement, xDividerNum: number): number {
	return canvas.width / xDividerNum;
}

function getYSpace(): number {
	return LineChartConfig.YDivisionHeight;
}

function getMaxY(data: Map<string, Array<Point>>): number {
	let maxY = Number.NEGATIVE_INFINITY;
	data.forEach((pointArray: Array<Point>) => {
		pointArray.forEach((point: Point) => {
			maxY = Math.max(maxY, point.value);
		});
	});
	return maxY;
}

function drawLine(
	canvasCtx: CanvasRenderingContext2D,
	startPoint: [number, number],
	endPoint: [number, number],
	color = 'black',
	lineWidth = 1,
): void {
	canvasCtx.save();
	canvasCtx.translate(0.5, 0.5);
	canvasCtx.beginPath();
	canvasCtx.moveTo(Math.floor(startPoint[0]), Math.floor(startPoint[1]));
	canvasCtx.lineTo(Math.floor(endPoint[0]), Math.floor(endPoint[1]));
	canvasCtx.closePath();
	canvasCtx.lineWidth = lineWidth;
	canvasCtx.strokeStyle = color;
	canvasCtx.stroke();
	canvasCtx.restore();
}

function drawCicle(
	canvasCtx: CanvasRenderingContext2D,
	point: [number, number],
	color = 'black',
	radius = LineChartConfig.CircleRadius,
): void {
	canvasCtx.save();
	canvasCtx.beginPath();
	canvasCtx.arc(point[0], point[1], radius, 0, 2 * Math.PI);
	canvasCtx.closePath();
	canvasCtx.fillStyle = color;
	canvasCtx.fill();
	canvasCtx.restore();
}

function drawLineChart(
	canvas: HTMLCanvasElement,
	data: Map<string, Array<Point>>,
	typeToColorMap: Map<string, string>,
): void {
	//初始化
	canvas.width = canvas.offsetWidth;
	canvas.height = canvas.offsetHeight;
	const canvasCtx: CanvasRenderingContext2D | null = canvas.getContext('2d');
	if (canvasCtx == null) {
		throw new Error(`canvas.getContext('2d') 失败`);
	}
	const xDivisionNum = getXDivisionNum(data);
	const yDivisionNum = getYDivisionNum(canvas); // TODO 暂定Y轴每个间隔为 45
	const xSpace = getXSpace(canvas, xDivisionNum);
	const ySpace = getYSpace();
	const yMax = getMaxY(data);
	const yScale =
		(canvas.height -
			LineChartConfig.TopPadding -
			LineChartConfig.BottomPadding) /
		yMax;

	// 画 Y 轴均分线（横线）
	for (let i = 1; i <= yDivisionNum; i++) {
		const height = canvas.height - ySpace * i - LineChartConfig.BottomPadding;
		drawLine(
			canvasCtx,
			[LineChartConfig.LeftPadding, height],
			[canvas.width, height],
			LineChartConfig.DividerColor,
		);
	}

	// 标明 y 轴坐标点
	canvasCtx.save();
	canvasCtx.font = '12px Arial';
	canvasCtx.textAlign = 'right';
	canvasCtx.fillStyle = 'rgb(84, 84, 84)';
	for (let i = 1; i <= yDivisionNum; i++) {
		canvasCtx.fillText(
			(i * (yMax / yDivisionNum)).toFixed(1),
			LineChartConfig.LeftPadding,
			canvas.height - ySpace * i,
		);
	}
	canvasCtx.restore();

	// 画 X 轴均分线（竖线）
	for (let i = 1; i < xDivisionNum; i++) {
		drawLine(
			canvasCtx,
			[xSpace * i, 0],
			[xSpace * i, canvas.height],
			LineChartConfig.DividerColor,
		);
	}

	// 画折线
	data.forEach((pointArray: Array<Point>, type: string) => {
		if (pointArray.length === 0) {
			return;
		}
		let startX = xSpace / 2;
		let startY =
			canvas.height -
			pointArray[0].value * yScale -
			LineChartConfig.BottomPadding;
		drawCicle(canvasCtx, [startX, startY], typeToColorMap.get(type));
		for (let i = 1; i < pointArray.length; i++) {
			const endX = startX + xSpace;
			const endY =
				canvas.height -
				pointArray[i].value * yScale -
				LineChartConfig.BottomPadding;
			drawLine(
				canvasCtx,
				[startX, startY],
				[endX, endY],
				typeToColorMap.get(type),
				2,
			);
			drawCicle(canvasCtx, [endX, endY], typeToColorMap.get(type));
			startX = endX;
			startY = endY;
		}
	});
}

export default function LineChart(): JSX.Element {
	const canvasRefObj: React.MutableRefObject<HTMLCanvasElement> = useRef(
		document.createElement('canvas'),
	);
	const data = MockData;
	const typeToColorMap = TypeToColorMap;
	useEffect(() => {
		drawLineChart(canvasRefObj.current, data, typeToColorMap);
	}, []);
	return (
		<canvas
			ref={canvasRefObj}
			style={{ width: `100%`, height: `100%` }}
		></canvas>
	);
}
