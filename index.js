const http = require("http");
const express = require("express");
const es6Renderer = require("express-es6-template-engine");

const app = express();
const server = http.createServer(app);

const PORT = 3000;
const HOSTNAME = "localhost";

app.engine("html", es6Renderer);
app.set("views", "templates");
app.set("view engine", "html");

app.get("/", (req, res) => {
	res.send(`HARRO`);
});

server.listen(PORT, HOSTNAME, () => {
	console.log(`BLAH. Go to : http://${HOSTNAME}:${PORT}`);
});
