<template>
    <div class="auth-form">
        <InputBase v-model="idRef" name="id" text="아이디" />
        <InputBase v-model="pwRef" name="pw" text="비밀번호" type="password" />
        <div class="login-keep">
            <input id="keep-check" v-model="rememberMe" type="checkbox" />
            <label for="keep-check">Remember Me</label>
        </div>
        <ButtonBase action="login" @onClick="login" />
    </div>
</template>

<script>
import InputBase from "@/components/common/input/InputBase.vue";
import ButtonBase from "@/components/common/button/ButtonBase.vue";

import { onMounted } from "vue";
import { useLocalStorage } from "@/composables/dataHandler";
import { useAuthorityConfig, useUserInfo } from "@/composables/userHandler";
import { useRoutePath } from "@/composables/routeHandler";

import AUTH from "@/api/auth";

export default {
    components: {
        InputBase,
        ButtonBase,
    },
    setup() {
        //============================ LocalStorage
        const { item: rememberMe, updateItem: updateRememberMe } =
            useLocalStorage("rememberMe", false);
        const { item: userId, updateItem: updateUserId } =
            useLocalStorage("userId");

        //============================ Auth Config
        const { idRef, pwRef, authConfig } = useAuthorityConfig();
        const { afterLogin } = useUserInfo();
        const { PATH, goPath } = useRoutePath();

        async function login() {
            try {
                const { data } = await AUTH.login(authConfig.value);

                // localStorage 엄데이트
                updateRememberMe();
                updateUserId(rememberMe.value, idRef.value);

                // 로그인 성공 정보 저장
                afterLogin(data);
                alert("로그인 성공");

                goPath(PATH.MAIN);
            } catch (error) {
                if (error.status === 401) {
                    console.log(error);
                    alert(`유효하지 않은 ${error.data.error.message}`);
                } else {
                    console.log(error);
                }
            }
        }

        onMounted(() => {
            idRef.value = userId.value;
        });

        return { rememberMe, idRef, pwRef, login };
    },
};
</script>

<style scoped></style>
