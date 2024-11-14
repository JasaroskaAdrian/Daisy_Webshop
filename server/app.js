const express = require("express");
const https = require("https");
const fs = require("fs");
const { initializeAPI } = require("./api");

const app = express();
app.use(express.json());

app.use(( req, res, next) => {
    res.removeHeader("X-Powered-By")
    next();
})

const logs = (req, res, next) => {
    const ignorePaths = [

    ]
    if (ignorePaths.includes(req.path)) return next();

    const timestamp = new Date().toLocaleDateString();
    const user = req.user ? req.user.username : "Unauthenticated User";

    const logEntry = `[${timestamp}] User: ${user}, Method: ${req.method}, URL: ${req.originalURL}, Status: ${res.statusCode}\n`
    try {
        fs.appendFile("server_logs.log", logEntry)
        next()    
    } catch (error) {
        console.error("Failed to write the log:", error)
    }
    
}
app.use(logs);

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