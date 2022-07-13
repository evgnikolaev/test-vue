import {createStore} from "vuex";

export default createStore({
	//само состояние
	state: {
		// {{$store.state.likes}} получить в шаблоне
		likes: 11
	},
	//computed свойства (кешируемые)
	getters: {
		doubleLikes(state) {
			return state.likes * 2;
		}
	},
	//изменять состояние напрямую нельзя, можно изменять при помощи мутаций
	mutations: {
		//вызов мутации $store.commit('incrementLikes')
		incrementLikes(state) {
			state.likes += 1;
		},
		decrementLIkes(state) {
			state.likes -= 1;
		}
	},
	//ф-ии, которые внутри себя используют мутации
	actions: {},
	//модуль - изолированный кусочек состояния
	modules: {}
});