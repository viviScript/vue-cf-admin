# Mixins说明

## elementUI 里用得到的混合指令

### mixins.scss

- 配置变量

  ```scss
  $namespace: 'el';
  $element-separator: '__';
  $modifier-separator: '--';
  $state-prefix: 'is-';
  ```

- `@mixin b($block)`

  代表了更高级别的抽象或组件

  `@include b` 会覆盖全局变量 `$B` 的值 `$B: $namespace+'-'+$block !global;`，然后在文档根部生成对应规则 `#{className} { @content; }`。

  className: `.#{$B}`

  ```scss
  @include b(block) {
    /* block content; */
  }
  ```

  ```css
  .el-block {
    /* block content; */
  }
  ```

- `@mixin e($element)`

  代表 `$block` 的后代，用于形成一个完整的 `$block` 的整体

  `@include e` 会覆盖全局变量 `$E` 的值 `$E: $element !global`，当嵌套规则中不包含修饰符（`$modifier-separator`）、状态（`$state-prefix`）或伪元素（`:hover`等）时会在文档根部生成对应规则 `#{className} { @content; }`，相反对应规则会嵌套在父选择器下 `& #{className} { @content; }`。

  className: `#{"." + $B + $element-separator + $element}`

  ```scss
  @include b(block) {
    /* block content; */
    @include e(element) {
      /* block-element content; */
    }
    @include m(modifier) {
      /* block-modifier content; */
      @include e(element) {
        /* block-modifier-element content; */
      }
    }
    @include when(state) {
      /* block-state content; */
      @include e(element) {
        /* block-state-element content; */
      }
    }
    &:hover {
      /* block-hover content; */
      @include e(element) {
        /* block-hover-element content; */
      }
    }
  }
  ```

  ```css
  .el-block {
    /* block content; */
  }

  .el-block__element {
    /* block-element content; */
  }

  .el-block--modifier {
    /* block-modifier content; */
  }

  .el-block--modifier .el-block__element {
    /* block-modifier-element content; */
  }

  .el-block.is-state {
    /* block-state content; */
  }

  .el-block.is-state .el-block__element {
    /* block-state-element content; */
  }

  .el-block:hover {
    /* block-hover content; */
  }

  .el-block:hover .el-block__element {
    /* block-hover-element content; */
  }
  ```

- `@mixin m($modifier)`

  代表 `$block` 或 `$element` 的不同状态或不同版本

  `@include m` 在文档根部生成对应规则 `#{className} { @content; }`。

  className: `#{& + $modifier-separator + $modifier}`

  ```scss
  @include b(block) {
    /* block content; */
    @include m(modifier) {
      /* block-modifier content; */
    }
    @include e(element) {
      /* block-element content; */
      @include m(modifier-element) {
        /* block-element-modifier content; */
      }
    }
  }
  ```

  ```css
  .el-block {
    /* block content; */
  }

  .el-block--modifier {
    /* block-modifier content; */
  }

  .el-block__element {
    /* block-element content; */
  }

  .el-block__element--modifier-element {
    /* block-element-modifier content; */
  }
  ```

- `@mixin when($state)`

  代表 `$block` 或 `$element` 或 `$modifier` 更细致的状态表示，与 `$modifier` 的用法不同

  `@include when` 在文档根部生成对应规则 `#{className} { @content; }`。

  className: `&.#{$state-prefix + $state}`。

  ```scss
  @include b(block) {
    /* block content; */
    @include when(state) {
      /* block-state content; */
    }
    @include e(element) {
      /* block-element content; */
      @include when(state-element) {
        /* block-element-state content; */
      }
    }
    @include m(modifier) {
      /* block-modifier content; */
      @include when(state-modifier) {
        /* block-modifier-state content; */
      }
    }
  }
  ```

  ```css
  .el-block {
    /* block content; */
  }

  .el-block.is-state {
    /* block-state content; */
  }

  .el-block__element {
    /* block-element content; */
  }

  .el-block__element.is-state-element {
    /* block-element-state content; */
  }

  .el-block--modifier {
    /* block-modifier content; */
  }

  .el-block--modifier.is-state-modifier {
    /* block-modifier-state content; */
  }
  ```

- `@mixin share-rule($name)`

  定义一个占位符选择器规则，配合 `@include extend-rule($name)` 使用

  `@include share-rule` 在文档根部生成一个占位符选择器规则 `#{'%shared-'+$name} { @content; }`。

  e.g. 参见 `@mixin extend-rule($name)`

- `@mixin extend-rule($name)`

  便捷使用 `@mixin share-rule($name)` 定义的占位符选择器规则

  `@include share-rule` 在当前选择器下继承 `$name` 占位符选择器的规则 `& { @content; }`。

  ```scss
  @include b(block) {
    /* block content; */
    @include share-rule(name) {
      /* block-share-rule content; */
    }
    &::before {
      /* block-before content; */
      @include extend-rule(name);
    }
    &::after {
      /* block-after content; */
      @include extend-rule(name);
    }
  }
  ```

  ```css
  .el-block {
    /* block content; */
  }

  .el-block::before, .el-block::after {
    /* block-share-rule content; */
  }

  .el-block::before {
    /* block-before content; */
  }

  .el-block::after {
    /* block-after content; */
  }
  ```

- `@mixin pseudo($pseudo)`

  生成当前嵌套下伪类的规则

  `@include pseudo` 在文档根部生成对应规则 `#{&}#{':#{$pseudo}'} { @content; }`。

  ```scss
  @include b(block) {
    /* block content; */
    @include pseudo(first-child) {
      /* block-pseudo content; */
    }
  }
  ```

  ```css
  .el-block {
    /* block content; */
  }

  .el-block:first-child {
    /* block-pseudo content; */
  }
  ```

### utils.scss

- `@mixin utils-clearfix`

  清除浮动

- `@mixin utils-vertical-center`

  垂直居中

- `@mixin utils-ellipsis`

  文本加省略号

## 框架定义的混合指令

### mixins.scss

- `@mixin ff-b`

  类 `@mixin b($block)`， components 组件

- `@mixin ff-b-views`

  类 `@mixin b($block)`， views 组件
