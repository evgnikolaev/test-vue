<template>
	<div class="navbar">
		<div @click="$router.push('/')">Vue3</div>
		<div class="navbar__btns">
			<my-button @click="$router.push('/posts')">Посты</my-button>
			<my-button @click="$router.push('/about')" style="margin-left: 20px;">О нас</my-button>
			<my-button @click="$router.push('/store')" style="margin-left: 20px;">store</my-button>
			<my-button @click="$router.push('/composition')" style="margin-left: 20px;">composition</my-button>
		</div>
		<!--
		$router.push('/') - перелинковка

		аналог шиперссылок
		<router-link to="/users">Пользователи</router-link>
		<router-link to="/about">О нас</router-link>-->
	</div>
</template>

<script>
	export default {}
</script>

<style scoped>

	.navbar {
		height: 50px;
		background-color: lightgray;
		display: flex;
		align-items: center;
		padding: 0 15px;
	}

	.navbar__btns {
		margin-left: auto;
	}
</style>