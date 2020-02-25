# JS规范

## ECMAScript

- 用最新语法函数书写代码，优先顺序 ES7-->ES6-->ES5。
- ECMAScript 里没有的，使用 `lodash-decorators` -->`lodash` 的函数
- 最后才自己写工具函数

## import

- `import` src 目录下的文件全部使用相对路径
- `import` 按需导入，无特殊情况禁止导入全部

## 日期解析

使用 [dayjs](https://github.com/iamkun/dayjs)