import React, { useRef, useEffect } from 'react';
import echarts from 'echarts';

export default function LineChart(): JSX.Element {
  const divRefObj: React.MutableRefObject<HTMLDivElement> = useRef(document.createElement('div'));
  useEffect(() => {
    const myChart: echarts.ECharts = echarts.init(divRefObj.current);

    const option: echarts.EChartOption = {
      legend: {},
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          // 坐标轴指示器，坐标轴触发有效
          type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
        }
      },
      dataset: {
        source: [
          // ['date', 'sleep', 'study', 'common'],
          // ['2020-02-01', 9, 4, 3],
          // ['2020-02-02', 10, 3, 5],
          // ['2020-02-03', 12, 2, 6],
          // ['2020-02-04', 10, 4, 4]
          ['date', 'sleep-zao', 'sleep-wan', 'study-frontend', 'study-node', 'common'],
          ['2020-02-01', 9, 1, 4, 3, 3],
          ['2020-02-02', 10, 0.5, 3, 5, 5],
          ['2020-02-03', 12, 0.3, 2, 7, 6],
          ['2020-02-04', 10, 0, 4, 9, 4]
        ]
      },
      // 声明一个 X 轴，类目轴（category）。默认情况下，类目轴对应到 dataset 第一列。
      xAxis: {
        type: 'category'
      },
      // 声明一个 Y 轴，数值轴。
      yAxis: {},
      // 声明多个 bar 系列，默认情况下，每个系列会自动对应到 dataset 的每一列。
      series: [
        { type: 'bar', stack: 'sleep' },
        { type: 'bar', stack: 'sleep' },
        { type: 'bar', stack: 'study' },
        { type: 'bar', stack: 'study' },
        { type: 'bar' }
      ]
    };
    myChart.setOption(option);
  }, []);
  return <div ref={divRefObj} style={{ width: `100%`, height: `100%` }}></div>;
}
