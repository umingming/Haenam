<template>
    <div class="auth-form">
        <InputBase v-model="id" name="id" />
        <InputBase v-model="pw" name="pw" type="password" />
        <div class="login-keep">
            <input id="keep-check" v-model="keepLoggedIn" type="checkbox" />
            <label for="keep-check">로그인 상태 유지</label>
        </div>
        <ButtonBase name="login" @onClick="login" />
    </div>
</template>

<script>
import InputBase from "@/components/common/input/InputBase.vue";
import ButtonBase from "@/components/common/button/ButtonBase.vue";
import { mapMutations } from "vuex";
import auth from "@/api/auth.js";
export default {
    components: {
        InputBase,
        ButtonBase,
    },
    data() {
        return {
            id: "",
            pw: "",
            keepLoggedIn: false,
        };
    },
    methods: {
        ...mapMutations(["SET_USER_ID", "SET_LOGIN_STATUS"]),
        async login() {
            try {
                const param = { id: this.id, pw: this.pw };
                const { data } = await auth.login(param);

                if (this.keepLoggedIn) {
                    localStorage.setItem("userId", data.user_id);
                } else {
                    sessionStorage.setItem("userId", data.user_id);
                }

                alert("로그인 성공");

                this.SET_LOGIN_STATUS(true);
                this.$router.push("/main");
            } catch (error) {
                if (error.status === 401) {
                    alert(`유효하지 않은 ${error.data.error}`);
                } else {
                    console.log(error);
                }
            }
        },
    },
};
</script>

<style scoped></style>
