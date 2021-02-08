import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

 // eslint-disable-next-line
const routes: Array<any> = [
  {
    path: "",
    name: "index",
    redirect: '/progress',
    component: () => import("../components/index"),
    children: [
      {
        path: "progress",
        name: "progress",
        component:() => import("../components/progress"),
      },
      {
        path: "compete",
        name: "compete",
        component:() => import("../components/compete"),
      }
    ],
  },
];

const router: VueRouter = new VueRouter({
  mode: 'history',
  routes
});


router.beforeEach((to, from, next): void=>{
  if(to.fullPath != '/progress' && to.fullPath != '/compete') {
    next({path:'/progress'});
  }
  next();
})


export default router;
