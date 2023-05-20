<template>
    <div id="login-form">
        <div class="login-text">
            <label for="id">ID</label>
            <input type="text" id="id" v-model="id" />
        </div>
        <div class="login-text">
            <label for="pw">Password</label>
            <input type="text" id="pw" v-model="pw" />
        </div>
        <button @click="login">Sign In</button>
    </div>
</template>

<script>
import { mapMutations } from "vuex";
import common from "@/api/common.js";
export default {
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

<style scoped></style>
