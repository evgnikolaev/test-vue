<template>
	2,53 minut <br><br>
	<navbar></navbar>
	<div class="app">
		<!--
		router-view - именно сюда будут встраиваться компоеннты роутинга по соответствющему маршруту
		-->
		<router-view></router-view>
	</div>
</template>

<script>
	import Navbar from "./components/Navbar";

	export default {
		components: {
			Navbar
		}
	}
</script>

<style>
	* {
		margin: 0;
		padding: 0;
		box-sizing: border-box;
	}

	.app {
		padding: 20px;
	}

</style>