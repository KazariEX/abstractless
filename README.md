# Abstractless

基于 TianliGPT，参考 [Post-Abstract-AI](https://github.com/zhheo/Post-Abstract-AI)。

## 安装

```bash
$ pnpm i abstractless
```

## 用法

```vue
<script lang="ts" setup>
    import AbstractLess from "abstractless";

    const abstractProps = { /* 一些配置 */ };
</script>

<template>
    <AbstractLess v-bind="abstractProps" v-slot="{ error, pending, summary, fetchAbstract }">
        <!-- 自定义视图结构 -->
    </AbstractLess>
</template>
```

```ts
import { useAbstract } from "abstractless";

const abstractOptions = { /* 一些配置 */ };
const { error, pending, summary, fetchAbstract } = useAbstract(abstractOptions);
```

你也可以直接使用包里封装好的简易组件：

```vue
<script lang="ts" setup>
    import { AbstractMore } from "abstractless";

    const abstractProps = { /* 一些配置 */ };
</script>

<template>
    <AbstractMore v-bind="abstractProps"/>
</template>
```

## API

### useAbstract

向 TianliGPT 发送请求，返回摘要。

```ts
export declare function useAbstract(options?: UseAbstractOptions): {
    error: Ref<Error>,
    pending: Ref<boolean>,
    summary: Ref<string>,
    fetchAbstract: () => void
}
```

#### UseAbstractOptions

**target**

- **Type**: ``MaybeRefOrGetter<HTMLElement | string>``

- **Default**: ``null``

文章容器元素或其 CSS 选择器。

**content**

- **Type**: ``MaybeRefOrGetter<string>``

- **Default**: ``null``

文章内容，优先于 ``target`` 属性生效。

**waitFor**

- **Type**: ``MaybeRefOrGetter<boolean>``

- **Default**: ``true``

当 ``defer`` 属性不为 ``true`` 时，将在组件挂载后等待此属性为 Truthy 值时延迟发送请求。

**defer**

- **Type**: ``boolean``

- **Default**: ``false``

如果为 ``true``，则不会在组件挂载完毕后立即发送请求。

**timeout**

- **Type**: ``number``

- **Default**: ``20000``

请求超时的时长。

**wordLimit**

- **Type**: ``number``

- **Default**: ``1000``

文章提交的字数限制。

**tianliKey**

- **Type**: ``number``

- **Required**

TianliGPT 的请求密钥。

### useTyping

使用打字特效。

```ts
export declare function useTyping(text: MaybeRefOrGetter<string>, options?: UseTypingOptions): {
    isTyping: Ref<boolean>,
    typedText: Ref<string>,
    run: () => void,
    stop: () => void
}
```

#### UseTypingOptions

**speed**

- **Type**: ``number``

- **Default**: ``40``

每秒输出的字数。

**punctuation**

- **Type**: ``Regexp``

- **Default**: ``/[,.!?:;，。、！？：；]/``

判断是否为标点的正则表达式。

**punctuationSpeedMultiplier**

- **Type**: ``number``

- **Default**: ``6``

当最后一个输出的字符被判断为标点时，输出下一个字符的延时倍率。