var websocket = new WebSocket("ws://localhost:3000");       // 别人的服务器
websocket.onopen = function() {
    console.log("websocket open");
    document.getElementById("recv").innerHTML = "Connected";
}
websocket.onclose = function() {
    console.log("websocket close");
}

// websocket.onmessage 等待服务器返回
websocket.onmessage = function(e) {
    console.log(e.data);
    document.getElementById("recv").innerHTML = e.data;
}

// websocket.send 发送 sendTxt 内的文本
document.getElementById("sendBtn").onclick = function() {
    var txt = document.getElementById("sendTxt").value;
    websocket.send(txt);
}