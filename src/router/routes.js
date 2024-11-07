const routes = [
  {
    path: "/",
    name: "Lobby",
    components: {
      main: ()=> import("@/views/lobby/index.vue")
    },
    meta: { title: "Home - 杏仁レモンティー" }
  },
  {
    path: "/profile",
    name: "Profile",
    components: {
      topBar: ()=> import("@/components/TopBar.vue"),
      main: ()=> import("@/views/profile/index.vue")
    },
    meta: { title: "Profile - 杏仁レモンティー"}
  }
]

export default routes