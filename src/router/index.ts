import {createRouter, createWebHistory, RouteRecordNormalized, RouteRecordRaw} from 'vue-router'
import Project1 from "@/views/menu/Project1View.vue";
import Project2 from "@/views/menu/Project2View.vue";
import Project3 from "@/views/menu/Project3View.vue";
import About from "@/views/menu/AboutView.vue";
import PageNotFound from "@/views/service/PageNotFound.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'project1',
    component: Project1,
    meta: {
      title: 'Template №1 - Project № 1',
      metaTags: [
        {
          property: 'og:title',
          content: 'Project № 1'
        },
        {
          property: 'og:description',
          content: 'Project № 1'
        },
        {
          property: 'og:image',
          content: 'https://vue-template-ts.vercel.app/assets/ogimage/image_all.jpg'
        },
        {
          property: 'og:url',
          content: 'https://vue-template-ts.vercel.app'
        },
        {
          property: 'og:type',
          content: 'website'
        },
      ]
    }
  },
  {
    path: '/project2',
    name: 'project2',
    component: Project2,
    meta: {
      title: 'Template №1 - Project № 2',
      metaTags: [
        {
          property: 'og:title',
          content: 'Project № 2'
        },
        {
          property: 'og:description',
          content: 'Project № 2'
        },
        {
          property: 'og:image',
          content: 'https://vue-template-ts.vercel.app/assets/ogimage/image_all.jpg'
        },
        {
          property: 'og:url',
          content: 'https://vue-template-ts.vercel.app'
        },
        {
          property: 'og:type',
          content: 'website'
        },
      ]
    }
  },
  {
    path: '/project3',
    name: 'project3',
    component: Project3,
    meta: {
      title: 'Template №1 - Project № 3',
      metaTags: [
        {
          property: 'og:title',
          content: 'Project № 3'
        },
        {
          property: 'og:description',
          content: 'Project № 3'
        },
        {
          property: 'og:image',
          content: 'https://vue-template-ts.vercel.app/assets/ogimage/image_all.jpg'
        },
        {
          property: 'og:url',
          content: 'https://vue-template-ts.vercel.app'
        },
        {
          property: 'og:type',
          content: 'website'
        },
      ]
    }
  },
  {
    path: '/about',
    name: 'about',
    component: About,
    meta: {
      title: 'About this Project',
      metaTags: [
        {
          property: 'og:title',
          content: 'About this project'
        },
        {
          property: 'og:description',
          content: 'About this project'
        },
        {
          property: 'og:image',
          content: 'https://vue-template-ts.vercel.app/assets/ogimage/image_all.jpg'
        },
        {
          property: 'og:url',
          content: 'https://vue-template-ts.vercel.app'
        },
        {
          property: 'og:type',
          content: 'website'
        },
      ]
    }
  },
  {
    path: '/:catchAll(.*)',
    name: 'PageNotFound',
    component: PageNotFound,
    meta: {
      title: 'Page NOT Found',
      metaTags: [
        {
          property: 'og:title',
          content: 'Page NOT Found'
        },
        {
          property: 'og:description',
          content: 'Page NOT Found'
        },
        {
          property: 'og:image',
          content: 'https://vue-template-ts.vercel.app/assets/ogimage/image_all.jpg'
        },
        {
          property: 'og:url',
          content: 'https://vue-template-ts.vercel.app'
        },
        {
          property: 'og:type',
          content: 'website'
        },
      ]
    }
  }
]

// const router = createRouter({
//   history: createWebHistory(process.env.BASE_URL),
//   routes

const {BASE_URL} = process.env;
const router = createRouter({
  history: createWebHistory(BASE_URL),
  routes
});

// Этот callback запускается перед каждым изменением маршрута, в том числе при загрузке страницы.
router.beforeEach((to, from, next) => {
// Это просматривает совпадающие маршруты от последнего к первому, находя ближайший маршрут с заголовком.
// Например, если у нас есть `/some/deep/nested/route`, и `/some`, `/deep` и `/nested` имеют заголовки, будут выбраны `/nested`.

  // const loggedIn = localStorage.getItem('expiration') // Проверяем, авторизован ли пользователь
  // if (to.matched.some(record => record.meta.requiresAuth) && !loggedIn) {
  //   next('/login') // Если пользователь не авторизован, перенаправляем его на страницу логина
  // }

  // Этот код позволяет управлять заголовками страниц и мета-тегами при навигации между маршрутами.
  // Он также удаляет и очищает устаревшие мета-теги, которые были добавлены при предыдущих навигациях,
  // чтобы избежать конфликтов и обеспечить корректное обновление мета-информации на каждой странице.

  // Находим ближайший маршрут с метаданными 'title'
  const nearestWithTitle = to.matched.slice().reverse().find(r => r.meta && r.meta.title);
  // Находим ближайший маршрут с метаданными 'metaTags'
  const nearestWithMeta = to.matched.slice().reverse().find((r: any) => r.meta && r.meta.metaTags) as RouteRecordNormalized;
  // Находим ближайший маршрут с метаданными 'metaTags' у предыдущего маршрута
  const previousNearestWithMeta = from.matched.slice().reverse().find(r => r.meta && r.meta.metaTags);

  // Если маршрут с заголовком был найден, устанавливает заголовок документа (страницы) в это значение.
  if (nearestWithTitle && nearestWithTitle.meta && nearestWithTitle.meta.title) {
    document.title = nearestWithTitle.meta.title as string;
  } else if (previousNearestWithMeta && previousNearestWithMeta.meta && previousNearestWithMeta.meta.title) {
    document.title = previousNearestWithMeta.meta.title as string;
  }

  // Удаляем все элементы, которые были добавлены через Vue Router
  const controlledElements = Array.from(document.querySelectorAll('[data-vue-router-controlled]')) as HTMLElement[];
  controlledElements.forEach(el => el.parentNode?.removeChild(el));

  // Проверяем, есть ли у нас метатеги для рендеринга.
  // Если их нет, то пропускаем рендеринг и переходим к следующему маршруту с помощью return next().
  if (!nearestWithMeta) {
    return next();
  }

  // Обрабатываем и добавляем метатеги в тег <head> документа на основе данных из массива metaTags.
  if ('meta' in nearestWithMeta && Array.isArray(nearestWithMeta.meta["metaTags"])) {
    nearestWithMeta.meta["metaTags"].map((tagDef: { [key: string]: string }) => {

      const tag = document.createElement('meta');

      Object.keys(tagDef).forEach(key => {
        tag.setAttribute(key, tagDef[key]);
      });
      // Используем это, чтобы отслеживать, какие метатеги мы создаем, чтобы не мешать другим.
      tag.setAttribute('data-vue-router-controlled', '');

      return tag;
    })
      // Добавляем метатеги в тег head документа.
      .forEach(tag => document.head.appendChild(tag));
  }
  next();
});

export default router
