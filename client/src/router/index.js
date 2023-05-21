import { createRouter, createWebHistory } from "vue-router";

import AuthView from "@/views/AuthView";
import MainView from "@/views/MainView";

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: "/",
            redirect: "/auth",
        },
        {
            path: "/auth",
            name: "AuthView",
            component: AuthView,
        },
        {
            path: "/main",
            name: "MainView",
            component: MainView,
        },
    ],
});

export default router;
