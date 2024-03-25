import { ref, toValue } from "vue";
import type { AbstractOptions } from "./types";

export function useAbstract(options: AbstractOptions) {
    const error = ref(null);
    const pending = ref(false);
    const summary = ref("");

    function buildContent() {
        const target = toValue(options.target);
        const content = toValue(options.content);
        const wordLimit = toValue(options.wordLimit) ?? 1000;

        if (content) {
            return content;
        }
        else if (!target) {
            return "";
        }

        const container = (typeof target === "string") ? document.querySelector(target) : target;
        if (!container) return "";

        let text = "";
        const title = document.title;
        const headings = document.querySelectorAll("h1, h2, h3, h4, h5");
        const paragraphs = document.querySelectorAll("p");

        for (const h of headings) {
            text += h.textContent + " ";
        }

        for (const p of paragraphs) {
            text += p.textContent.replaceAll(/https?:\/\/[^\s]+/g, "");
        }

        const combinedText = title + " " + text;
        const truncatedText = combinedText.slice(0, wordLimit);
        return truncatedText;
    }

    async function fetchAbstract() {
        const timeout = toValue(options.timeout) ?? 20000;
        const tianliKey = toValue(options.tianliKey);

        try {
            pending.value = true;

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
            else throw data;
        }
        catch (err) {
            error.value = err;
        }
        finally {
            pending.value = false;
        }
    }

    return {
        error,
        pending,
        summary,
        fetchAbstract
    };
}