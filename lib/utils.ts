import { ref, toValue, onMounted, MaybeRefOrGetter } from "vue";
import { promiseTimeout, until } from "@vueuse/core";
import type { UseAbstractOptions, UseTypingOptions } from "./types";

export function useAbstract(options: UseAbstractOptions = {}) {
    const error = ref(null);
    const pending = ref(false);
    const summary = ref("");

    function buildContent() {
        const target = toValue(options.target);
        const content = toValue(options.content);
        const wordLimit = options.wordLimit ?? 1000;

        let text = content;
        if (!content && target) {
            const container = (typeof target === "string") ? document.querySelector(target) : target;
            if (!container) return "";

            const title = document.title;
            const headings = container.querySelectorAll("h1, h2, h3, h4, h5");
            const paragraphs = container.querySelectorAll("p");

            for (const h of headings) {
                text += h.textContent + " ";
            }

            for (const p of paragraphs) {
                text += p.textContent.replaceAll(/https?:\/\/[^\s]+/g, "");
            }
            text = title + " " + text;
        }
        return text.slice(0, wordLimit);
    }

    async function fetchAbstract() {
        try {
            //开始处理
            error.value = null;
            pending.value = true;

            const {
                timeout = 20000,
                tianliKey
            } = options;

            const content = buildContent();
            if (content.length === 0) {
                throw new Error("Content is empty");
            }

            const url = new URL("https://summary.tianli0.top");
            for (const [key, value] of Object.entries({
                key: tianliKey,
                title: document.title,
                content
            })) {
                url.searchParams.append(key, value);
            }

            const controller = new AbortController();
            const timer = setTimeout(() => controller.abort(), timeout);
            const res = await fetch(url, { signal: controller.signal });
            const data = await res.json();
            clearTimeout(timer);

            if (res.ok) {
                summary.value = data.summary;
            }
            else {
                const unknown = "未知错误，请检查 API 文档";
                const info =
                    (res.status === 514) ?
                        "TianliGPT is only available in mainland China, and is not yet open to overseas users, so stay tuned!" :
                    (res.status === 403) ?
                    {
                        1: "你的网站设置了 Referrer-Policy 为 same-origin，这会导致 Tianli 无法验证你的请求来源。TianliGPT 依赖 refer 进行来源判断，特别是 meta 标签的 referrer 属性需要修改，至少为 origin（例如：<meta name=\"referrer\" content=\"origin\">）",
                        2: "你正在使用的 tianli-key 已经被其他网站绑定或不存在，请检查当前网站地址是否在 summary.zhheo.com 中已绑定",
                        3: "参数缺失，请检查是否正确配置 tianli-key",
                        4: "tianli-key 错误或余额不足，请充值后请求新的文章",
                        5: data.err_msg,
                        6: data.err_msg,
                        7: data.err_msg
                    }[data.err_code] ?? unknown : unknown;

                throw new Error(info);
            }
        }
        catch (err) {
            error.value = err;

            console.error("TianliGPT:", {
                AbortError: "获取文章摘要超时。当你出现这个问题时，可能是 tianli-key 或者绑定的域名不正确，也可能是因为文章过长导致的 AI 运算量过大，您可以稍等一下然后刷新页面重试"
            }[err.name] ?? err.message);
        }
        finally {
            //结束处理
            pending.value = false;
        }
    }

    !options.defer && onMounted(async () => {
        await until(options.waitFor ?? true).toBeTruthy();
        fetchAbstract();
    });

    return {
        error,
        pending,
        summary,
        fetchAbstract
    };
}

export function useTyping(text: MaybeRefOrGetter<string>, options: UseTypingOptions = {}) {
    const isTyping = ref(false);
    const typedText = ref("");

    async function run() {
        //开始打字
        isTyping.value = true;

        const raw = toValue(text);
        const {
            speed = 40,
            punctuation = /[,.!?:;，。、！？：；]/,
            punctuationSpeedMultiplier = 6
        } = options;

        for (let i = 0; i < raw.length && isTyping.value; i++) {
            typedText.value = raw.slice(0, i + 1);
            const isPunctuation = punctuation.test(raw[i]);
            const delay = 1000 / speed * (isPunctuation ? 6 : 1);
            await promiseTimeout(delay);
        }

        //结束打字
        isTyping.value = false;
    }

    function stop() {
        isTyping.value = false;
    }

    return {
        isTyping,
        typedText,
        run,
        stop
    };
}

