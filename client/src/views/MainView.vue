<template>
    <div id="main" class="box">
        <header>
            <h1 id="logo">{{ logo }}</h1>
            <base-button name="signOut" @onClick="signOut"></base-button>
        </header>
        <main-list></main-list>
    </div>
</template>

<script>
import MainList from "@/components/main/MainList.vue";
export default {
    name: "MainView",
    components: {
        MainList,
    },
};
</script>
