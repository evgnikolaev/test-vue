<template>
	<div>
<!--		<h1>{{likes}}</h1>-->
<!--		<my-button @click="addLike"></my-button>-->
		<h1>Страница с постами</h1>
		<my-input v-model="searchQuery" placeholder="Поиск" v-focus></my-input>
		<div class="app__btns">
			<my-button style="margin: 15px 0;">Сздать пост</my-button>
			<my-select v-model="selectedSort" :options="sortOptions"></my-select>
		</div>

		<my-dialog v-model:show="dialogVisible">
			<post-form/>
		</my-dialog>

		<post-list v-if="!isPostLoading" v-bind:posts="sortedAndSearchPosts"/>
		<div v-else>Загрузка...</div>

	</div>
</template>

<script>
	import PostForm from "@/components/PostForm";
	import PostList from "@/components/PostList";
	import MySelect from "@/components/UI/MySelect";
	import MyInput from "@/components/UI/MyInput";
	import {ref} from "vue";
	import MyButton from "../components/UI/MyButton";
	import {usePosts} from "../hooks/usePosts";
	import useSortedAndSearchedPosts from "../hooks/useSortedAndSearchedPosts";
	import useSortedPosts from "../hooks/useSortedPosts";

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
				sortOptions: [
					{value: 'title', name: 'По названию'},
					{value: 'body', name: 'По содержанию'}
				],

			}
		},

		// Composition Api - для того, чтобы логические куски деражть рядом
		setup(props) {
			const {posts, isPostLoading, totalPage} = usePosts(10);
			const {selectedSort, sortedPosts} = useSortedPosts(posts);
			const {searchQuery, sortedAndSearchPosts} = useSortedAndSearchedPosts(sortedPosts);
			return {
				posts, isPostLoading, totalPage,
				selectedSort, sortedPosts,
				searchQuery, sortedAndSearchPosts
			}

			// const likes = ref(1);
			// //все что мы вернм из этой ф-ии, будет доступна в шаблоне
			//
			// const addLike = ()=> {
			// 	likes.value += 1;//доступ к свойству value
			// };
			//
			// return {
			// 	likes,
			// 	addLike
			// }
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




































