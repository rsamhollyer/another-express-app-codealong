const http = require("http");
const express = require("express");
const morgan = require("morgan"); //require morgan in npm
const logger = morgan("tiny");
const es6Renderer = require("express-es6-template-engine");

const app = express();
const server = http.createServer(app);

const PORT = 3000;
const HOSTNAME = "localhost";

app.use(express.static("public")); //tells express.static to look in the 'public' directory and the path is relative to that

//Use some custom middleware(logger)
app.use(logger);

app.use((req, res, next) => {
	console.log(`🦄 you got a request`, req.url, req.method);
	next();
});
// In express, everything is middleware
//app.VERB(PATH) <- express matches verb & path

app.use("/blah", (req, res, next) => {
	console.log(`This is from the /blah middleware`);
	//hand off to next function in the pancake stack
	next();
});

//with middleware, it makes a 'fuzzy' match on the url path.
//on the URL path (thatis, marches beggining of the URL path)
//Another term is 'regular expressions' or RegEx

app.use("/", (req, res, next) => {
	//A piece of middleware can modify the req and or res
	req.stuff = "🌈";

	//The way you'' use this 90% of the time:
	//req.session
	//Each visitor on your site (browser) will have their own session

	/*
    
    req.session.user = {
        id:12345,
        username:'something'
        needsPasswordReset:true,
    }
    */

	next();
});

app.engine("html", es6Renderer);
app.set("views", "templates");
app.set("view engine", "html");

app.get("/", (req, res) => {
	console.log(`Here is yout stuff:`, req.stuff);
	res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="stylesheet" href="stylesheets/styles.css">
        <title>Document</title>
    </head>
    <body>
        <h1>THIS SHOULD BE RED</h1>
    </body>
    </html>
    `);
});

app.get("/blah", (req, res) => {
	console.log(`Here is yout stuff:`, req.stuff);
	res.send(`blahblahbalh`);
});

server.listen(PORT, HOSTNAME, () => {
	console.log(`Go to : http://${HOSTNAME}:${PORT}`);
});
