import { MaybeRefOrGetter } from "vue"

export interface AbstractOptions {
    target?: MaybeRefOrGetter<HTMLElement | string>,
    content?: MaybeRefOrGetter<string>,
    timeout?: MaybeRefOrGetter<number>,
    wordLimit?: MaybeRefOrGetter<number>,
    tianliKey: MaybeRefOrGetter<string>
}

export interface AbstractProps {
    target?: HTMLElement | string,
    content?: string,
    timeout?: number,
    defer?: boolean,
    waitFor?: boolean,
    wordLimit?: number,
    tianliKey: string
}