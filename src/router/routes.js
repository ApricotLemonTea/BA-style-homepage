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
  {
    path: "/profile",
    name: "Profile",
    components: {
      topBar: ()=> import("@/components/TopBar.vue"),
      main: ()=> import("@/views/profile/index.vue")
    }
  }
]

export default routes