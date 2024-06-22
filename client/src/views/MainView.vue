<template>
    <div id="main" class="box">
        <header>
            <h1 id="logo">해냄</h1>
            <ButtonBase name="logout" @onClick="logout" />
        </header>
        <MainCalendar v-model="selectedDate" />
        <MainList :date="selectedDate" />
    </div>
</template>

<script>
import MainList from "@/components/main/MainList.vue";
import MainCalendar from "@/components/main/MainCalendar.vue";
import ButtonBase from "@/components/common/button/ButtonBase";

import { ref } from "vue";
import { useRoutePath } from "@/composables/routeHandler";

export default {
    name: "MainView",
    components: {
        MainList,
        MainCalendar,
        ButtonBase,
    },
    setup() {
        //============================ Date
        const selectedDate = ref(new Date().toISOString().slice(0, 10));

        //============================ Logout
        const { PATH, goPath } = useRoutePath();

        /**
         * 사용자 정보를 모두 지운 후 로그인 페이지로 이동
         */
        function logout() {
            localStorage.clear();
            sessionStorage.clear();
            goPath(PATH.LOGIN);
        }

        return { selectedDate, logout };
    },
};
</script>
