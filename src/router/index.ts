import { createRouter, createWebHistory } from "vue-router";
import QuestionsView from "../views/QuestionsView.vue";
import DisplayProduct from "../views/DisplayProduct.vue";
import GetDisplayProduct from "@/views/GetDisplayProduct.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "questions",
      component: QuestionsView,
    },
    {
      path: "/products",
      name: "products",
      component: DisplayProduct,
    },
    {
      path: "/",
      redirect: "/addProduct",
    },
    {
      path: "/addProduct",
      component: GetDisplayProduct,
    },
  ],
});

export default router;
