import {createRouter, createWebHistory} from "vue-router";
import Main from "@/pages/Main";
import PostPage from "@/pages/PostPage";
import About from "@/pages/About";
import PostidPage from "@/pages/PostidPage";
import PostPageWithStore from "@/pages/PostPageWithStore";
import PostPageComposition from "@/pages/PostPageComposition";

const routes = [
	{
		path: '/',
		component: Main
	},
	{
		path: '/about',
		component: About
	},
	{
		path: '/posts',
		component: PostPage
	},
	{
		path: '/posts/:id',
		component: PostidPage
	},
	{
		path: '/store',
		component: PostPageWithStore
	},
	{
		path: '/composition',
		component: PostPageComposition
	},
];

// используя модуль router создай роутинг
const router = createRouter({
	routes,
	history: createWebHistory(process.env.BASE_URL)
});

export default router;