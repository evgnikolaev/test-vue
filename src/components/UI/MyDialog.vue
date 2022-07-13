<template>
	<div class="dialog" v-if="show" @click="hideDialog">
		<!-- @click.stop - отмена всплытия, краткая запись stopPropagation() -->
		<div class="dialog__content" @click.stop>
			<slot></slot>
		</div>
	</div>
</template>

<script>
	import toggleMixins from "../../mixins/toggleMixins";

	export default {
		name: 'my-dialog',
		mixins: [toggleMixins], //Миксины - готовые, переиспользуемые куски кода в компоненте
		mounted() {
			//При слиянии, сперва отработает из миксина, потом здесь
			// console.log('mixin mounted2');
		}
	}
</script>

<style scoped>
	.dialog {
		position: fixed;
		display: flex;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: rgba(0, 0, 0, 0.5);
	}

	.dialog__content {
		margin: auto;
		padding: 20px;
		background: white;
		border-radius: 12px;
		min-height: 50px;
		min-width: 300px;
	}
</style>




















