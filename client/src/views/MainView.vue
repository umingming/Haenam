<template>
    <div id="main" class="box">
        <header>
            <h1 id="logo">해냄</h1>
            <base-button name="signOut" @onClick="signOut"></base-button>
        </header>
        <main-calendar></main-calendar>
        <main-list></main-list>
    </div>
</template>

<script>
import MainList from "@/components/main/MainList.vue";
import MainCalendar from "@/components/main/MainCalendar.vue";
import BaseButton from "@/components/base/BaseButton.vue";
export default {
    name: "MainView",
    components: {
        MainList,
        MainCalendar,
        BaseButton,
    },
    methods: {
        signOut() {
            localStorage.clear();
            sessionStorage.clear();
            this.$router.push("/auth");
        },
    },
};
</script>
