import { createRouter, createWebHistory } from 'vue-router'

import AuthenticatePage from '../views/AuthenticatePage';
import HomePage from '../views/HomePage.vue';
import LostPetListPage from '../views/LostPetListPage.vue';
import PetDetailsPage from '../views/PetDetailsPage.vue';
import AnnouncementCreatePage from '../views/AnnouncementCreatePage.vue';
import UserProfilePage from '../views/UserProfilePage.vue';
import MapLookCompPage from '../views/MapLookPage.vue';
import NewsListPage from '../views/NewsListPage.vue';


const routes = [
  {
    path: '/authenticate',
    name: 'AuthenticationPage',
    component: AuthenticatePage
  },
  {
    path: '/',
    name: 'HomePage',
    component: HomePage
  },
  {
    path: '/list',
    name: 'LostPetListPage',
    component: LostPetListPage
  },
  {
    path: '/pet/:id',
    name: 'PetDetails',
    component: PetDetailsPage,
  },
  {
    path: '/announcementCreate',
    name: 'AnnouncementCreatePage',
    component: AnnouncementCreatePage
  },
  {
    path: '/profile',
    name: 'UserProfilePage',
    component: UserProfilePage
  },
  {
    path: '/maps',
    name: 'MapLookCompPage',
    component: MapLookCompPage
  },
  {
    path: '/news',
    name: 'NewsListPage',
    component: NewsListPage
  }
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
  })

export default router;