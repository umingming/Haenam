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
import { mapMutations } from "vuex";
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
        ...mapMutations(["SET_USER_ID"]),
        async login() {
            try {
                const { data } = await common.login({
                    id: this.id,
                    pw: this.pw,
                });
                localStorage.setItem("user_id", data.user_id);
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
