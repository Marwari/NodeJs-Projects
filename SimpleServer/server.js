var http = require('http');
http.createServer(function(req, res) {
	res.writeHead(200, {'Content-type' : 'text/plain'});
	res.end('Hello World!');
}).listen(4040);
console.log('Server is running at : 4040');