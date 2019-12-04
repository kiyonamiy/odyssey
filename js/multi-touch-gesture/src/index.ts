// 第一期想法：
// 使用手势多人控制鼠标移动是不可能的，首先是技术上没有支持的api，再是如果能控制鼠标也只有一个无法同时操作。
// 所以选择 canvas 平铺屏幕，透明置顶，multi-touch 在 canvas 上移动。
// 根据 手指位置和手势，模拟鼠标事件。（移动采用脱尾画画）

function initCanvas() {
    const canvas = document.getElementById("canvas") as HTMLCanvasElement | null;
    if(canvas == null) {
        console.error("Please check if Canvas element exists");
        return;
    }

    const WIDTH: number = document.documentElement.clientWidth;
    const HEIGHT: number = document.documentElement.clientHeight;
    canvas.width = WIDTH;
    canvas.height = HEIGHT;

}

initCanvas();