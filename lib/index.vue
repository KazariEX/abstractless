<script lang="ts" setup>
    import { onMounted } from "vue";
    import { until } from "@vueuse/core";
    import { AbstractProps } from "./types";
    import { useAbstract } from "./utils";

    const props = withDefaults(defineProps<AbstractProps>(), {
        defer: false,
        waitFor: true
    });

    const { error, pending, summary, fetchAbstract } = useAbstract({
        target: () => props.target,
        content: () => props.content,
        wordLimit: () => props.wordLimit,
        tianliKey: () => props.tianliKey
    });

    onMounted(async () => {
        if (props.defer) {
            await until(() => props.waitFor).toBeTruthy();
        }
        fetchAbstract();
    });
</script>

<template>
    <slot :error="error" :pending="pending" :summary="summary"></slot>
</template>