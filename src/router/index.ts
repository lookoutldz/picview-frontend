import {createRouter, createWebHistory} from 'vue-router'
import PicaView from "@/views/manga/PicaView.vue";
import HomeView from "@/views/HomeView.vue";
import FavoriteView from "@/views/manga/FaroviteView.vue";
import SettingView from "@/views/manga/SettingView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/home',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/favorite',
      name: 'favorite',
      component: FavoriteView
    },
    {
      path: '/pica/:bookName/:chapterName',
      name: 'pica',
      component: PicaView
    },
    {
      path: '/setting',
      name: 'setting',
      component: SettingView
    }
  ]
});

export default router;
