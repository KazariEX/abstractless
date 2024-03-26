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

## 配置

### target

- **Type**: ``HTMLElement | string``

- **Default**: ``null``

文章容器元素或其 CSS 选择器。

### content

- **Type**: ``string``

- **Default**: ``null``

文章内容，优先于 ``target`` 属性生效。

### timeout

- **Type**: ``number``

- **Default**: ``20000``

请求超时的时长。

### defer

- **Type**: ``boolean``

- **Default**: ``false``

如果为 ``true``，则不会在组件挂载完毕后立即发送请求。

### waitFor

- **Type**: ``boolean``

- **Default**: ``true``

当 ``defer`` 属性不为 ``true`` 时，将在组件挂载后等待此属性为 Truthy 值时延迟发送请求。

### wordLimit

- **Type**: ``number``

- **Default**: ``1000``

文章提交的字数限制。

### tianliKey

- **Type**: ``number``

- **Required**

TianliGPT 的请求密钥。