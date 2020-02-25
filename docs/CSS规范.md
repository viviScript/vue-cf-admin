# CSS规范

## 预处理器

使用sass语言, 组件变量加前缀`$F--`，视图页面变量加前缀`$V--`。

## 选择器和权重

- 不使用通配符选择器、ID选择器、类型选择器（非必要不准使用），优先使用类选择器。
- 不准使用 `!important` ，减少嵌套层次（最多不超3层），一般不使用嵌套

## 命名规范

使用BEM规范，class选择器统一小写中线命名（kebab-case）。

### 问题

- css的样式应用是全局性的，没有作用域可言。
- 随意的命名很容易出现样式的冲突和覆盖。
- 乱用选择器（ID）和权重（!important），样式难以复用。
- 嵌套层次太深，元素结构难以修改

### BEM简介

BEM的意思就是块（block）、元素（element）、修饰符（modifier）。这种巧妙的命名方法让你的CSS类对其他开发者来说更加透而且更有意义。BEM命名约定更加严格，而且包含更多的信息，它们用于一个团队开发一个耗时的大项目。

### 命名约定的模式如下：

```css
.block{}
.block__element{}
.block--modifier{}
```

- `.block` 代表了更高级别的抽象或组件。
- `.block__element` 代表 `.block` 的后代，用于形成一个完整的 `.block` 的整体。
- `.block--modifier` 代表 `.block` 的不同状态或不同版本。

BEM的关键是光凭名字就可以告诉其他开发者某个标记是用来干什么的。通过浏览HTML代码中的class属性，你就能够明白模块之间如何关联的：有一些仅仅是组件，有一些则是这些组件的子孙或者是元素,还有一些是组件的其他形态或者是修饰符。

### 唯一性

- block-name 全局唯一
- element-name block内唯一
- modifier-name block内唯一

### 不使用BEM的地方

通用的，工具类的，单独的一条css规则（不属于任何一个BEM）。

### BEM实战

使用elementUI提供的BEM混合指令

`@include e` 当嵌套规则中包含修饰符（`$modifier-separator`）、状态（`$state-prefix`）或伪元素（`:hover`等）时对应规则会嵌套在父选择器下 `& #{className} { @content; }`，请注意嵌套层次不超3层。

```scss
// components 组件
@include ff-b(block) {
  /* block content; */
  @include e(element) {
    /* block-element content; */
  }
  @include m(modifier) {
    /* block-modifier content; */
  }
  @include when(state) {
    /* block-state content; */
  }
}

// views 组件
@include ff-b-views(block) {
  /* block content; */
  @include e(element) {
    /* block-element content; */
  }
  @include m(modifier) {
    /* block-modifier content; */
  }
  @include when(state) {
    /* block-state content; */
  }
}
```

```css
.ff-block {
  /* block content; */
}

.ff-block__element {
  /* block-element content; */
}

.ff-block--modifier {
  /* block-modifier content; */
}

.ff-block.is-state {
  /* block-state content; */
}

.ff-v-block {
  /* block content; */
}

.ff-v-block__element {
  /* block-element content; */
}

.ff-v-block--modifier {
  /* block-modifier content; */
}

.ff-v-block.is-state {
  /* block-state content; */
}
```
