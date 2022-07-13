<template>
	<div>
		<h1>Страница с постами</h1>
		<my-input :model-value="searchQuery" @update:model-value="setSearchQuery" placeholder="Поиск" v-focus></my-input>
		<div class="app__btns">
			<my-button @click="showDialog" style="margin: 15px 0;">Сздать пост</my-button>
			<my-select :model-value="selectedSort"  @update:model-value="setSelectedSort" :options="sortOptions"></my-select>
		</div>
		<my-dialog v-model:show="dialogVisible">
			<post-form @create="createPost"/>
		</my-dialog>
		<post-list v-if="!isPostLoading" v-bind:posts="sortedAndSearchPosts" @remove="removePost"/>
		<div v-else>Загрузка...</div>
		<div class="observer" ref="observerFromDom" v-intersection="loadMorePosts"></div>
	</div>
</template>

<script>
	//чтобы не использовать длинные названия
	import {mapState, mapGetters, mapActions, mapMutations} from "vuex";

	import PostForm from "@/components/PostForm";
	import PostList from "@/components/PostList";


	import MySelect from "@/components/UI/MySelect";
	import MyInput from "@/components/UI/MyInput";
	import MyButton from "../components/UI/MyButton";

	export default {
		components: {
			MyButton,
			MyInput,
			MySelect,
			PostForm, PostList
		},
		data() {
			return {
				dialogVisible: false,
			}
		},
		methods: {
			...mapMutations({
				setPage: 'post/setPage',
				setSearchQuery: 'post/setSearchQuery',
				setSelectedSort: 'post/setSelectedSort',
			}),
			...mapActions({
				loadMorePosts: 'post/loadMorePosts',
				fetchPosts: 'post/fetchPosts'
			}),
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
		},
		mounted() {
			this.fetchPosts();
		},

		computed: {
			...mapState({
				posts: (state) => state.post.posts,
				isPostLoading: (state) => state.post.isPostLoading,
				selectedSort: (state) => state.post.selectedSort,
				sortOptions: (state) => state.post.sortOptions,
				searchQuery: (state) => state.post.searchQuery,
				page: (state) => state.post.page,
				limit: (state) => state.post.limit,
				totalPage: (state) => state.post.totalPage,
			}),
			...mapGetters({
				sortedPosts: 'post/sortedPosts',
				sortedAndSearchPosts: 'post/sortedAndSearchPosts'
			}),
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
		watch: {}
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




































