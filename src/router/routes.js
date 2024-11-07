const routes = [
  {
    path: "/",
    name: "Lobby",
    component: ()=> import("@/views/lobby/index.vue"),
    meta: { title: "Home - 杏仁レモンティー" }
  },
  {
    path: "/profile",
    name: "Profile",
    component: ()=> import("@/views/profile/index.vue"),
    meta: { title: "Profile - 杏仁レモンティー"}
  }
]

export default routes