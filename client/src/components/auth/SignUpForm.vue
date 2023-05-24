<template>
    <div id="login-form">
        <div class="login-text">
            <label for="id">아이디</label>
            <input type="text" id="id" v-model="id" />
        </div>
        <div class="login-text">
            <label for="pw">비밀번호</label>
            <input type="text" id="pw" v-model="pw" />
        </div>
        <div class="login-keep">
            <input type="checkbox" id="keep-check" v-model="keepLoggedIn" />
            <label for="keep-check">로그인 상태 유지</label>
        </div>
        <button @click="login">로그인</button>
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
            keepLoggedIn: false,
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

                if (this.keepLoggedIn) {
                    localStorage.setItem("user_id", data.user_id);
                } else {
                    sessionStorage.setItem("user_id", data.user_id);
                }

                this.$router.push("/main");
            } catch (error) {
                console.log(error);
            }
        },
    },
};
</script>

<style scoped></style>
