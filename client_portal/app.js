var express = require("express"),
	app = express(),
	path = require("path");

app.use(express.static(path.join(__dirname, '/')));

app.get('/', function (req, res) {
	res.sendFile(path.join(__dirname + '/index.html'));
});

app.listen(3002);

console.log("Client portal rodando na porta 3002");