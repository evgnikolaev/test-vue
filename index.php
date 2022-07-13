<? /*

https://www.youtube.com/watch?v=XzLuMtDelGk&ab_channel=UlbiTV


Vue3  https://v3.ru.vuejs.org/

Для рендеринга Vue под капотом строит виртуальное дерево Virtual Dom.
После сравнивает Dom-дерево и Virtual Dom, и всей пачкой отдает Dom-дереву.

Компонентный подход.
Компонент - переиспольуемые куски кода.
Имеется корневой узел-компонент, в него подключаются другие компоненты.

Реактивность.
Здесь мы сосредотачиваемся на логике работы с данными. не описывая вывод, отображение кодом.




Установка
npm install -g @vue/cli
vue create . (.-текущая папка, можно указать project_name папку) - с помощью мастера создаем проект
npm run serve - запуск в режиме разработки




Компонент
vbase - короткая запись  для компонента



шаблон компонента:
			{{}} - интерполяция модели (вывод данных)

		Директивы:
			v-on:click = @click : - события (@click)
				@submit.prevent - можно при помощи модификаторов например отменить действие по умолчанию
			v-for - вывод в цикле


1) Двустороннее связывание
		<input type="text" v-model="post.title">
		<input type="text" :value="post.title" @input="changeInput">


2) Прокидывание данных между компонентами:

		!!! Родитель - ребенок  : через пропсы

				Родитель
				<post-list :postsP="posts"></post-list>

				Ребенок
				export default {
					props: {
						postsP: {
							type: Array,
							required: true
						}
					}
				}



		!!! Ребенок - родитель  : через события emit

				Родитель
				<post-form @create="createNewPost"></post-form>

				Ребенок
				export default {
					methods: {
						createPost() {
							this.$emit('create', this.post);
							}
						},
					}


		!!! При помощи v-model - в основном для input, select, checkbox,
		!!! Также работает и при передаче данных между компонентами
			Происходит как бы двустороннее связывание : 	Если изменится в родителе, изменится и в ребенке, и наоборот.

				Родитель
				<my-input v-model="post.title" type="text" placeholder="Название"/>

				Ребенок
				<input :value="modelValue" @input="updateInput" class="input" type="text">

				export default {
					name: 'my-input',
					props: {
						modelValue: [String, Number]
					},
					methods: {
						updateInput(event) {
							this.$emit('update:modelValue', event.target.value)
						}
					}
				}



3)			 4 стадии жизненного цикла компонента:
			 - создание
			 - монтирование mounted()
			 - обновление
			 - удаление




4) ф-ии компонента

			watch - наблюдаемая ф-ия (наблюдает за изменениями в данных)

			computed - вычисляемая ф-ия, всегда что-то возвращает (своего рода кешированная)
			<post-list :posts="sortedAndSearchPosts" /> - передаем computed совйство как данные


5) Можно также биндить классы, стили
			class="page" :class="{'current-page':page===pageNumber}"




6)  Доступ к DOM элементу
            <div class="observer" ref="observerFromDom"></div>
            this.$refs.observerFromDom



7) Пользовательские директивы и Миксины
            Можно создавать свои директивы (наподобие v-show).
            Например, чтобы использовать в рамках не только одного компонента.
			У директив свои хуки (жизненный циклы директив)

			Миксины - дублирующий функционал разных компонентов выносим в отдельный файл. Происходит слияние объектов:

            export default {                             export default {
					data() {},                                      data() {},
					methods: {},                                    methods: {},
					mounted() {},           ==>>                    methods: {},
					computed: {},                                   computed: {},
					watch: {}                                       watch: {}
			}                                             }



8) vuex - глобальное хранилище данных. Чтобы не прокидывать между компонентами данные

		export default createStore({
            namespaced: true,  - чтобы использовать пространство имен модуля
								    чтобы не использовать длинные названия в шаблонах  $store.state.НазваниеМодуля.... можно использовать модули
									import {mapState, mapGetters, mapActions, mapMutations} from "vuex";
 			modules: {}   модуль - изолированный кусочек состояния
		    state: () => ({данные})  само состояние, данные,
                                    {{$store.state.НазваниеМодуля.likes}} получить в шаблоне
			getters: {}   -  computed свойства (кешируемые)
                             {{$store.НазваниеМодуля.getters...}} получить в шаблоне
			mutations: {} -   изменять состояние, данные напрямую нельзя, можно изменять при помощи мутаций
                              {{$store.commit('НазваниеМодуля/sortedPosts')}} для вызова мутации в шаблоне
			actions: {}  ф-ии, которые внутри себя используют мутации
                            Параметром принимают объект контекст {state - данные, commit - для вызова мутаций, dispatch - для вызова других actions}
		});






















