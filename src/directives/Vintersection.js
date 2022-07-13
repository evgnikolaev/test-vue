export default {
	//el - dom элемент
	//binding - то что передали v-intersection="loadMorePosts"
	mounted(el, binding) {
		var options = {
			rootMargin: '0px',
			threshold: 1.0
		};
		var callback = (entries, observer) => {
			if (entries[0].isIntersecting) {
				binding.value();// то что передали v-intersection="loadMorePosts"
			}
		};
		var observer = new IntersectionObserver(callback, options);
		observer.observe(el);
	},
	name: 'intersection'
}