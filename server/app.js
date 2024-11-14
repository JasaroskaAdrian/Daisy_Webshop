const express = require("express");
const http = require("http");
const fs = require("fs");
const { initializeAPI } = require("./api");

const app = express();
app.use(express.json());

app.use(( req, res, next) => { // Removes the Header which shows the Framework this Website uses
    res.removeHeader("X-Powered-By")
    next();
})
/* -> Logging Mechanism
const logs = (req, res, next) => {
    const ignorePaths = [
    ];
    if (ignorePaths.includes(req.path)) return next(); // Skip logging
  
    const timestamp = new Date().toISOString();
    const user = req.user ? req.user.username : "Unauthenticated User";
  
    const logEntry = `[${timestamp}] User: ${user}, Method: ${req.method}, URL: ${req.originalUrl}, Status: ${res.statusCode}\n`;
    console.log(logEntry.trim());

    fs.appendFile("server_logs.txt", logEntry, (err) => { //PS. fs.appendfile needs a callback function, in this case its (err)
      if (err) console.error("Failed to write log:", err);
    });
  
    next();
  };
app.use(logs);
*/
app.use(express.static("client"));
// Serving the different Pages of the Frontend Views
app.get("/login", (req, res) => {
    res.sendFile(path.join(__dirname, "../client", "login.html")) 
});

app.get("/home", (req, res) => {
    res.sendFile(path.join(__dirname, "../client", "index.html"))
});

app.get("/about", (req, res) => {
    res.sendFile(path.join(__dirname, "../client", "about.html"))
})

app.get("/contact-me", (req, res) => {
    res.sendFile(path.join(__dirname, "../client", "contact-me.html"))
})

app.get("/cart", (req, res) => {
    res.sendFile(path.join(__dirname, "../client", "cart.html"))
})

// Start the web server
const serverPort = process.env.PORT || 3000;
const server = http.createServer(app);
server.listen(serverPort, () => {
  console.log(`Express Server started on port ${serverPort}`);
});