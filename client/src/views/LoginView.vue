<template>
    <div>
        <div>
            <input type="text" v-model="id" />
        </div>
        <div>
            <input type="text" v-model="pw" />
        </div>
        <button @click="login">확인</button>
    </div>
</template>

<script>
import common from "@/api/common.js";
export default {
    name: "LoginView",
    data() {
        return {
            id: "",
            pw: "",
        };
    },
    methods: {
        async login() {
            try {
                await common.login({
                    id: this.id,
                    pw: this.pw,
                });
                this.$router.push("/main");
            } catch (error) {
                console.log(error);
            }
        },
    },
};
</script>

<style>
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
}
</style>
