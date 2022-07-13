<template>
	<button class="btn">
		<!--
			Слоты - сюда падает текст, который между тегами в родителе
		-->
		<slot></slot>
	</button>
</template>

<script>
	export default {
		name: 'my-button' //для импорта ui компонентов
	}
</script>

<style scoped>
	.btn {
		padding: 10px 15px;
		background: none;
		color: teal;
		border: 1px solid teal;
		cursor: pointer;
	}
</style>