<template>
    <div id="login-form">
        <div class="login-text">
            <label for="id">아이디</label>
            <input type="text" id="id" v-model="id" />
        </div>
        <div class="login-text">
            <label for="pw">비밀번호</label>
            <input type="password" id="pw" v-model="pw" />
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
import auth from "@/api/auth.js";
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
                const { data } = await auth.login({
                    id: this.id,
                    pw: this.pw,
                });

                if (this.keepLoggedIn) {
                    localStorage.setItem("user_id", data.user_id);
                } else {
                    sessionStorage.setItem("user_id", data.user_id);
                }
                alert("로그인 성공");
                this.$router.push("/main");
            } catch ({ status }) {
                if (status === 404) {
                    alert("존재하지 않는 아디디");
                } else if (status === 401) {
                    alert("비밀번호 불일치");
                }
            }
        },
    },
};
</script>

<style scoped></style>
