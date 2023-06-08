<template>
    <div id="auth-form">
        <base-input v-model="id" name="id"></base-input>
        <base-input v-model="pw" name="pw" type="password"></base-input>
        <div class="login-keep">
            <input type="checkbox" id="keep-check" v-model="keepLoggedIn" />
            <label for="keep-check">로그인 상태 유지</label>
        </div>
        <base-button name="login" @onClick="login"> </base-button>
    </div>
</template>

<script>
import BaseInput from "@/components/common/base/BaseInput.vue";
import BaseButton from "@/components/common/base/BaseButton.vue";
import { mapMutations } from "vuex";
import auth from "@/api/auth.js";
export default {
    components: {
        BaseInput,
        BaseButton,
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
