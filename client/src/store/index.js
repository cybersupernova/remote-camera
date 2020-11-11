import Vue from 'vue'
import Vuex from 'vuex'
import SimplePeer from 'simple-peer'

Vue.use(Vuex)
const store = new Vuex.Store({
	state: {
		localStream: null,
		members: {},
		mode: null
	},
	getters: {
		allMembers: state => {
			return Object.values(state.members)
		},
		getPeerById: state => id => state.members[id].peer,
		getLocalStream: state => state.localStream
	},
	mutations: {
		setLocalStream(state, stream) {
			state.localStream = stream
		},
		setRemoteStream(state, { id, stream }) {
			Vue.set(state.members[id], 'stream', stream)
		},
		saveMembers(state, members) {
			members.forEach(member => {
				if (!state.members[member.id])
					Vue.set(state.members, member.id, member)

			})
		},
		addNewPeer(state, { id, peer }) {
			Vue.set(state.members[id], 'peer', peer)
		},
		setMode(state, mode) {
			state.mode = mode
		},
		removeMember(state, id) {
			Vue.delete(state.members, id)
		}
	},
	actions: {
		saveLocalStream(context, stream) {
			context.commit('setLocalStream', stream)
		},
		socket_register(context, { id, members }) {
			console.log('register', members)
			context.commit('saveMembers', members)
			let others = context.getters.allMembers.filter(m => m.id != this._vm.$socket.client.id)
			console.log('others', others)
			others.forEach(member => {
				if (member.peer) return
				let peer = new SimplePeer({ initiator: id == this._vm.$socket.client.id })
				peer.on('signal', signal => {
					console.log(`peer signal ===>  ${signal.type} for ${member.id}`)
					this._vm.$socket.client.emit('signal', { id: member.id, signal })
				})
				peer.on('connect', () => {
					console.log('peer connected')
					if (context.state.localStream)
						peer.addStream(context.state.localStream)
				})
				peer.on('close', () => {
					console.log('peer closed')
				})
				peer.on('error', (error) => {
					console.log('peer error', error)
				})
				peer.on('stream', stream => {
					console.log('stream received', stream)
					context.commit('setRemoteStream', { id: member.id, stream })
					if (context.state.localStream)
						peer.addStream(context.state.localStream)
				})
				context.commit('addNewPeer', { id: member.id, peer })
			})
		},
		socket_leave(context, { id }) {
			console.log(`${id} left room`)
			context.commit('removeMember', id)
		},
		socket_signal(context, { id, signal }) {
			console.log(`socket signal <=== from ${id} of type ${signal.type}`)
			context.getters.getPeerById(id).signal(signal)
		},
		setMode(context, mode) {
			context.commit('setMode', mode)
		}
	}
})

export default store