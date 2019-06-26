import Mock from 'mockjs';
import getListData from './get/api_get_list';
import getTestData from './get/api_get_test';

export default Mock.mock('/api/get/list', 'get', getListData)
.mock('/api/get/test', 'get', getTestData);