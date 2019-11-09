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