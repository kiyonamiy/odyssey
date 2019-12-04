/* 初始化产生圆的配置 */
interface MoveCircle {
    x: number;
    y: number;
    radius: number;
}

const BASIC_HUE: number = Math.random() * 360;      // 初始的随机基础色调
const BASIC_RADIUS: number = 0.5;                   // 初始半径
const MAX_RADIUS: number = 10;                      // 限制圆的最大半径，达到即消失

const roundItems: MoveCircle[] = [];                // 存放所有圆点

/* 动画 */
export function circleFade(canvasCtx: CanvasRenderingContext2D, WIDTH: number, HEIGHT: number) {
    let nowHue = BASIC_HUE;

    const animate = () => {
        canvasCtx.clearRect(0, 0, WIDTH, HEIGHT);
    
        nowHue += 0.1;      // 设置颜色渐变
        const nowColor = `hsl(${nowHue}, 100%, 80%)`;
    
        for(let i = 0; i < roundItems.length; i ++) {
            // 画圆
            canvasCtx.beginPath();
            canvasCtx.arc(roundItems[i].x, roundItems[i].y, roundItems[i].radius, 0, Math.PI * 2);
            canvasCtx.closePath();
            canvasCtx.fillStyle = nowColor;
            canvasCtx.fill();
    
            // 计算下次圆的半径
            roundItems[i].radius += BASIC_RADIUS;
            if(roundItems[i].radius > MAX_RADIUS) {
                roundItems.splice(i, 1);
                i --;
            }
        }
        window.requestAnimationFrame(animate);      // 递归执行
    };

    animate();
}

export function generateCircle(touch: Touch) {
    roundItems.push({
        x: touch.clientX,
        y: touch.clientY,
        radius: BASIC_RADIUS,
    });
}