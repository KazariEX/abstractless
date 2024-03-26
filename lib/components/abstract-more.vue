<script lang="ts" setup>
    import { computed, watch } from "vue";
    import { AbstractLessProps } from "../types";
    import { useAbstract, useTyping } from "../utils";

    const props = withDefaults(defineProps<{
        title?: string,
        name?: string,
        typingEffect?: boolean
    } & AbstractLessProps>(), {
        title: "AI-摘要",
        name: "TianliGPT",
        typingEffect: true
    });

    const { error, pending, summary } = useAbstract({
        target: () => props.target,
        content: () => props.content,
        waitFor: () => props.waitFor,
        defer: props.defer,
        wordLimit: props.wordLimit,
        timeout: props.timeout,
        tianliKey: props.tianliKey
    });

    const { isTyping, typedText, run, stop } = useTyping(summary);

    const displayText = computed(() => {
        return pending.value ? "生成中..." : props.typingEffect ? typedText.value : summary.value;
    });

    watch(pending, () => {
        if (pending.value) {
            stop();
        }
        else if (error.value) {

        }
        else if (props.typingEffect) {
            run();
        }
    });
</script>

<template>
    <div class="abstract-wrapper">
        <div class="abstract-header">
            <span class="abstract-icon"><svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 16 16"><path fill="currentColor" fill-rule="evenodd" d="M15.5 10.071c0-2.582-1.426-4.853-3.633-6.087l1.039-1.87a.75.75 0 1 0-1.312-.728l-1.11 1.997A8.1 8.1 0 0 0 8 3a8.1 8.1 0 0 0-2.485.383l-1.11-1.997a.75.75 0 1 0-1.31.728l1.038 1.87C1.926 5.218.5 7.489.5 10.07c0 .813.169 1.603.614 2.294c.448.697 1.09 1.158 1.795 1.46C4.227 14.39 6.02 14.5 8 14.5s3.773-.11 5.09-.675c.707-.302 1.348-.763 1.796-1.46c.446-.691.614-1.481.614-2.294m-13.5 0C2 12.5 4 13 8 13s6-.5 6-2.929c0-3-2.5-5.571-6-5.571s-6 2.57-6 5.57Zm8.5 1.179a.75.75 0 0 1-.75-.75V9a.75.75 0 0 1 1.5 0v1.5a.75.75 0 0 1-.75.75m-5.75-.75a.75.75 0 0 0 1.5 0V9a.75.75 0 0 0-1.5 0z" clip-rule="evenodd"/></svg></span>
            <span class="abstract-title">{{ title }}</span>
            <span class="abstract-tag">{{ name }}</span>
        </div>
        <div class="abstract-content">{{ displayText }}</div>
        <div class="abstract-footer">

        </div>
    </div>
</template>

<style lang="scss">
    .abstract-wrapper {
        --abs-white: rgb(255 255 255);
        --abs-background-color: rgb(248 248 248);
        --abs-border-color: rgb(224 224 224);
        --abs-tag-color: rgb(92 118 235);

        padding: 12px 16px;
        border: 1px solid var(--abs-border-color);
        border-radius: 16px;
        background-color: var(--abs-background-color);
    }

    .abstract-header {
        display: flex;
        gap: 6px;
        padding-inline: 4px;
        line-height: 24px;
    }

    .abstract-icon {
        display: flex;
        align-items: center;
        font-size: 18px;
    }

    .abstract-title {
        font-weight: bold;
    }

    .abstract-tag {
        margin-left: auto;
        padding-inline: 8px;
        border-radius: 12px;
        background-color: var(--abs-tag-color);
        font-size: 12px;
        font-weight: bold;
        color: var(--abs-white);
    }

    .abstract-content {
        margin-top: 12px;
        padding: 8px 12px;
        border: 1px solid var(--abs-border-color);
        border-radius: 8px;
        background-color: var(--abs-white);
        font-size: 15px;
        line-height: 23px;
    }
</style>