import Vue from 'vue'
import Vuex from 'vuex'
import SimplePeer from 'simple-peer'

Vue.use(Vuex)
const store = new Vuex.Store({
	state: {
		localStream: null,
		members: {}
	},
	getters: {
		allMembers: state => {
			return Object.values(state.members)
		},
		getPeerById: state => id => state.members[id].peer
	},
	mutations: {
		setLocalStream(state, stream) {
			state.localStream = stream
		},
		saveMembers(state, members) {
			members.forEach(member => {
				if (!state.members[member.id])
					Vue.set(state.members, member.id, member)

			})
		},
		addNewPeer(state, { id, peer }) {
			Vue.set(state.members[id], 'peer', peer)
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
				peer.on('connect', function () {
					console.log('peer connected')
				})
				peer.on('close', function () {
					console.log('peer closed')
				})
				peer.on('error', function (error) {
					console.log('peer error', error)
				})
				context.commit('addNewPeer', { id: member.id, peer })
			})
		},
		socket_signal(context, { id, signal }) {
			console.log(`socket signal <=== from ${id} of type ${signal.type}`)
			context.getters.getPeerById(id).signal(signal)
		}
	}
})

export default store