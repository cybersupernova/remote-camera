const Hapi = require('@hapi/hapi');
const IO = require('socket.io')
const Vision = require('@hapi/vision');
const pug = require('pug')

const init = async () => {

	const server = Hapi.server({
		port: 3000,
	});
	await server.register(Vision);
	server.views({
		engines: { pug },
		relativeTo: __dirname,
		path: 'templates'
	});

	let io = IO(server.listener)
	io.on("connection", function (socket) {

		console.log('connected');

		// Do all the socket stuff here.

	})

	server.route({
		method: 'GET',
		path: '/',
		handler(request, h) {
			return h.view('index', { message: 'hello world' })
		}
	})

	await server.start();
	console.log('Server running on port 3000');
};

init();