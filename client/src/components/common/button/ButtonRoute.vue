<template>
    <ButtonBase
        :class="{ on: isCurrentPath }"
        :name="pathName"
        @onClick="goRoute"
    />
</template>

<script>
import ButtonBase from "@/components/common/button/ButtonBase";

import { computed } from "vue";
import { useRouter } from "vue-router";
import { useRoutePath } from "@/composables/routeHandler";

export default {
    name: "ButtonRoute",
    components: {
        ButtonBase,
    },
    props: {
        pathName: { type: String },
    },
    setup(props) {
        //============================ Path
        const { pathValidator } = useRoutePath();
        const path = `/${props.pathName}`;
        const isCurrentPath = computed(() => pathValidator.value(path));

        //============================ Router
        const router = useRouter();

        /**
         * path 이동
         */
        function goRoute() {
            router.push(path);
        }

        return {
            isCurrentPath,
            goRoute,
        };
    },
};
</script>

<style></style>
