import randomString from "./randomString.mjs";
import http from "http";

const sleep = (duration) => {
  return new Promise(resolve => setTimeout(resolve, duration));
}

const main = async () => {
  for (let i = 0; i < 3; i++) {
    const time = new Date().toISOString();
    console.log(`${time}: ${randomString}`)
    await sleep(5000);
    i--;
  }
}

main();

const server = http.createServer((req, res) => {
  const time = new Date().toISOString();
  res.writeHead(200, {"Content-Type": "text/html; charset=utf-8"});
  res.end(`${time}: ${randomString}`);
});

const port = 3000;
const host = 'localhost';

server.listen(port, host, () => {
    console.log(`Server running at http://${host}:${port}/`);
});
