import { circleFade, generateCircle } from './touch-move-circle';

const WIDTH: number = document.documentElement.clientWidth;
const HEIGHT: number = document.documentElement.clientHeight;

const ongoingTouches: Touch[] = [];
let canvasCtx: CanvasRenderingContext2D = null;

function initCanvas(): void {
    const canvas = document.getElementById("canvas") as HTMLCanvasElement | null;
    if(canvas == null) {
        console.error("Please check if Canvas element exists");
        return;
    }
    // canvas 宽高铺满屏幕
    // canvas.width = WIDTH;
    // canvas.height = HEIGHT;

    canvasCtx = canvas.getContext("2d");
    
    // 初始化事件
    canvas.addEventListener("touchstart", handleTouchStart, false);
    canvas.addEventListener("touchmove", handleTouchMove, false);

}

function handleTouchStart(event: TouchEvent) {
    event.preventDefault();
    if(canvasCtx == null) {
        console.error("Please check if Canvas Context exists");
        return;
    }

    const touches: TouchList = event.changedTouches;
    for(let i = 0; i < touches.length; i ++) {
        ongoingTouches.push(touches[i]);

        canvasCtx.beginPath();
        canvasCtx.arc(touches[i].pageX, touches[i].pageY, 4, 0, 2 * Math.PI, false);
            // 在起点画一个圆。
            canvasCtx.fillStyle = "#777";
            canvasCtx.fill();
    }
}

function handleTouchMove(event: TouchEvent) {
    event.preventDefault();
    if(canvasCtx == null) {
        console.error("Please check if Canvas Context exists");
        return;
    }

    const touches: TouchList = event.changedTouches;
    for(let i = 0; i < touches.length; i ++) {
        generateCircle(touches[i]);
    }
}

function isClose() {

}

initCanvas();
circleFade(canvasCtx, WIDTH, HEIGHT);