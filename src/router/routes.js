const routes = [
  {
    path: "/",
    name: "Home",
    components: {
      main: ()=> import("@/views/home/index.vue")
    }
  },
]

export default routes