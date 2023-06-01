<template>
    <div id="auth-form">
        <base-input v-model="id" name="id"></base-input>
        <base-input v-model="pw" name="pw" type="password"></base-input>
        <base-button name="register" @onClick="register"> </base-button>
    </div>
</template>

<script>
import BaseInput from "@/components/base/BaseInput.vue";
import BaseButton from "@/components/base/BaseButton.vue";
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
        };
    },
    methods: {
        ...mapMutations(["SET_USER_ID"]),
        async register() {
            try {
                const { status } = await auth.register({
                    id: this.id,
                    pw: this.pw,
                });
                if (status === 200) {
                    alert("회원가입 성공");
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
