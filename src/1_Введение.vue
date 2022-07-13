<template>
	<div>
		<!--
			шаблон компонента:
			{{}} - интерполяция модели (подстановка данных)
			v-on = @ : - директивы
		-->
		<button v-on:click="addLike">like</button>
		<button @click="addDisLike">dislike</button>

		<div>
			количество лайков <strong>{{likes}}</strong>
		</div>
		<div>
			количество дизлайков <strong>{{dislikes}}</strong>
		</div>
	</div>
</template>

<script>
	//логика, компонента. Нужно экспортировать объект
	export default {
		data() {
			return {
				// модель (данные)
				likes: 0,
				dislikes: 0
			}
		},
		methods: {
			addLike() {
				//доступ к модели данных
				this.likes += 1;
			},
			addDisLike() {
				this.dislikes += 1;
			}
		}
	}
</script>

<style>

</style>




































