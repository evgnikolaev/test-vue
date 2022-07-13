<template>
	<div>
		<!--
		$route - получить какие то данные
		$router - перемещение роутинг
		-->
		<h1>Это страница поста с ID= {{$route.params.id}}</h1>
	</div>
</template>

<script>
	export default {}
</script>

<style scoped>

</style>