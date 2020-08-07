const Hapi = require('@hapi/hapi');
const IO = require('socket.io')
const Vision = require('@hapi/vision');
const pug = require('pug')
const Path = require('path')
const Inert = require('@hapi/inert')

const init = async () => {

	const server = Hapi.server({
		port: 3000,
		// routes: {
		// 	files: {
		// 		relativeTo: Path.join(__dirname, 'public')
		// 	}
		// }
	});
	// await server.register(Vision);
	// server.views({
	// 	engines: { pug },
	// 	relativeTo: __dirname,
	// 	path: 'templates'
	// });
	// await server.register(Inert);
	// server.route({
	// 	method: 'GET',
	// 	path: '/{param*}',
	// 	handler: {
	// 		directory: {
	// 			path: '.'
	// 		}
	// 	}
	// });

	let io = IO(server.listener)
	io.on("connection", function (socket) {

		console.log('connected');
		socket.on('REGISTER', ({ roomId, name }) => {
			socket.roomId = roomId
			socket.name = name
			socket.join(roomId)
			console.log(`name registered as ${name} in ${roomId}`)
			io.sockets.in(socket.roomId).emit('REGISTER', { id: socket.id })
		})
		socket.on('disconnect', () => {
			console.log('user disconnected');
		});

	})

	// server.route({
	// 	method: 'GET',
	// 	path: '/',
	// 	handler(request, h) {
	// 		return h.view('index', { message: 'hello world' })
	// 	}
	// })

	await server.start();
	console.log('Server running on port 3000');
};

init();