const routes = [
  {
    path: "/",
    name: "Lobby",
    components: {
      default: ()=> import("@/views/lobby/index.vue")
    },
    meta: { title: "Home - 杏仁レモンティー" }
  },
  {
    path: "/profile",
    name: "Profile",
    components: {
      topBar: ()=> import("@/components/TopBar.vue"),
      default: ()=> import("@/views/profile/index.vue")
    },
    meta: { title: "Profile - 杏仁レモンティー"}
  }
]

export default routes