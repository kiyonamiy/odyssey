import Triangle3D from "./Triangle3D";
import Matrix4x4 from './Matrix4x4';
import Vector4 from "./Vector4";

function animate(): void {
   canvasCtx.clearRect(-WIDTH / 2, -HEIGHT / 2, WIDTH, HEIGHT);

   angle += 2;
   const radian = angle / 360 * Math.PI;
   mRotation.pts[0][0] = Math.cos(radian);
   mRotation.pts[0][2] = Math.sin(radian);
   mRotation.pts[1][1] = 1;
   mRotation.pts[2][0] = -Math.sin(radian);
   mRotation.pts[2][2] = Math.cos(radian);
   mRotation.pts[3][3] = 1;

   // 缩放 250 倍，并不停旋转
   let m: Matrix4x4 = mScale.mul(mRotation);
   triangle.transform(m);

   triangle.draw(canvasCtx);
   // 递归调用
   window.requestAnimationFrame(animate);
}

/* 1. 初始化 Canvas */
const WIDTH: number = document.documentElement.clientWidth;
const HEIGHT: number = document.documentElement.clientHeight;
// 拿到 canvas
const canvas = document.getElementById("canvas") as HTMLCanvasElement;
canvas.width = WIDTH;
canvas.height = HEIGHT;
// 拿到 canvas 上下文
const canvasCtx = canvas.getContext("2d");
// 将坐标系原点移动到画布正中心
canvasCtx.translate(WIDTH / 2, HEIGHT / 2);

const mScale: Matrix4x4 = new Matrix4x4();
mScale.pts[0][0] = 250;
mScale.pts[1][1] = 250;
mScale.pts[2][2] = 250;
mScale.pts[3][3] = 1;

const mRotation: Matrix4x4 = new Matrix4x4();

const triangle: Triangle3D = new Triangle3D(
                                new Vector4(0, -0.5, 0, 1),     // y 向下，屏幕坐标的正方向
                                new Vector4(0.5, 0.5, 0, 1), 
                                new Vector4(-0.5, 0.5, 0, 1)
                             );

let angle = 0;
animate();