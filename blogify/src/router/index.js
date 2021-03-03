import Vue from 'vue'
import VueRouter from 'vue-router'
import Dashboard from '../views/Dashboard.vue'
import showBlogs from '../views/showBlogs.vue'
import addBlogs from '../views/addBlogs.vue'
import singleBlog from '../components/singleBlog.vue'

import firebase from 'firebase/app';
import 'firebase/auth';


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'dashboard',
    component: Dashboard
  },
  {
    path: '/showBlogs',
    name: 'showBlogs',
    component: showBlogs,
    // route guard
    meta: { requiresAuth: true }
  },
  {
    path: '/addBlogs',
    name: 'addBlogs',
    component: addBlogs,
    // route guard
    meta: { requiresAuth: true }
  },
  {
    path: '/blog/:id',
    name: 'singleBlog',
    component: singleBlog
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})


// ROUTE GUARD
router.beforeEach((to, from, next) => {
  // checks if the "to" route has meta=true to continue to "next" route 
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  // check if user is logged in or not
  const isAuthenticated = firebase.auth().currentUser;
  // if user requires auth and isnt, redirect to another page((/)dashboard)
  if (requiresAuth && !isAuthenticated) {
    next("/");
  } else {
    // if meta isnt needed proceed normally
    next();
  }

})

export default router
