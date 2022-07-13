<template>
	<div class="app">
		<!--
			шаблон компонента:
				{{}} - интерполяция модели (вывод данных)

			Директивы:
				v-on = @ : - события (@click)
					@submit.prevent - можно при помощи модификаторов например отменить действие по умолчанию
				v-for - вывод в цикле

			Двустроннее связывание:
			Связываение инпутов с моделью данных (для реактивности).
				1)  v-bind:value="title"   Забайндили модель title к инпуту(атрибуту инпута value)
				2)  @input="inputTitle" - описалии событие на input текста, чтобы при изменении сохранялась модель title
					@input="title = $event.target.value" - укороченная запись (используя зарезервированное слово $event)



			По таблице видно какой атрибут, какого элемента, по какому событию можно делать двустороннее связывание:

			Элемент			Событие			Атрибут

			input			oninput			value

			textarea		onchange		checked
			checkbox

			radio			onchange		value
			списки


			Чтобы не расписывать много кода
			<input     v-bind:value="body"    @input="body = $event.target.value"

			для стандартных элементов формы можно использовать директиву v-model="title"

		-->

		<h4>Создание поста</h4>
		<form action="" @submit.prevent>
			<input v-bind:value="title" @input="inputTitle" class="input" type="text" placeholder="Название">
			<input v-bind:value="body" @input="body = $event.target.value" class="input" type="text" placeholder="Описание">  <!-- !! Двустороннее связываение -->
			<button class="btn" @click="createPost">Создать</button>
		</form>


		<div class="post" v-for="post in posts" v-bind:key="post">
			<div><strong>Название:</strong> {{post.title}}</div>
			<div><strong>Описание:</strong> {{post.body}}</div>
		</div>
	</div>
</template>

<script>
	//логика, компонента. Нужно экспортировать объект
	export default {
		data() {
			return {
				posts: [
					{id: 1, title: 'java-script', body: 'Описание поста 1'},
					{id: 2, title: 'java-script', body: 'Описание поста 2'},
					{id: 2, title: 'java-script', body: 'Описание поста 3'},
				],
				title: '',
				body: ''
			}
		},
		methods: {
			createPost() {
				const newPost = {
					id: Date.now(),
					title: this.title,
					body: this.body
				};
				this.posts.push(newPost);
				this.title = '';
				this.body = '';
			},
			inputTitle(e) {
				this.title = e.target.value;
			}
		}
	}
</script>

<style>
	/* scoped - стили применятся только к компоненту */
	* {
		margin: 0;
		padding: 0;
		box-sizing: border-box;
	}

	.app {
		padding: 20px;
	}

	.post {
		margin-top: 15px;
		padding: 15px;
		border: 2px solid teal;
	}

	form {
		display: flex;
		flex-direction: column;

	}

	.input {
		width: 100%;
		border: 1px solid teal;
		padding: 10px 15px;
		margin-top: 15px;
		outline: none;
	}

	.btn {
		align-self: flex-end;
		margin-top: 15px;
		padding: 10px 15px;
		background: none;
		color: teal;
		border: 1px solid teal;
		cursor: pointer;
	}
</style>




































