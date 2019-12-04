const ws = require("nodejs-websocket");

const PORT = 3000;

const server = ws.createServer(function(conn) {
    console.log("new connection");

    conn.on("text", function(str) {
        console.log("Received " + str);
        conn.sendText(str);
    });

    conn.on("close", function(code, reason) {
        console.log("Connection closed");
    });

    conn.on("error", function(err) {
        console.log("handle err");
        console.log(err);
    })
}).listen(PORT);

console.log(`websocket server listening on port ${PORT}`);