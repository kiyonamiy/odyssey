import { Point } from './type';

const dayList: ReadonlyArray<string> = [
	'周一',
	'周二',
	'周三',
	'周四',
	'周五',
	'周六',
	'周日',
];

const typeList: ReadonlyArray<string> = [
	'睡觉',
	'日常',
	'学习',
	'修身养性',
	'娱乐',
	'虚度光阴',
	'其他',
];

const MockData = new Map<string, Array<Point>>();

for (const type of typeList) {
	const array = new Array<Point>();
	for (const day of dayList) {
		array.push({
			value: Math.random() * 12,
		});
	}
	MockData.set(type, array);
}

const TypeToColorMap = new Map<string, string>();
TypeToColorMap.set('睡觉', '#212121');
TypeToColorMap.set('日常', '#CDDC39');
TypeToColorMap.set('学习', '#4CAF50');
TypeToColorMap.set('修身养性', '#9C27B0');
TypeToColorMap.set('娱乐', '#f44336');
TypeToColorMap.set('虚度光阴', '#FF9800');
TypeToColorMap.set('其他', '#2196F3');

export const LineChartConfig = {
	TopPadding: 5,
	BottomPadding: 5,
	LeftPadding: 20,
	YDivisionHeight: 45,
	DividerColor: 'rgb(244, 244, 244)',
	CircleRadius: 3,
};

export { MockData, TypeToColorMap };

// export const MockData: ReadonlyArray<ReadonlyArray<DailyEventData>> = [
// 	// 睡觉
// 	[
// 		{
// 			type: '晚睡',
// 			color: '#212121',
// 			hours: 10,
// 		},
// 		{
// 			type: '午睡',
// 			color: '#424242',
// 			hours: 1.5,
// 		},
// 	],
// 	// 日常
// 	[
// 		{
// 			type: '奔波',
// 			color: '#827717',
// 			hours: 1,
// 		},
// 		{
// 			type: '浏览信息',
// 			color: '#9E9D24',
// 			hours: 1,
// 		},
// 		{
// 			type: '整理',
// 			color: '#AFB42B',
// 			hours: 2,
// 		},
// 		{
// 			type: '洗漱',
// 			color: '#C0CA33',
// 			hours: 0.5,
// 		},
// 	],
// 	// 学习
// 	[
// 		{
// 			type: '前端',
// 			color: '#1B5E20',
// 			hours: 3,
// 		},
// 		{
// 			type: '准备面试',
// 			color: '#2E7D32',
// 			hours: 2,
// 		},
// 		{
// 			type: '源码学习',
// 			color: '#388E3C',
// 			hours: 1,
// 		},
// 		{
// 			type: '算法',
// 			color: '#43A047',
// 			hours: 0.3,
// 		},
// 	],
// 	// 修身养性
// 	[
// 		{
// 			type: '运动',
// 			color: '#4A148C',
// 			hours: 0.5,
// 		},
// 		{
// 			type: '英语',
// 			color: '#6A1B9A',
// 			hours: 0.5,
// 		},
// 		{
// 			type: '练字',
// 			color: '#7B1FA2',
// 			hours: 0.5,
// 		},
// 		{
// 			type: '游玩',
// 			color: '#8E24AA',
// 			hours: 2,
// 		},
// 	],
// 	// 娱乐
// 	[
// 		{
// 			type: '游戏',
// 			color: '#b71c1c',
// 			hours: 0.5,
// 		},
// 		{
// 			type: '网剧',
// 			color: '#c62828',
// 			hours: 0.5,
// 		},
// 		{
// 			type: '动漫',
// 			color: '#d32f2f',
// 			hours: 0.5,
// 		},
// 	],
// 	// 虚度光阴
// 	[
// 		{
// 			type: '瞎折腾',
// 			color: '#E65100',
// 			hours: 0.5,
// 		},
// 		{
// 			type: '打杂',
// 			color: '#EF6C00',
// 			hours: 0.5,
// 		},
// 		{
// 			type: '刷手机',
// 			color: '#F57C00',
// 			hours: 0.5,
// 		},
// 	],
// 	// 其他
// 	[
// 		{
// 			type: '看牙',
// 			color: '#0D47A1',
// 			hours: 0.5,
// 		},
// 		{
// 			type: '装修',
// 			color: '#1565C0',
// 			hours: 0.5,
// 		},
// 	],
// ];
