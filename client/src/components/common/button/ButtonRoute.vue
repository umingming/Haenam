<template>
    <ButtonBase
        :class="{ on: isCurrentPath }"
        :name="pathName"
        @onClick="goPath(path)"
    />
</template>

<script>
import ButtonBase from "@/components/common/button/ButtonBase";

import { computed } from "vue";
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
        const { pathValidator, goPath } = useRoutePath();
        const path = `/${props.pathName}`;
        const isCurrentPath = computed(() => pathValidator.value(path));

        return {
            path,
            isCurrentPath,
            goPath,
        };
    },
};
</script>

<style></style>
