import { createRouter, createWebHistory } from "vue-router";

import LoginView from "@/views/LoginView";
import MainView from "@/views/MainView";

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: "/",
            redirect: "/login",
        },
        {
            path: "/login",
            name: "LoginView",
            component: LoginView,
        },
        {
            path: "/main",
            name: "MainView",
            component: MainView,
        },
    ],
});

export default router;
