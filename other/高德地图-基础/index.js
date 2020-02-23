const newMap = () => {
  const map = new AMap.Map("container", {
    zoom: 15, // 级别
    viewMode: "3D", // 使用3D视图
    center: [116.397428, 39.90923] //中心点坐标
    // // 也可以在地图初始化的时候通过layers属性为地图设置多个图层
    // layers: [
    //   //使用多个图层
    //   new AMap.TileLayer.Satellite(),
    //   new AMap.TileLayer.RoadNet()
    // ],
    // zooms: [4, 18] //设置地图级别范围
  });

  return map;
};

const addTraffic = map => {
  // 实时路况图层
  const trafficLayer = new AMap.TileLayer.Traffic({
    zIndex: 10
  });

  map.add(trafficLayer);
};

const addMarker = map => {
  const marker = new AMap.Marker({
    position: [116.39, 39.9] // 位置
  });

  // 事件功能与信息窗体
  const infoWindow = new AMap.InfoWindow({
    //创建信息窗体
    isCustom: true, //使用自定义窗体
    content: "<div>信息窗体</div>", //信息窗体的内容可以是任意html片段
    offset: new AMap.Pixel(16, -45)
  });
  marker.on("click", function(e) {
    infoWindow.open(map, e.target.getPosition()); // 打开信息窗体 //e.target就是被点击的Marker
  });

  map.add(marker); // 添加到地图
};

const addPolyLine = map => {
  var lineArr = [
    [116.368904, 39.913423],
    [116.382122, 39.901176],
    [116.387271, 39.912501],
    [116.398258, 39.9046]
  ];
  var polyline = new AMap.Polyline({
    path: lineArr, //设置线覆盖物路径
    strokeColor: "#3366FF", //线颜色
    strokeWeight: 5, //线宽
    strokeStyle: "solid" //线样式
  });
  map.add(polyline);
};

const addCustomLayer = map => {
  const canvas = document.createElement("canvas");
  // 将 canvas 宽高设置为地图实例的宽高
  canvas.width = map.getSize().width;
  canvas.height = map.getSize().height;

  const canvasCtx = canvas.getContext("2d");
  // 背景
  canvasCtx.fillStyle = "#999";
  canvasCtx.fillRect(0, 0, canvas.width, canvas.height);

  /* 2. 初始化产生圆的配置 */
  const BASIC_HUE = Math.random() * 360; // 初始的随机基础色调
  const BASIC_RADIUS = 0.8; // 初始半径
  const MAX_RADIUS = 10; // 限制圆的最大半径，达到即消失

  const roundItems = []; // 存放所有圆点
  // 监听鼠标移动产生圆
  window.onmousemove = event => {
    roundItems.push({
      x: event.clientX,
      y: event.clientY,
      radius: BASIC_RADIUS
    });
  };

  /* 3. 动画 */
  let nowHue = BASIC_HUE;
  const animate = () => {
    canvasCtx.clearRect(0, 0, map.getSize().width, map.getSize().height);

    nowHue += 0.1; // 设置颜色渐变
    const nowColor = `hsl(${nowHue}, 100%, 80%)`;

    for (let i = 0; i < roundItems.length; i++) {
      // 画圆
      canvasCtx.beginPath();
      canvasCtx.arc(
        roundItems[i].x,
        roundItems[i].y,
        roundItems[i].radius,
        0,
        Math.PI * 2
      );
      canvasCtx.closePath();
      canvasCtx.fillStyle = nowColor;
      canvasCtx.fill();

      // 计算下次圆的半径
      roundItems[i].radius += BASIC_RADIUS;
      if (roundItems[i].radius > MAX_RADIUS) {
        roundItems.splice(i, 1);
        i--;
      }
    }
    window.requestAnimationFrame(animate); // 递归执行
  };

  animate();

  const customLayer = new AMap.CustomLayer(canvas, {
    zIndex: 12,
    zooms: [15, 20] // 设置可见级别，[最小级别，最大级别]
  });

  // customLayer.render = function() {
  //   draw();
  // };

  map.add(customLayer);
};

window.onLoad = function() {
  const map = newMap();

  addTraffic(map);
  addMarker(map);
  addPolyLine(map);

  addCustomLayer(map);

  AMap.plugin(["AMap.ToolBar", "AMap.Driving"], function() {
    const toolbar = new AMap.ToolBar();
    map.addControl(toolbar);

    const driving = new AMap.Driving(); // 驾车路线规划
    // driving.search(/*参数*/);
  });
};

var url =
  "https://webapi.amap.com/maps?v=1.4.15&key=02f4cf0124e4ef8884e6559ece16bef3&callback=onLoad";
var jsapi = document.createElement("script");
jsapi.charset = "utf-8";
jsapi.src = url;
document.head.appendChild(jsapi);
