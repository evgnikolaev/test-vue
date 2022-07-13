import {createApp} from 'vue'
import App from './App.vue' //импортируй компонент
import components from '@/components/UI'
import router from "@/router/router";
import store from "@/store/index";

import directives from "@/directives/index";


//создай экземпляр приложения App - App.vue ( компонеет, single file component) и монтируй его в #app
//createApp(App).mount('#app');


const app = createApp(App);

//Глобальная регистрация компонентов
components.forEach(component => {
	app.component(component.name, component)
});

directives.forEach(directive => {
	//своя директива
	app.directive(directive.name, directive);
});


//use(router) - подключение сторонних модулей
app
	.use(router)
	.use(store)
	.mount('#app');


