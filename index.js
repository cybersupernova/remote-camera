const Hapi = require('@hapi/hapi');
const IO = require('socket.io')
const Vision = require('@hapi/vision');
const pug = require('pug')
const Path = require('path')
const Inert = require('@hapi/inert')

const rooms = {}

const init = async () => {

	const server = Hapi.server({
		port: 3000,
		routes: {
			files: {
				relativeTo: Path.join(__dirname, 'client/dist')
			}
		}
	});
	// await server.register(Vision);
	// server.views({
	// 	engines: { pug },
	// 	relativeTo: __dirname,
	// 	path: 'templates'
	// });
	await server.register(Inert);
	server.route({
		method: 'GET',
		path: '/{param*}',
		handler: {
			directory: {
				path: '.'
			}
		}
	});

	let io = IO(server.listener)
	io.on("connection", function (socket) {

		console.log('connected');
		socket.on('REGISTER', ({ roomId, name }) => {
			socket.roomId = roomId
			socket.name = name
			socket.join(roomId)
			console.log(`name registered as ${name} in ${roomId}`)
			if (!rooms[socket.roomId]) rooms[socket.roomId] = []
			rooms[socket.roomId].push({ id: socket.id, name })
			io.sockets.in(socket.roomId).emit('REGISTER', { id: socket.id, members: rooms[socket.roomId] })
		})
		socket.on('signal', ({ id, signal }) => {
			io.sockets.in(id).emit('signal', { id: socket.id, signal })
		})
		socket.on('disconnect', () => {
			if (rooms[socket.roomId])
				rooms[socket.roomId] = rooms[socket.roomId].filter(m => m.id != socket.id)
			socket.leave(socket.roomId)
			io.sockets.in(socket.roomId).emit('LEAVE', { id: socket.id })

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