import axios from 'axios';

export const postModule = {
	namespaced: true,//чтобы использовать пространство имен модуля  -  {{$store.commit('/post/sortedPosts')}}
	state: () => ({
		posts: [],
		isPostLoading: false,
		selectedSort: '',
		sortOptions: [
			{value: 'title', name: 'По названию'},
			{value: 'body', name: 'По содержанию'}
		],
		searchQuery: '',
		page: 1,
		limit: 10,
		totalPage: 0
	}),
	getters: {
		sortedPosts(state) {
			return [...state.posts].sort((post1, post2) => {
				return post1[state.selectedSort]?.localeCompare(post2[state.selectedSort])
			})
		},
		sortedAndSearchPosts(state, getters) {
			return getters.sortedPosts.filter(post => post.title.includes(state.searchQuery))
		}
	},
	mutations: {
		setPosts(state, posts) {
			state.posts = posts;
		},
		setLoading(state, bool) {
			state.isPostLoading = bool;
		},
		setPage(state, page) {
			state.page = page;
		},
		setSelectedSort(state, selectedSort) {
			state.selectedSort = selectedSort;
		},
		setTotalPage(state, totalPage) {
			state.totalPage = totalPage;
		},
		setSearchQuery(state, searchQuery) {
			state.searchQuery = searchQuery;
		}
	},
	actions: {
		async fetchPosts({state, commit,}) {
			try {
				commit('setLoading', true);
				const response = await axios.get('https://jsonplaceholder.typicode.com/posts/', {
					params: {
						_limit: state.limit,
						_page: state.page
					}
				});
				commit('setTotalPage', Math.ceil(response.headers["x-total-count"] / state.limit));
				commit('setPosts', response.data);
			} catch (e) {
				console.log(e);
			} finally {
				commit('setLoading', false);
			}
		},
		async loadMorePosts({state, commit,}) {
			try {
				commit('setPage', state.page + 1);
				const response = await axios.get('https://jsonplaceholder.typicode.com/posts/', {
					params: {
						_limit: state.limit,
						_page: state.page
					}
				});
				commit('setTotalPage', Math.ceil(response.headers["x-total-count"] / state.limit));
				commit('setPosts', [...state.posts, ...response.data]);
			} catch (e) {
				console.log(e);
			}
		},
	}
};