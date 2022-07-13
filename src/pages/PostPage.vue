<template>
	<div>
		<h1>Страница с постами</h1>
		<my-input v-model="searchQuery" placeholder="Поиск" v-focus></my-input>
		<div class="app__btns">
			<my-button @click="showDialog" style="margin: 15px 0;">Сздать пост</my-button>
			<my-select v-model="selectedSort" :options="sortOptions"></my-select>
		</div>
		<!--
			Модификаторы v-model:
			v-model.trim - обрезает пробелы
			v-model.number - только числа
		-->
		<my-dialog v-model:show="dialogVisible">
			<!--
				Вывод компонента PostForm .
				Подписываемся на событие create дочернего компонента
			-->
			<post-form @create="createPost"/>
		</my-dialog>

		<!--
			Забиндили данные posts в props компонента, простыми словами - передали данные
			v-bind:posts="posts"
			:posts="posts" - короткая запись
		-->
		<post-list v-if="!isPostLoading" v-bind:posts="sortedAndSearchPosts" @remove="removePost"/>
		<div v-else>Загрузка...</div>

		<!-- Постраничная навигация
		<div class="page__wrapper">
			<div v-for="pageNumber in totalPage" :key="pageNumber" class="page" :class="{'current-page':page===pageNumber}" @click="changePage(pageNumber)">{{pageNumber}}</div>
		</div>-->

<!--		<div class="observer" ref="observerFromDom"></div>-->
		<div class="observer" ref="observerFromDom" v-intersection="loadMorePosts"></div>
	</div>
</template>

<script>
	/*
		импорт компонентов, записи идентичны:
		import PostForm from "@/components/PostForm";
		import PostForm from "./components/PostForm";
	*/
	import PostForm from "@/components/PostForm";
	import PostList from "@/components/PostList";

	import axios from 'axios';
	import MySelect from "@/components/UI/MySelect";
	import MyInput from "@/components/UI/MyInput";

	export default {
		//Регистрация компонентов
		components: {
			MyInput,
			MySelect,
			PostForm, PostList
		},
		data() {
			return {
				posts: [],
				dialogVisible: false,
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
			}
		},
		methods: {
			createPost(post) {
				this.posts.push(post);
				this.dialogVisible = false;
			},
			removePost(post) {
				this.posts = this.posts.filter(p => p.id !== post.id)
			},
			showDialog() {
				this.dialogVisible = true;
			},
			async fetchPosts() {
				try {
					this.isPostLoading = true;
					const response = await axios.get('https://jsonplaceholder.typicode.com/posts/', {
						params: {
							_limit: this.limit,
							_page: this.page
						}
					});
					this.totalPage = Math.ceil(response.headers["x-total-count"] / this.limit);
					this.posts = response.data;
				} catch (e) {
					alert('ошибка')
				} finally {
					this.isPostLoading = false;
				}
			},

			async loadMorePosts() {
				try {
					this.page += 1;
					const response = await axios.get('https://jsonplaceholder.typicode.com/posts/', {
						params: {
							_limit: this.limit,
							_page: this.page
						}
					});
					this.totalPage = Math.ceil(response.headers["x-total-count"] / this.limit);
					this.posts = [...this.posts, ...response.data];
				} catch (e) {
					alert('ошибка')
				}
			},

			// changePage(pageNumber) {
			// 	this.page = pageNumber;
			// this.fetchPosts()
			// }
		},
		/*
			 4 стадии жизненного цикла компонента:
			 - создание
			 - монтирование mounted()
			 - обновление
			 - удаление
		*/
		mounted() {
			//при монтировании посты сразу подгружаются
			this.fetchPosts();

			// var options = {
			// 	rootMargin: '0px',
			// 	threshold: 1.0
			// };
			// var callback = (entries, observer) => {
			// 	if (entries[0].isIntersecting && this.page < this.total ) {
			// 		this.loadMorePosts();
			// 	}
			// };
			// var observer = new IntersectionObserver(callback, options);
			// observer.observe(this.$refs.observerFromDom);
		},
		/*
			watch - наблюдаемая ф-ия (наблюдает за изменениями в данных)
			computed - вычисляемая ф-ия, всегда что-то возвращает (своего рода кешированная)
		*/
		computed: {
			sortedPosts() {
				//в этом случае не мутирует сам массив, и своего рода кешируется
				return [...this.posts].sort((post1, post2) => {
					return post1[this.selectedSort]?.localeCompare(post2[this.selectedSort])
				})
			},
			sortedAndSearchPosts() {
				return this.sortedPosts.filter(post => post.title.includes(this.searchQuery))
			}
		},
		watch: {
			/* ф-ия называется также как модель
			selectedSort(newValue) {
				в этом случае мутирует сам массив
				this.posts.sort((post1, post2) => {
					return post1[this.selectedSort]?.localeCompare(post2[this.selectedSort])
				})
			}
			page() {
				this.fetchPosts()
			}*/


		}
	}
</script>

<style>

	.app__btns {
		margin: 15px 0;
		display: flex;
		justify-content: space-between;
	}

	.page__wrapper {
		display: flex;
		margin-top: 15px;

	}

	.page {
		border: 1px solid black;
		padding: 10px;
	}

	.current-page {
		border: 3px solid teal;
	}

	.observer {
		height: 30px;
		background: green;
	}
</style>




































