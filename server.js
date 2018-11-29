var express = require("express");
var app = express();

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.use(express.static(__dirname + "/app/assets/"));

app.get("/", (req, res) => {
res.render(__dirname + "/app/index.html");
})

app.listen(8000, () => {
    console.log("Port: 8000");
})