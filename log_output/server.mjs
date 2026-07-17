import http from "http";
import { readFile } from "fs/promises";

const readLastLog = async () => {
  try {
    const logs = await readFile("output/log.txt", { encoding: "utf8" });
    const splitLogs = logs.split("\n")
    const log = splitLogs[splitLogs.length - 1];
    return log;
  } catch (error) {
    console.log(error.message)
  }
}

const server = http.createServer(async (req, res) => {
  const log = await readLastLog();
  res.writeHead(200, {"Content-Type": "text/html; charset=utf-8"});
  res.end(`${log}`);
});

const port = 3000;

server.listen(port, () => {
    console.log(`Server running at port ${port}`);
});
