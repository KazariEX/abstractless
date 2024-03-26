<script lang="ts" setup>
    import { AbstractLessProps } from "../types";
    import { useAbstract } from "../utils";

    const props = defineProps<AbstractLessProps>();

    const { error, pending, summary, fetchAbstract } = useAbstract({
        target: () => props.target,
        content: () => props.content,
        waitFor: () => props.waitFor,
        defer: props.defer,
        wordLimit: props.wordLimit,
        timeout: props.timeout,
        tianliKey: props.tianliKey
    });
</script>

<template>
    <slot :error="error" :pending="pending" :summary="summary" :fetchAbstract="fetchAbstract"></slot>
</template>