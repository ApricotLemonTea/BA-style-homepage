const routes = [
  {
    path: "/",
    redirect: { name: "Lobby" }
  },
  {
    path: "/lobby",
    name: "Lobby",
    components: {
      main: ()=> import("@/views/lobby/index.vue")
    }
  },
]

export default routes