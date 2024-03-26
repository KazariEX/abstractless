import type { MaybeRefOrGetter } from "vue";

export interface AbstractLessProps {
    target?: HTMLElement | string,
    content?: string,
    waitFor?: boolean,
    defer?: boolean,
    timeout?: number,
    wordLimit?: number,
    tianliKey: string
}

export interface UseAbstractOptions {
    target?: MaybeRefOrGetter<HTMLElement | string>,
    content?: MaybeRefOrGetter<string>,
    waitFor?: MaybeRefOrGetter<boolean>,
    defer?: boolean,
    timeout?: number,
    wordLimit?: number,
    tianliKey: string
}

export interface UseTypingOptions {
    speed?: number,
    punctuation?: RegExp,
    punctuationSpeedMultiplier?: number
}