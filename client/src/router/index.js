import { createRouter, createWebHistory } from "vue-router";

import AuthView from "@/views/AuthView";
import MainView from "@/views/MainView";
import LoginForm from "@/components/auth/LoginForm.vue";
import RegisterForm from "@/components/auth/RegisterForm.vue";

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: "/",
            name: "AuthView",
            component: AuthView,
            children: [
                {
                    path: "/login",
                    component: LoginForm,
                },
                {
                    path: "/register",
                    component: RegisterForm,
                },
            ],
            redirect: "/login",
            beforeEnter(to, from, next) {
                const isLoggedIn = sessionStorage.getItem("loggedIn");
                if (isLoggedIn) {
                    next("/main");
                } else {
                    next();
                }
            },
        },
        {
            path: "/main",
            name: "MainView",
            component: MainView,
            beforeEnter(to, from, next) {
                const isLoggedIn = sessionStorage.getItem("loggedIn");
                if (!isLoggedIn) {
                    next("/auth");
                } else {
                    next();
                }
            },
        },
    ],
});

export default router;
