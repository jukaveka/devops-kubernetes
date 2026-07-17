import http from "http";

let count = 0;

const server = http.createServer((req, res) => {
  const oldCount = count;
  count = count + 1;
  res.writeHead(200, {"Content-Type": "text/html; charset=utf-8"});
  res.end(`pong ${oldCount}`);
});

const port = 3000;

server.listen(port, () => {
  console.log(`Server running at port ${port}`)
});