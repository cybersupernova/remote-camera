import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
const store = new Vuex.Store({
	state: {
		localStream: null,
		members: []
	},
	mutations: {
		setLocalStream(state, stream) {
			state.localStream = stream
		},
		socket_REGISTER(state, { id }) {
			if (!state.members.find(m => m == id)) state.members.push(id)
		},
	},
	actions: {
		saveLocalStream(context, stream) {
			context.commit('setLocalStream', stream)
		},
		socket_register(context, { id }) {
			console.log(id)
			if (this._vm.$socket.client.id == id) return
			// TODO: make simple peer instance
		}
	}
})

export default store