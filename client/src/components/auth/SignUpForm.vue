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
        <button @click="signUp">회원가입</button>
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
        };
    },
    methods: {
        ...mapMutations(["SET_USER_ID"]),
        async signUp() {
            try {
                const { status } = await auth.register({
                    id: this.id,
                    pw: this.pw,
                });
                if (status === 200) {
                    this.$emit("ok", this.id);
                }
            } catch ({ status }) {
                if (status === 409) {
                    alert("존재하는 회원입니다");
                }
            }
        },
    },
};
</script>

<style scoped></style>
