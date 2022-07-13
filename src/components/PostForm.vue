<template>
	<h4>Создание поста</h4>
	<form action="" @submit.prevent>
		<my-input v-model="post.title" type="text" placeholder="Название" v-focus/>
		<my-input v-model="post.body" type="text" placeholder="Описание"/>  <!-- !! Двустороннее связывание -->

		<!-- !!! Все стили, события и т.д прописанные здесь будут применяться к корневому элементу компонента -->
		<my-button class="btn" @click="createPost" style="align-self: flex-end; margin-top: 15px;">Создать</my-button>
	</form>
</template>

<script>

	export default {
		data() {
			return {
				post: {
					title: '',
					body: '',
				}
			}
		},
		methods: {
			/*
			Здесь нужно передать данные с дочернего компонента в родительский.
			Для этого в ребенке нужно генерировать событие CreatePost(post).
			Из родительского компонента мы можем на это событие подписаться 	@create="CreatePost"

			this.$emit('Название созданного события', 'аргументы');

			 */

			createPost() {
				this.post.id = Date.now();
				this.$emit('create', this.post, 'empty param');
				this.post = {
					title: '',
					body: '',
				}
			}
		},
		watch: {
			//глубокое отслеживание, даже при изменении вложенных полей будет отрабатывать эта ф-ия
			post: {
				handler(newVal) {
					//console.log(newVal);
				},
				deep:true
			}
		}
	}
</script>

<style scoped>
	form {
		display: flex;
		flex-direction: column;
	}
</style>