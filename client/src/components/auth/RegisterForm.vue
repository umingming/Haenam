<template>
    <div class="auth-form">
        <InputBase v-model="idRef" name="id" />
        <InputBase v-model="pwRef" name="pw" type="password" />
        <ButtonBase name="register" @onClick="register" />
    </div>
</template>

<script>
import InputBase from "@/components/common/input/InputBase.vue";
import ButtonBase from "@/components/common/button/ButtonBase.vue";

import { useAuthorityConfig } from "@/composables/userHandler";
import { useRoutePath } from "@/composables/routeHandler";

import AUTH from "@/api/auth.js";

export default {
    components: {
        InputBase,
        ButtonBase,
    },
    setup() {
        const { idRef, pwRef, authConfig } = useAuthorityConfig();
        const { PATH, goPath } = useRoutePath();

        /**
         * 입력된 정보를 바탕으로 회원을 등록한다.
         */
        async function register() {
            try {
                const { status } = await AUTH.register(authConfig.value);
                if (status === 200) {
                    alert("회원가입 성공");
                    goPath(PATH.LOGIN);
                }
            } catch ({ status }) {
                const message =
                    status === 409 ? "존재하는 회원" : "서버 에러 발생";
                alert(message);
            }
        }

        return { idRef, pwRef, register };
    },
};
</script>

<style scoped></style>
